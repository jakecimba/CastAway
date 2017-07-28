import React , {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { fetchXml } from './DataSource';

class AllPodcastsScreen extends Component {
  state = {
    channels: [{key: 'http://feeds.podtrac.com/zKq6WZZLTlbM'}, {key: 'http://wtfpod.libsyn.com/rss'}],
    feedData: []
  }
  static navigationOptions = {
    title: 'All Podcasts',
  };
  
  componentWillMount() {
    var storage = []
    var channels = this.state.channels
    for (i = 0; i < channels.length; i++) {
      var x = fetchXml(channels[i].key)
      .then((json) => {
        return json
      })
      .catch((error) => {
        console.log(error)
      });
      storage.push(x);
    }

    Promise.all(storage).then((objects) => {
      this.setState({feedData: objects})
    })
  }
  
  render() {
    let feedData = this.state.feedData
    
    if (feedData.length != this.state.channels.length) {
      return <Text> Loading </Text>
    }
    const { navigate } = this.props.navigation;
    console.log(feedData)
    return (
      <FlatList
        data={feedData}
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => navigate('PodcastDetail', { xmlData: item })} >
            <View style={styles.buttonContainer} >
              <Image
              style={styles.image}
              source={{uri: item.rss.channel[0].image[0].url[0]}}
              />
              <View style={styles.textContainer}>  
                <Text style={styles.podcastTitle}>{item.rss.channel[0].title[0]}</Text>
                <Text>{item.rss.channel[0]["itunes:author"][0]}</Text>
              </View>
            </View>
          </TouchableOpacity>
        } 
      />
    )
  }
}

const styles = {
  buttonContainer: {
    height: 75,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2196F3'

  },
  image: {
    height: 75,
    width: 75,
    flexDirection: 'column'
  },
  podcastTitle: {
    fontWeight: 'bold'
  },
  textContainer: {
    padding: 10
  }
}

export { AllPodcastsScreen };