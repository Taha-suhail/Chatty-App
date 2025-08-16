import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';
import ChatScreen from './src/screens/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { ChatProvider } from './src/context/ChatContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  // useEffect(() => {
  //   const clearStorage = async () => {
  //     await AsyncStorage.removeItem('chatState');
  //     console.log('Chat state cleared');
  //   };
  //   clearStorage();
  // }, []);
  return (
    <ChatProvider>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </ChatProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
