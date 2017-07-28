import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';
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
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View >
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text style={styles.close}>X</Text>
            </TouchableHighlight>
            <Text>{info.title}</Text>
            <Text>{description}</Text>
          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>info</Text>
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
  }
}

export { EpisodeDetailModal }