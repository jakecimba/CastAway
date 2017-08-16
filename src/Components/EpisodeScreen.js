import React from 'react';
import {
  View,
  ImageBackground
} from 'react-native';
import { AudioController } from './AudioController';
import { ImageDescriptionButton } from './ImageDescriptionButton';
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
    var navigation = this.props.navigation.state.params;
    let feedMp3 = navigation.episode.enclosure[0]["$"].url.replace("https", "http");
    let durationString = String(navigation.episode["itunes:duration"]);
    let durationAsSeconds = moment.duration(durationString).asSeconds();

    return (
      <ImageBackground source={{uri: 'backgroundFadeLandingPage'}} style={styles.background}>
        <View style={styles.container} >
          <ImageDescriptionButton episode={navigation.episode} podcastTitle={navigation.title} author={navigation.author} duration={durationString}/>
          <AudioController mp3={feedMp3} duration={durationAsSeconds} podcastTitle={navigation.title} episodeTitle={navigation.episode.title}/>
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