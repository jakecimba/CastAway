import React , {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Text,
  View,
  ImageBackground,
} from 'react-native';
import { fetchXml } from './DataSource';
import {PodcastList} from './PodcastList';
import {PodcastInfoDisplay} from './PodcastInfoDisplay';
import {palette} from './Palette';

class PodcastDetailScreen extends Component {
  state = {
    feedData: null,
  };
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.xmlData.rss.channel[0].title[0],
    headerTitleStyle: {color: 'white', fontSize: 18, fontFamily: 'Montserrat-SemiBold', letterSpacing: 1.4},
    headerStyle: {backgroundColor: 'black', height: 74},
    headerTintColor: 'white',
    headerBackTitle: null,
  });

  componentWillMount() {
    this.setState({feedData: this.props.navigation.state.params.xmlData})
  }

  navigateToEpisode(episode) {
    var author = this.props.navigation.state.params.xmlData.rss.channel[0]["itunes:author"][0]
    var title = this.props.navigation.state.params.xmlData.rss.channel[0].title[0]
    this.props.navigation.navigate('Episode', { episode: episode, title: title, author: author})
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
        <ImageBackground source={{uri: 'backgroundFadePodcastScreen'}} style={styles.background}>
          <PodcastInfoDisplay generalInfoFeed={generalFeed} />
        </ImageBackground>
        <Text style={styles.allEpisodes}>All Episodes</Text>
        <PodcastList 
          navigateToEpisode={ (episode) => { this.navigateToEpisode(episode) }}
          items={feedItems}
        />
      </View>
    )
  }
}

const styles = {
  background: {
    height: 261
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  allEpisodes: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    padding: 2,
    paddingLeft: 16,
    backgroundColor: palette.allEpisodes
  }
}

export {PodcastDetailScreen};