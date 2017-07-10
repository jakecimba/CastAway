import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { PlayPauseButton } from './PlayPauseButton';

class EpisodeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.episode.title}`,
  });
  
  render () {
    const { episode } = this.props.navigation.state.params;
    let feedMp3 = episode.enclosure[0]["$"].url;
    return (
      <PlayPauseButton mp3={feedMp3}/>
    );
  }
}

export { EpisodeScreen };