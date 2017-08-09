import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { EpisodeDetailModal } from './EpisodeDetailModal';
var striptags = require('striptags');

export default PodcastListItem = ({item, selected, onPressItem, navigateToEpisode}) => {
  let description = String(item.description);
  description = striptags(description, [] , "");

  function formatDuration(duration) {
    var i = 0;
    while (duration[i] == '0' || duration[i] == ':') {
      duration = duration.substring(1, duration.length)
    };
    return duration;
  }


  return (
    <View style={styles.background}>
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
          <Text style={styles.duration}>{formatDuration(String(item["itunes:duration"]))}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  background: {
    backgroundColor: 'rgb(76, 76, 76)'
  },
  button: {
    height: 153,
    marginBottom: 1,
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonTextPlaying: {
    width: 275,
    paddingLeft: 18,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    letterSpacing: 1.4,
    color: 'rgb(0, 173, 211)'
  },
  buttonTextNotPlaying: {
    width: 275,
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
  },
  duration: {
    color: 'rgb(155, 155, 155)',
    left: 18,
    fontFamily: 'HelveticaNeue',
  },
  description: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    width: 339,
    left: 18,
    bottom: 26,
    lineHeight: 21,
    height: 42
  }
}

export {PodcastListItem};
