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
  
  // componentWillMount() {
  //   function storeXml(channels, storage) {
  //     for (i = 0, len = channels.length; i < len; i++) {
  //       fetchXml(channels[i].key)
  //       .then((json) => {
  //         storage.push(json)
  //       }) 
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //     }
  //     return storage
  //   }
  //   let tempStorage = [];
  //   storeXml(this.state.channels, tempStorage)
  //   this.setState({feedData: tempStorage})
  // }
  
  render() {
    let feed = this.state.feedData;
    // if (!feed) {
    //   return (
    //     <Text>Loading</Text>
    //   )
    // }
    
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={[{item: 'a'}]}
        renderItem={(item) =>
          <TouchableOpacity onPress={() => navigate('PodcastDetail')} >
            <View style={styles.buttonContainer} >
              <Image
              style={styles.image}
              source={{uri: 'https://dfkfj8j276wwv.cloudfront.net/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg'}}
              />
              <View style={styles.textContainer}>  
                <Text style={styles.podcastTitle}>The Daily</Text>
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