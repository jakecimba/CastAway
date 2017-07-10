import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import { PlayPauseButton } from './PlayPauseButton';

class EpisodeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.episode.title}`,
  });
  
  render () {
    const { episode } = this.props.navigation.state.params;
    let feedMp3 = episode.enclosure[0]["$"].url;
    let imageLink = episode['itunes:image'][0]["$"].href;
    return (
      <View style={styles.container} >
        <Image
          style={styles.image}
          source={{uri: imageLink}}
        />
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
  },
  image: {
    width: 300,
    height: 300
  }
}

export { EpisodeScreen };