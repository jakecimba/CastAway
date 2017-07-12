import React from 'react';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

export default getProgress = (info, callback) => { 
  var data = info;
  ReactNativeAudioStreaming.getStatus((error, data) => {
    if (error) {
      console.log(error);
    } else {
      callback(data);  
    }   
  });
};

export { getProgress };
