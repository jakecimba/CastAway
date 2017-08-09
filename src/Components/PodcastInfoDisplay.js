import React , {Component} from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

export default PodcastInfoDisplay = ({generalInfoFeed}) =>
  <View>
    <View style={styles.ImageAndTextContainer}>
      <Image style={styles.image}
        source={{uri: generalInfoFeed.image[0].url[0]}}
      />
      <View style={styles.textContainer} >
        <Text style={styles.podcastTitle}>{generalInfoFeed["title"][0].replace("Podcast", "")}</Text>
        <Text style={styles.podcastAuthor}>{generalInfoFeed["itunes:author"][0]}</Text>
      </View>
    </View>
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>{generalInfoFeed["description"][0]}</Text>
    </View>
  </View>


const styles = {
  description: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    left: 18,
    top: 26,
    height: 105,
    width: 339
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  ImageAndTextContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    left: 31,
    bottom: -4
  },
  image: {
    height: 105,
    width: 105,
    left: 18
  },
  podcastTitle: {
    fontSize: 28,
    letterSpacing: 1.6,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    marginBottom: 6,
    width: 200,
  },
  podcastAuthor: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    letterSpacing: 0.2,
    color: 'rgb(208, 208, 208)',
  },
}

export {PodcastInfoDisplay};