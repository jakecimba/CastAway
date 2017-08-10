import React , {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
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
    headerTitleStyle: {color: 'white', fontSize: 18, fontFamily: 'Montserrat-SemiBold', letterSpacing: 1.4},
    headerStyle: {backgroundColor: 'black', height: 74}
  };
  
  componentWillMount() {
    var storage = []
    var channels = this.state.channels
    for (i = 0; i < channels.length; i++) {
      var getData = fetchXml(channels[i].key)
      .then((json) => {
        return json
      })
      .catch((error) => {
        console.log(error)
      });
      storage.push(getData);
    }

    Promise.all(storage).then((objects) => {
      this.setState({feedData: objects})
    })
  }
  
  render() {
    let feedData = this.state.feedData
    
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={{uri: 'backgroundFadeLandingPage'}} style={styles.background}>
        <FlatList
          data={feedData}
          renderItem={({item}) =>
            <TouchableHighlight onPress={() => navigate('PodcastDetail', { xmlData: item })} >
              <View style={styles.buttonContainer} >
                <Image
                style={styles.image}
                source={{uri: item.rss.channel[0].image[0].url[0]}}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.podcastTitle}>{item.rss.channel[0].title[0].replace("Podcast", "")}</Text>
                  <Text style={styles.podcastAuthor}>{item.rss.channel[0]["itunes:author"][0]}</Text>
                </View>
              </View>
            </TouchableHighlight>
          }
          keyExtractor={item => item.rss.channel[0].title[0]}
        />
      </ImageBackground>
    )
  }
}

const styles = {
  background: {
    flex: 1
  },
  buttonContainer: {
    height: 123.2,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(53, 53, 53)',
    marginBottom: 3.8
  },
  textContainer: {
    left: 33,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  image: {
    height: 76,
    width: 78,
    left: 18,
    top: 24,
  },
  podcastTitle: {
    fontSize: 23,
    letterSpacing: 1.6,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    marginBottom: 6,
    lineHeight: 24,
    width: 175
  },
  podcastAuthor: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    letterSpacing: 0.2,
    color: 'rgb(208, 208, 208)',
  },
}

export { AllPodcastsScreen };