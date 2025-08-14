import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import GoogleSignIn from './src/lessons/GoogleSignIn';
import CameraGallery from './src/lessons/CameraGallery';
import BootSplash from 'react-native-bootsplash';
import AppIcon from './assets/icons/AppIcon';
import ChatScreen from './src/screens/ChatScreen';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);
  return <ChatScreen />;
};

export default App;

const styles = StyleSheet.create({});
