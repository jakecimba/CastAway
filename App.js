import { StackNavigator } from 'react-navigation';
import { PodcastDetailScreen } from './src/Components/PodcastDetailScreen';
import { EpisodeScreen } from './src/Components/EpisodeScreen';
import { AllPodcastsScreen } from './src/Components/AllPodcastsScreen';


const MyPodcastApp = StackNavigator({
  AllPodcasts: { screen: AllPodcastsScreen },
  PodcastDetail: { screen: PodcastDetailScreen },
  Episode: { screen: EpisodeScreen },
});

export default MyPodcastApp;
