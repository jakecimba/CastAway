import React from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { EpisodeDetailModal } from './EpisodeDetailModal';
import {palette} from './Palette';
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
      <TouchableHighlight onPress={() => {
          onPressItem(item.title)
          navigateToEpisode(item)
        }}>
        <View style={styles.button}>
          <View style={styles.leftColumn}>
            <Text style={(selected == true) ? styles.buttonTextPlaying : styles.buttonTextNotPlaying}>{item.title}</Text>
            <Text style={styles.duration}>{formatDuration(String(item["itunes:duration"]))}</Text>
            <Text style={styles.description} numberOfLines={2} ellipsizeMode={'tail'}>{description}</Text>
          </View>
          <View style={styles.modal}>
            <EpisodeDetailModal info={item}/>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = {
  background: {
    backgroundColor: palette.blackTwo
  },
  button: {
    height: 153,
    marginBottom: 1,
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row'
  },
  buttonTextPlaying: {
    top: 28,
    width: 310,
    lineHeight: 22,
    maxHeight: 44,
    paddingLeft: 18,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    letterSpacing: 1.4,
    color: palette.turquoiseBlue
  },
  buttonTextNotPlaying: {
    top: 28,
    width: 310,
    lineHeight: 22,
    maxHeight: 44,
    paddingLeft: 18,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    letterSpacing: 1.4,
    color: 'white'
  },
  leftColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  modal: {
    left: 10
  },
  duration: {
    color: palette.warmGrey,
    left: 18,
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'HelveticaNeue',
  },
  description: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    width: 339,
    left: 18,
    bottom: 28,
    lineHeight: 21,
    height: 42
  }
}

export {PodcastListItem};
