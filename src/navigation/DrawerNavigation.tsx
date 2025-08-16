import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import ChatScreen from '../screens/ChatScreen';
import { useChat } from '../context/ChatContext';
import { View, Text, TouchableOpacity } from 'react-native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { state, dispatch } = useChat();

  return (
    <DrawerContentScrollView {...props}>
      {state.rooms.map(room => {
        const isActive = room.id === state.activeRoomId; // ✅ Check active room

        return (
          <TouchableOpacity
            key={room.id}
            style={{
              padding: 15,
              backgroundColor: isActive ? '#ddd' : 'transparent', // highlight active
            }}
            onPress={() => {
              dispatch({ type: 'SET_ACTIVE_ROOM', id: room.id });
              props.navigation.navigate('Chat');
            }}
          >
            <Text style={{ color: isActive ? '#000' : '#000' }}>
              {room.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={{ padding: 15, backgroundColor: '#fff', marginTop: 20 }}
        onPress={() => {
          dispatch({
            type: 'ADD_ROOM',
            name: `Chat ${state.rooms.length + 1}`,
          });
          props.navigation.navigate('Chat');
        }}
      >
        <Text>+ New Chat</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Chat" component={ChatScreen} />
    </Drawer.Navigator>
  );
}
