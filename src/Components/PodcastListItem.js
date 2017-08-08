import React, {Component, PureComponent} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {EpisodeDetailModal} from './EpisodeDetailModal'; 

export default PodcastListItem = ({item, navigateToEpisode, highlightEpisode, selected}) => {
  return (
    <TouchableOpacity 
      onPress={() => {
        highlightEpisode(item)
        navigateToEpisode(item)
      }}>
      <View style={(selected == item.title) ? styles.buttonPlaying : styles.buttonNotPlaying}>
        <Text style={styles.buttonText}>{item.title}</Text>
        <View style={styles.modal}>
          <EpisodeDetailModal info={item}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  buttonNotPlaying: {
    height: 50,
    marginBottom: 1,
    backgroundColor: '#2196F3',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonPlaying: {
    height: 50,
    marginBottom: 1,
    backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    paddingLeft: 15,
    paddingTop: 7,
    paddingBottom: 5,
    color: 'white',
    height: 50,
    width: 300
  },
  modal: {
    paddingRight: 10,
  }
}

export {PodcastListItem};