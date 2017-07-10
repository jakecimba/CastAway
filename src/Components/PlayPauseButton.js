import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

class PlayPauseButton extends React.Component {
  state = {
    isMp3Playing: false,
  };

  render() {

    let secureMp3 = this.props.mp3;
    let playableMp3 = secureMp3.replace("https", "http");
    let buttonStatus = this.state.isMp3Playing ? "Playing" : "Paused";
    let buttonStyle = this.state.isMp3Playing ? styles.button1 : styles.button2;

    return (
      <View style={styles.container} >
        <TouchableOpacity onPress={() => {
          if (!this.state.isMp3Playing) {
            ReactNativeAudioStreaming.play(playableMp3, {showIniOSMediaCenter: true});
            this.setState({isMp3Playing: true});
          } else {
            ReactNativeAudioStreaming.pause();
            this.setState({isMp3Playing: false});
          }
        }}>
          <View  style={buttonStyle}>
            <Text style={styles.buttonText}>{buttonStatus}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
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
}

export { PlayPauseButton };
