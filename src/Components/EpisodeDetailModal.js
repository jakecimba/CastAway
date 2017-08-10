import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Image } from 'react-native';
var striptags = require('striptags');

class EpisodeDetailModal extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    var info = this.props.info;
    var description = String(info.description);
    description = striptags(description, [] , "");
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          >
        <View style={styles.container}>
          <TouchableHighlight onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}>
            <Text style={styles.close}>X</Text>
          </TouchableHighlight>
          <Text>{info.title}</Text>
          <Text>{description}</Text>
        </View>
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
  close: {
    textAlign: 'right',
    padding: 10,
    fontWeight: 'bold'
  },
  infoText: {
    color: 'white',
    textAlign: 'center',
    height: 40,
    width: 45,
    padding: 10
  },
  container: {
    padding: 15
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