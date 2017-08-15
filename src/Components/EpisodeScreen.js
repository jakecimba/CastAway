import React from 'react';
import {
  Text,
  View,
  Image,
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
    const { episode } = this.props.navigation.state.params;
    var podcastTitle = this.props.navigation.state.params.title;
    var author = this.props.navigation.state.params.author;
    let feedMp3 = episode.enclosure[0]["$"].url.replace("https", "http");
    let durString = String(episode["itunes:duration"]);
    dur = moment.duration(durString).asSeconds();

    return (
      <ImageBackground source={{uri: 'backgroundFadeLandingPage'}} style={styles.background}>
        <View style={styles.container} >
          <ImageDescriptionButton episode={episode} podcastTitle={podcastTitle} author={author} duration={durString}/>
          <AudioController mp3={feedMp3} duration={dur} podcastTitle={podcastTitle} episode={episode.title}/>
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