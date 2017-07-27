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
    var dailyPromise = fetchXml(channels[0].key)
      .then((json) => {
        return json
      })
      .catch((error) => {
        console.log(error)
      })
    
    var wtfPromise = fetchXml(channels[1].key)
      .then((json) => {
        return json
      })
      .catch((error) => {
        console.log(error)
      })

    Promise.all([dailyPromise, wtfPromise]).then(objects => {
      console.log(objects)
    })
  }
  
  render() {
    let { feedData } = this.state.feedData
    if (!feedData) {
      return <Text> Loading </Text>
    }
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={feedData}
        renderItem={(item) =>
          <TouchableOpacity onPress={() => navigate('PodcastDetail')} >
            <View style={styles.buttonContainer} >
              <Image
              style={styles.image}
              source={{uri: 'https://dfkfj8j276wwv.cloudfront.net/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg'}}
              />
              <View style={styles.textContainer}>  
                <Text style={styles.podcastTitle}>{item.rss.channel[0].title[0]}</Text>
                <Text>The New York Times</Text>
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