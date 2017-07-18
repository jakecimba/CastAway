import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
var moment = require('moment');

class PlayPauseButton extends React.Component {
  state = {
    isMp3Playing: false,
    time: moment(0).format("m:ss"),
  };

  componentDidMount() {
    ReactNativeAudioStreaming.getStatus((error, info) => {
      if (error) {
        console.log(error);
      }
      else if (info.status == "PLAYING" && info.url == this.props.mp3) {
        this.setState({time: moment(info.progress.toFixed(0)*1000).format("m:ss"), isMp3Playing: true});
        this.timeStatus();
      } 
      else if (info.url == this.props.mp3) {
        this.setState({time: moment(info.progress.toFixed(0)*1000).format("m:ss")});
      }
    });
  }

  timeStatus() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  tick() {
    this.setState({
      time: moment(this.state.time, "m:ss").add(1, "s").format("m:ss")
    });
  }
  
  render() {
    let playableMp3 = this.props.mp3;
    let buttonStatus = this.state.isMp3Playing ? "Playing" : "Paused";
    let buttonStyle = this.state.isMp3Playing ? styles.button1 : styles.button2;

    return (
      <View style={styles.container} >
        <TouchableOpacity onPress={() => {
          if (!this.state.isMp3Playing) {
            ReactNativeAudioStreaming.play(playableMp3, {showIniOSMediaCenter: true});
            this.setState({isMp3Playing: true});
            this.timeStatus();
          } else {
            ReactNativeAudioStreaming.pause();
            this.setState({isMp3Playing: false});
            clearInterval(this.timerID);
            ReactNativeAudioStreaming.getStatus((error, info) => {
              if (error) {
                console.log(error);
              } else {
                this.setState({time: moment(info.progress.toFixed(0)*1000).format("m:ss")});
              }
            });
          }
        }}>
          <View  style={buttonStyle}>
            <Text style={styles.buttonText}>{buttonStatus}</Text>
          </View>
        </TouchableOpacity>
        <Text>{this.state.time}</Text>
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => {
            if ( this.state.time.replace(":","")-30 < 0 ) {
              ReactNativeAudioStreaming.seekToTime(0);
              this.setState({time: moment(0).format("m:ss")});
            }
            else {
              ReactNativeAudioStreaming.goBack(30);
              this.setState({time: moment(this.state.time, "m:ss").subtract(30, "s").format("m:ss")});
            }
          }}>
            <View style={styles.skip}>
              <Text style={styles.skipText}>Backward 30</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if ( moment.duration(moment(this.state.time, "m:ss").add(30, "s").format("m:ss")).asMinutes() >= this.props.duration ) {
              ReactNativeAudioStreaming.seekToTime(this.props.duration);
              clearInterval(this.timerID);
              this.setState({time: moment(0).format("m:ss"), isMp3Playing: false});
            } else {
              ReactNativeAudioStreaming.goForward(30);
              this.setState({time: moment(this.state.time, "m:ss").add(30, "s").format("m:ss")});
            }
          }}>
            <View style={styles.skip}>
              <Text style={styles.skipText}>Forward 30</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = {
  stopwatch: {
    backgroundColor: 'clear',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20
  },
  button1: {
    height: 65,
    width: 125,
    marginBottom: 1,
    backgroundColor: '#2196F3',
  },
  button2: {
    height: 65,
    width: 125,
    marginBottom: 1,
    backgroundColor: '#696969',
  },
  buttonText: {
    padding: 15,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  skipContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10
  },
  skip: {
    height: 20,
    width: 100,
    backgroundColor: '#2196F3',
    marginBottom: 2
  },
  skipText: {
    padding: 5,
    fontSize: 10,
    color: 'white',
    textAlign: 'center'
  }
}

export { PlayPauseButton };