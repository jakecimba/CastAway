import React , {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class AllPodcastsScreen extends Component {
  render() {
  const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity onPress={() => navigate('PodcastDetail')} >
        <View style={styles.container} >
          <Text>The Daily</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  container: {
    height: 50,
    width: 200,
    backgroundColor: 'grey'
  }
}

export { AllPodcastsScreen };