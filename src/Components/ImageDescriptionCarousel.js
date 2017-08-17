import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import Carousel from 'react-native-looped-carousel';
import {palette} from './Palette';
var striptags = require('striptags');

class ImageDescriptionCarousel extends Component {

  render() {
    let image = this.props.episode['itunes:image'][0]["$"].href;
    let description = String(this.props.episode.description).replace("&nbsp", "");
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
          autoplay={false}
          bullets={true}
          bulletStyle={styles.bullet}
          chosenBulletStyle={styles.bullet}
          bulletsContainerStyle={styles.bulletsContainer}
        >

          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: image}} />
          </View>
          <ScrollView style={styles.textContainer}>
            <Text style={styles.title}>{this.props.episode.title}</Text>
            <Text style={styles.podcastTitle}>{this.props.podcastTitle}</Text>
            <Text style={styles.author}>{this.props.author}</Text>
            <Text style={styles.duration}>{formatDuration(this.props.duration)}</Text>
            <Text style={styles.description}>{description}</Text>
          </ScrollView>
        </Carousel>
      </View>
    );
  }
}

const carouselDimension = 339;
const styles = {
  bullet: {
    height: 7,
    width: 7
  },
  bulletsContainer:{
    top: 35,
  },
  container: {
    height: carouselDimension,
    width: carouselDimension
  },
  imageContainer: {
    height: carouselDimension,
    width: carouselDimension,
  },
  textContainer: {
    height: carouselDimension,
    width: carouselDimension,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  image: {
    width: carouselDimension,
    height: carouselDimension
  },
  description: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 21,
    width: 298,
    paddingBottom: 24
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'white',
    letterSpacing: 1.4,
    paddingBottom: 6
  },
  podcastTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
    color: 'white',
    letterSpacing: 1.6,
    paddingBottom: 6
  },
  author: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: palette.author,
    letterSpacing: 0.2,
    paddingBottom: 6
  },
  duration: {
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    lineHeight: 14,
    color: palette.timeStamp,
    paddingBottom: 18
  }
}

export { ImageDescriptionCarousel };