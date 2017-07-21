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

class HomeScreen extends Component {
  state = {
    feedData: null
  };
  static navigationOptions = {
    title: 'Welcome',
  };

  componentWillMount() {
    fetchXml('http://feeds.podtrac.com/zKq6WZZLTlbM')
    .then((json) => {
      this.setState({feedData: json})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    let { feedData } = this.state

    if (!feedData) {
      return <Text> Loading </Text>
    }
     
    let generalFeed = feedData.rss.channel[0];
    let feedItems = generalFeed.item || []
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <PodcastInfoDisplay generalInfoFeed={generalFeed} />
        <PodcastList 
        onPodcastSelected={ (episode) => navigate('Episode', { episode: episode }) }
        items={feedItems}  
        />
      </View>
    )
  }
}

const styles = {
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
}

export {HomeScreen};