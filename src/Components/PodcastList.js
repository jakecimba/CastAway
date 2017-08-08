import React , { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  View,
  FlatList,
} from 'react-native';
import {PodcastListItem} from './PodcastListItem';

class PodcastList extends PureComponent {

  state = {selected: (new Map(): Map<string, boolean>)}

  _keyExtractor = (item, index) => item.title

  _onPressItem = (title: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected)
      selected.set(title, !selected.get(title))
      return {selected}
    })
  }

  _renderItem = ({item}) => (
    <PodcastListItem item={item}
      onPressItem={this._onPressItem}
      navigateToEpisode={this.props.navigateToEpisode}
      selected={!!this.state.selected.get(item.title)}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.items}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1
  }
}

export {PodcastList};
