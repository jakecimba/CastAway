import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { EpisodeDetailModal } from './EpisodeDetailModal';

export default PodcastListItem = ({item, selected, onPressItem, navigateToEpisode}) => {
  return (
    <TouchableOpacity onPress={() => {
        onPressItem(item.title)
        navigateToEpisode(item)
      }}>
      <View style={styles.button}>
        <View style={styles.topRow}>
          <Text style={(selected == true) ? styles.buttonTextPlaying : styles.buttonTextNotPlaying}>{item.title}</Text>
          <View style={styles.modal}>
            <EpisodeDetailModal info={item}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  button: {
    height: 153,
    marginBottom: 2,
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonTextPlaying: {
    width: 275,
    height: 22,
    paddingLeft: 18,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    letterSpacing: 1.4,
    color: 'rgb(0, 173, 211)'
  },
  buttonTextNotPlaying: {
    width: 275,
    height: 22,
    paddingLeft: 18,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    letterSpacing: 1.4,
    color: 'white'
  },
  topRow: {
    top: 28,
    flexDirection: 'row',
  },
  modal: {
    left: 64
  }
}

export {PodcastListItem};
