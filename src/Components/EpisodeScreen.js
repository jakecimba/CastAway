import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground
} from 'react-native';
import { AudioController } from './AudioController';
import { ImageDescriptionButton } from './ImageDescriptionButton';
var striptags = require('striptags');
var moment = require('moment');

class EpisodeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerTitleStyle: {color: 'white', fontSize: 18, fontFamily: 'Montserrat-SemiBold', letterSpacing: 1.4},
    headerStyle: {backgroundColor: 'black', height: 74},
    headerBackTitle: null,
    headerTintColor: 'white'
  });

  render () {
    const { episode } = this.props.navigation.state.params;
    let feedMp3 = episode.enclosure[0]["$"].url.replace("https", "http");
    let imageUrl = episode['itunes:image'][0]["$"].href;
    let description = String(episode.description);
    description = striptags(description, [] , "");
    let durString = String(episode["itunes:duration"]);
    dur = moment.duration(durString).asSeconds();
    console.log(episode)

    return (
      <ImageBackground source={{uri: 'backgroundFadeLandingPage'}} style={styles.background}>
        <View style={styles.container} >
          <ImageDescriptionButton episodeDescription={description} imageLink={imageUrl} />
          <AudioController mp3={feedMp3} duration={dur} podcastTitle={this.props.navigation.state.params.title} episode={episode.title}/>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 18
  }
}

export { EpisodeScreen };