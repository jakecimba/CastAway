import React , {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {PodcastListItem} from './PodcastListItem';

export default PodcastList = ({items, onPodcastSelected}) =>
  <View style={styles.container}>
    <FlatList
      data={items}
      renderItem={({item}) =>
        <PodcastListItem item={item} 
        onPodcastSelected={onPodcastSelected}
        />
      }
      keyExtractor={item => item.title}
    />
  </View>

const styles = {
  container: {
    flex: 1
  }
}

export {PodcastList};