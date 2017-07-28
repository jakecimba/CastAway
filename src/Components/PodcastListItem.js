import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {EpisodeDetailModal} from './EpisodeDetailModal'; 

export default PodcastListItem = ({item, onPodcastSelected}) =>
    <TouchableOpacity onPress={() => onPodcastSelected(item)}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{item.title}</Text>
        <View style={styles.modal}>
          <EpisodeDetailModal info={item}/>
        </View>
      </View>
    </TouchableOpacity>

const styles = {
  button: {
    height: 50,
    marginBottom: 1,
    backgroundColor: '#2196F3',
    //flex: 1,
    flexDirection: 'row'
  },
  buttonText: {
    padding: 15,
    color: 'white',
  },
  modal: {
    padding: 15,
    right: 2
  }
}

export {PodcastListItem};