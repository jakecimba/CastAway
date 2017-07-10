import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import { PlayPauseButton } from './PlayPauseButton';
import { ImageDescriptionButton } from './ImageDescriptionButton';

class EpisodeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.episode.title}`,
  });
  
  render () {
    const { episode } = this.props.navigation.state.params;
    let feedMp3 = episode.enclosure[0]["$"].url;
    let imageUrl = episode['itunes:image'][0]["$"].href;
    let description = String(episode.description);
    description = description.replace("<p>", "").replace("</p>", "");
    
    return (
      <View style={styles.container} >
        <ImageDescriptionButton episodeDescription={description} imageLink={imageUrl}/>
        <PlayPauseButton mp3={feedMp3}/>
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