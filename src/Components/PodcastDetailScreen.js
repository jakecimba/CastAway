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
  };
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.xmlData.rss.channel[0].title[0],
  });

  componentWillMount() {
    this.setState({feedData: this.props.navigation.state.params.xmlData})
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
            navigate('Episode', { episode: episode}) 
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