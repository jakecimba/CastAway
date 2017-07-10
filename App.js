import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './src/Components/HomeScreen';
import { EpisodeScreen } from './src/Components/EpisodeScreen';


const MyPodcastApp = StackNavigator({
  Home: { screen: HomeScreen },
  Episode: { screen: EpisodeScreen },
});

export default MyPodcastApp;
