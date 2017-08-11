import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
var striptags = require('striptags');
import Carousel from 'react-native-looped-carousel';

class ImageDescriptionButton extends Component {

  render() {
    let image = this.props.episode['itunes:image'][0]["$"].href;
    let description = String(this.props.episode.description);
    description = striptags(description, [] , "");
    function formatDuration(duration) {
        var i = 0;
        while (duration[i] == '0' || duration[i] == ':') {
          duration = duration.substring(1, duration.length)
        };
        return duration;
    }
    return (
      <View >
        <Carousel
          style={styles.container}
          onAnimateNextPage={(p) => console.log(p)}
        >

          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: image}} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.episode.title}</Text>
            <Text style={styles.podcastTitle}>{this.props.podcastTitle}</Text>
            <Text style={styles.author}>{this.props.author}</Text>
            <Text style={styles.duration}>{formatDuration(this.props.duration)}</Text>
            <Text style={styles.description} adjustsFontSizeToFit={true}>{description}</Text>
          </View>
        </Carousel>
      </View>
    );
  }
}

const styles = {
  container: {
    height: 339,
    width: 339
  },
  imageContainer: {
    height: 339,
    width: 339,
  },
  textContainer: {
    height: 339,
    width: 339,
    paddingLeft: 20,
    paddingTop: 12,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  button: {
    height: 339,
    width: 339,
    margin: 1,
    backgroundColor: 'transparent',
  },
  image: {
    width: 339,
    height: 339
  },
  description: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    height: 168,
    width: 298

  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'white',
    letterSpacing: 1.4,
  },
  podcastTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
    color: 'white',
    letterSpacing: 1.6,
  },
  author: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: 'rgb(155, 155, 155)',
    letterSpacing: 0.2,
  },
  duration: {
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    lineHeight: 14,
    color: 'rgb(155, 155, 155)',  
  }
}

export { ImageDescriptionButton };