import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'; 

export default PodcastListItem = ({item, onPodcastSelected}) =>
    <TouchableOpacity onPress={() => onPodcastSelected(item)}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{item.title}</Text>
      </View>
    </TouchableOpacity>

const styles = {
  button: {
    height: 50,
    marginBottom: 1,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    padding: 15,
    color: 'white',
  },
}

export {PodcastListItem};