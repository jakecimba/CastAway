import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

class ImageDescriptionButton extends React.Component {
  state = {
    descriptionDisplayed: false,
  };

  render() {
    let image = this.props.imageLink;
    let description = this.props.episodeDescription;
    let descriptionBlock = <Text style={styles.text}>{description}</Text>
    let imageBlock = <Image style={styles.image} source={{uri: image}} />
    let buttonDisplay = this.state.descriptionDisplayed ? descriptionBlock : imageBlock;
    
    return (
      <View style={styles.button} >
        <TouchableOpacity onPress={() => {
          if (!this.state.descriptionDisplayed) {
            this.setState({descriptionDisplayed: true});
          } else {
            this.setState({descriptionDisplayed: false});
          }
        }}>
          <View>{buttonDisplay}</View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  button: {
    height: 300,
    width: 300,
    margin: 1,
    backgroundColor: '#696969',
  },
  image: {
    width: 300,
    height: 300
  },
  text: {
    margin: 10,
    color: 'white'
  }
}

export { ImageDescriptionButton };