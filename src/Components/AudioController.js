import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Slider,
  Image
} from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import {palette} from './Palette';
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
    this.checkForEnd(this.state.time);
  }

  checkForEnd(currentTime) {
    if ( currentTime == this.props.duration && this.state.isMp3Playing ) {
        this.end()
    } else if ( currentTime == this.props.duration ) {
        this.reset()
    }
  }

  end() {
    ReactNativeAudioStreaming.seekToTime(0);
    ReactNativeAudioStreaming.pause();
    clearInterval(this.timerID);
    this.setState({time: 0, isMp3Playing: false});
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

  skipForward(seconds) {
    ReactNativeAudioStreaming.goForward(seconds);
    this.setState({time: this.state.time + seconds});
  }

  skipBack(seconds) {
    ReactNativeAudioStreaming.goBack(seconds);
    this.setState({time: this.state.time - seconds});
  }

  sliderChange(val) {
    ReactNativeAudioStreaming.seekToTime(val);
    this.setState({time: val});
  }

  sliderComplete(val) {
    this.checkForEnd(val);
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
    let buttonStyle = this.state.isMp3Playing ? 'pauseButton' : 'playButton';
    var skipTime = 15;
    var timeElapsed = this.formatTime(this.state.time);
    var timeLeft = this.formatTime(this.props.duration - this.state.time);

    return (
      <View style={styles.container} >

        <View style={styles.textContainer}>
          <Text style={styles.podcastTitle}>{this.props.podcastTitle.replace("Podcast", "")}</Text>
          <Text style={styles.episode}>{this.props.episodeTitle}</Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{timeElapsed}</Text>
          <Slider
            style={styles.slider}
            step={1}
            minimumValue={0}
            maximumValue={this.props.duration}
            value={this.state.time}
            onValueChange={val => this.sliderChange(val)}
            onSlidingComplete={val => this.sliderComplete(val)}
            minimumTrackTintColor={palette.lightGreyBlue}
            maximumTrackTintColor={palette.lightGreyBlue}
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
              <Image source={{uri: 'rewind'}} style={styles.skipImage}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if (!this.state.isMp3Playing) {
              this.resumeMP3();
            } else {
              this.pauseMP3();
            }
          }}>
            <Image source={{uri: buttonStyle}} style={styles.playButtonImage}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if ( this.state.time + skipTime >= this.props.duration ) {
              this.end();
            } else {
              this.skipForward(skipTime);
            }
          }}>
            <View style={styles.forward}>
              <Image  source={{uri: 'fastForward'}} style={styles.skipImage}/>
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
  rewind: {
    top: 22,
    right: 27
  },
  forward: {
    top: 22,
    left: 27
  },
  skipImage: {
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
    color: palette.timeStamp,
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
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  timeText: {
    color: palette.timeStamp,
    backgroundColor: 'transparent',
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    top: 10.5,
    textAlign: 'center',
    width: 45
  }
}

export { AudioController };