import React , { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  View,
  FlatList,
} from 'react-native';
import {PodcastListItem} from './PodcastListItem';

var previousTitle;

class PodcastList extends PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)}

  keyExtractor = (item, index) => item.title

  onPressItem = (title: string) => {
    this.setState((state) => {
      if (state.selected.has(previousTitle)) {
        state.selected.delete(previousTitle)
      }
      const selected = new Map(state.selected)
      selected.set(title, !selected.get(title))
      previousTitle = title
      return {selected}
    })
  }

  renderItem = ({item}) => (
    <PodcastListItem item={item}
      onPressItem={this.onPressItem}
      navigateToEpisode={this.props.navigateToEpisode}
      selected={!!this.state.selected.get(item.title) || (previousTitle == item.title)}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.items}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
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
