import React , {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { fetchXml } from './DataSource';
import {PodcastList} from './PodcastList';
import {PodcastInfoDisplay} from './PodcastInfoDisplay';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

class PodcastDetailScreen extends Component {
  state = {
    feedData: null,
    time: 0
  };
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.xmlData.rss.channel[0].title[0],
  });

  componentWillMount() {
    this.setState({feedData: this.props.navigation.state.params.xmlData})
  }

  timeStatus() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  tick() {
    this.setState({
      time: this.state.time + 1
    });
  }

  playMP3(mp3) {
    ReactNativeAudioStreaming.play(mp3, {showIniOSMediaCenter: true});
    this.timeStatus();
  }

  render() {
    if (!this.state.feedData) {
      return <Text> Loading </Text>
    }
    let feedData = this.state.feedData;
    let generalFeed = feedData.rss.channel[0];
    let feedItems = generalFeed.item || []
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <PodcastInfoDisplay generalInfoFeed={generalFeed} />
        <PodcastList 
          onPodcastSelected={ (episode) => {
            this.playMP3(episode.enclosure[0]["$"].url.replace("https", "http"));
            
            navigate('Episode', { episode: episode, timeStamp: this.state.time }) 
          }}
          items={feedItems}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
}

export {PodcastDetailScreen};