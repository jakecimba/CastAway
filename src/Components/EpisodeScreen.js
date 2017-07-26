import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import {AudioController} from './AudioController';
import { ImageDescriptionButton } from './ImageDescriptionButton';
var striptags = require('striptags');
var moment = require('moment');
var RNFS = require('react-native-fs');
var Sound = require('react-native-sound');

class EpisodeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.episode.title}`,
  });

  render () {
    const { episode } = this.props.navigation.state.params;
    let feedMp3 = episode.enclosure[0]["$"].url.replace("https", "http");
    let imageUrl = episode['itunes:image'][0]["$"].href;
    let description = String(episode.description);
    description = striptags(description, [] , "");
    let durString = String(episode["itunes:duration"]);
    dur = moment.duration(durString).asSeconds();

    let localSong = RNFS.CachesDirectoryPath + '/theDaily.mp3';
    
    RNFS.downloadFile({fromUrl: feedMp3, toFile: localSong}).promise.then( res => {
        console.log("Song Downloaded");
        let song = new Sound(localSong, '', (error) =>  {
          song.play();
        });
      });

    return (
      <View style={styles.container} >
        <ImageDescriptionButton episodeDescription={description} imageLink={imageUrl} />
        <AudioController mp3={feedMp3} duration={dur} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  }
}

export { EpisodeScreen };