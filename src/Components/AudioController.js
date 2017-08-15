import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Slider,
  Image
} from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
var moment = require('moment');

class AudioController extends React.Component {
  state = {
    isMp3Playing: false,
    time: 0
  };

  componentDidMount() {
    ReactNativeAudioStreaming.getStatus((error, info) => {
      if (error) {
        console.log(error);
      } else if (this.props.mp3 == info.url) {
        this.resumeMP3();
        this.setState({time: parseInt(info.progress.toFixed(0))})
      } else {
        this.playMP3();
        this.setState({time: 0})
      }
    });
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
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
    ReactNativeAudioStreaming.resume();
    this.setState({isMp3Playing: true});
    this.timeStatus();
  }

  playMP3() {
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

  sliderAction(val) {
    if (this.state.time == 0) {
      this.seekAudio(val);
      this.addTime(val);
      ReactNativeAudioStreaming.seekToTime(val);
      this.setState({time: val}); 
    } else {
      ReactNativeAudioStreaming.seekToTime(val);
      this.setState({time: val});
    }
  }

  formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = seconds - (hours * 3600) - (minutes * 60);
    var time = ""

    if (hours > 0) {
      time += hours+":"
    }

    if (minutes < 10 && time != "") {
      time += "0"+minutes+":"
    } else {
      time += minutes+":"
    }

    if (seconds < 10) {
      time += "0"+seconds
    } else {
      time += seconds
    }

    return time
  }

  render() {
    if ( this.state.time == this.props.duration && this.state.isMp3Playing ) {
      this.end();
    } else if ( this.state.time == this.props.duration ) {
      this.reset();
    }
    let buttonStyle = this.state.isMp3Playing ? 'pauseButton' : 'playButton';
    var skipTime = 15;
    var timeElapsed = this.formatTime(this.state.time);
    var timeLeft = this.formatTime(this.props.duration - this.state.time);

    return (
      <View style={styles.container} >

        <View style={styles.textContainer}>
          <Text style={styles.podcastTitle}>{this.props.podcastTitle.replace("Podcast", "")}</Text>
          <Text style={styles.episode}>{this.props.episode}</Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{timeElapsed}</Text>
          <Slider
            style={styles.slider}
            step={1}
            minimumValue={0}
            maximumValue={this.props.duration}
            value={this.state.time}
            onValueChange={val => this.sliderAction(val)}
            minimumTrackTintColor={'rgb(149, 203, 216)'}
            maximumTrackTintColor={'rgb(149, 203, 216)'}
          />
          <Text style={styles.timeText}>-{timeLeft}</Text>
        </View>

        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => {
            if ( this.state.time - skipTime < 0 ) {
              this.reset();
            } else {
              this.skipBack(skipTime);
            }
          }}>
            <View style={styles.rewind}>
              <Image source={{uri: 'rewind'}} style={styles.rewindImage}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if (!this.state.isMp3Playing) {
              this.resumeMP3();
            } else {
              this.pauseMP3();
            }
          }}>
            <View  style={styles.playButton}>
              <Image source={{uri: buttonStyle}} style={styles.playButtonImage}/>
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
            <View style={styles.forward}>
              <Image  source={{uri: 'fastForward'}} style={styles.forwardImage}/>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = {
  playButtonImage: {
    height: 79,
    width: 79
  },
  playButton: {
    height: 79,
    width: 79
  },
  rewind: {
    height: 47,
    width: 40,
    top: 22,
    right: 27
  },
  rewindImage: {
    height: 47,
    width: 40
  },
  forward: {
    height: 47,
    width: 40,
    top: 22,
    left: 27
  },
  forwardImage: {
    height: 47,
    width: 40
  },
  slider: {
    width: 249,
  },
  podcastTitle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 23,
    letterSpacing: 1.6,
    textAlign: 'center'
  },
  episode: {
    color: 'rgb(155, 155, 155)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    letterSpacing: 1.4,
    textAlign: 'center'
  },
  textContainer: {
    backgroundColor: 'transparent',
    paddingTop: 26
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  skipContainer: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  timeContainer: {
    flexDirection: 'row'
  },
  timeText: {
    color: 'rgb(155, 155, 155)',
    backgroundColor: 'transparent',
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    top: 10.5,
    textAlign: 'center',
    width: 45
  }
}

export { AudioController };