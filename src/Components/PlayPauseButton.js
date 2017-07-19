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
    time: 0,
  };

  componentDidMount() {
    ReactNativeAudioStreaming.getStatus((error, info) => {
      if (error) {
        console.log(error);
      } else if (info.status == "PLAYING" && info.url == this.props.mp3) {
        this.setState({time: parseInt(info.progress.toFixed(0)), isMp3Playing: true});
        this.timeStatus();
      } else if (info.url == this.props.mp3) {
        this.setState({time: parseInt(info.progress.toFixed(0))});
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
      time: this.state.time + 1
    });
  }

  addTime(seconds) {
    this.setState({time: this.state.time + seconds});
  }

  seekAudio(seconds) {
    ReactNativeAudioStreaming.play(this.props.mp3, {showIniOSMediaCenter: true});
    ReactNativeAudioStreaming.pause();
    ReactNativeAudioStreaming.seekToTime(seconds);
  }
  
  end() {
    ReactNativeAudioStreaming.seekToTime(0);
    ReactNativeAudioStreaming.pause();
    clearInterval(this.timerID);
    this.setState({time: 0, isMp3Playing: false});
  }

  skipBack(seconds) {
    ReactNativeAudioStreaming.goBack(seconds);
    this.setState({time: this.state.time - seconds});
  }

  reset() {
    ReactNativeAudioStreaming.seekToTime(0);
    this.setState({time: 0});
  }

  resumeMP3() {
    ReactNativeAudioStreaming.play(this.props.mp3, {showIniOSMediaCenter: true});
    this.setState({isMp3Playing: true});
    this.timeStatus();
  }

  pauseMP3() {
    ReactNativeAudioStreaming.pause();
    this.setState({isMp3Playing: false});
    clearInterval(this.timerID);
    ReactNativeAudioStreaming.getStatus((error, info) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({time: parseInt(info.progress.toFixed(0))});
      }
    });
  }

  render() {
    let buttonStatus = this.state.isMp3Playing ? "Playing" : "Paused";
    let buttonStyle = this.state.isMp3Playing ? styles.button1 : styles.button2;
    var skipTime = 30

    return (
      <View style={styles.container} >
        <TouchableOpacity onPress={() => {
          if (!this.state.isMp3Playing) {
            this.resumeMP3();
          } else {
            this.pauseMP3();
          }
        }}>
          <View  style={buttonStyle}>
            <Text style={styles.buttonText}>{buttonStatus}</Text>
          </View>
        </TouchableOpacity>
        <Text>{moment(this.state.time*1000).format("m:ss")}</Text>
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => {
            if ( this.state.time - skipTime < 0 ) {
              this.reset();
            } else {
              this.skipBack(skipTime);
            }
          }}>
            <View style={styles.skip}>
              <Text style={styles.skipText}>Backward {skipTime}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if ( this.state.time + skipTime >= this.props.duration ) {
              this.end();
            } else if (this.state.time == 0) {
              this.seekAudio(skipTime);
              this.addTime(skipTime);
            } else {
              ReactNativeAudioStreaming.goForward(skipTime);
              this.addTime(skipTime);
            }
          }}>
            <View style={styles.skip}>
              <Text style={styles.skipText}>Forward {skipTime}</Text>
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