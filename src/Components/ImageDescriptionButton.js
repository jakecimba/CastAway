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
            this.setState({descriptionDisplayed: !this.state.descriptionDisplayed});
        }}>
          <View>{buttonDisplay}</View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  button: {
    height: 339,
    width: 339,
    margin: 1,
    backgroundColor: '#696969',
  },
  image: {
    width: 339,
    height: 339
  },
  text: {
    margin: 10,
    color: 'white'
  }
}

export { ImageDescriptionButton };