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
  <View>
    <FlatList
      data={items}
      renderItem={({item}) =>
        <PodcastListItem item={item} 
        onPodcastSelected={onPodcastSelected}
        />
      }  
    />
  </View>

export {PodcastList};