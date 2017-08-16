import React, { Component } from 'react';
import { 
  Modal,
  Text,
  TouchableHighlight,
  View,
  Image,
  ImageBackground
} from 'react-native';
var striptags = require('striptags');

class EpisodeDetailModal extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  formatDuration(duration) {
    var i = 0;
    while (duration[i] == '0' || duration[i] == ':') {
      duration = duration.substring(1, duration.length)
    };
    return duration;
  }

  render() {
    var info = this.props.info;
    var description = String(info.description).replace("&nbsp", "");
    description = striptags(description, [] , "");

    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          >
        <ImageBackground source={{uri: 'backgroundFadeLandingPage'}} style={styles.background}>
          <View style={styles.container}>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={styles.downContainer}>
                <Image source={{uri: 'DownArrow'}} style={styles.close}/>
              </View>
            </TouchableHighlight>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{info.title}</Text>
              <Text style={styles.duration}>{this.formatDuration(String(info["itunes:duration"]))}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
        </ImageBackground>
        </Modal>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(true)
            }}>
              <View style={styles.infoContainer}>
                <Image source={{uri: 'infoButton'}} style={styles.infoButton}/>
              </View>
            </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  downContainer: {
    paddingLeft: 18,
    paddingTop: 28,
  },
  duration: {
    color: 'rgb(155, 155, 155)',
    fontFamily: 'HelveticaNeue',
    fontSize: 15,
    paddingBottom: 6,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    fontSize: 15,
    width: 339
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontSize: 18,
    letterSpacing: 1.4,
    paddingBottom: 6,
    paddingTop: 22,
    width: 319,
  },
  textContainer: {
    backgroundColor: 'transparent',
    paddingLeft: 18,
  },
  background: {
    flex: 1
  },
  close: {
    tintColor: 'white',
    height: 22,
    width: 22,
  },
  infoText: {
    color: 'white',
    textAlign: 'center',
    height: 40,
    width: 45,
    padding: 10
  },
  container: {
    flexDirection: 'column'
  },
  infoButton: {
    height: 22,
    width: 22,
  },
  infoContainer: {
    padding: 28
  }
}

export { EpisodeDetailModal }