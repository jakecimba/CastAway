import React , {Component} from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

export default PodcastInfoDisplay = ({generalInfoFeed}) =>
  <View style={styles.container}>
    <Image style={styles.image}
      style={{width: 100, height: 100}}
      source={{uri: generalInfoFeed.image[0].url[0]}}
    />
    <View style={styles.textContainer} >
      <Text>{generalInfoFeed["title"][0]}</Text>
      <Text>By {generalInfoFeed["itunes:author"][0]}</Text>
      <Text>{generalInfoFeed["description"][0]}</Text>
    </View>
  </View>


const styles = {
  container: {
    padding: 5,
    flexDirection: 'row',
  },
  textContainer: {
    padding: 5,
    flex: 1,
    flexDirection: 'column'
  }
}

export {PodcastInfoDisplay};