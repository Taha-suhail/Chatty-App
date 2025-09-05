import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import ChatScreen from '../screens/ChatScreen';
import { useChat } from '../context/ChatContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { state, dispatch } = useChat();
  const dark = state.isDark;
  return (
    <DrawerContentScrollView
      {...props}
      style={[{ backgroundColor: dark ? colors.black : colors.white }]}
    >
      {state.rooms.map(room => {
        const isActive = room.id === state.activeRoomId; // ✅ Check active room

        return (
          <TouchableOpacity
            key={room.id}
            style={{
              padding: 15,
              backgroundColor:
                isActive && dark
                  ? 'hsla(0, 0%, 37%, 1.00)'
                  : isActive && !dark
                  ? '#ddd'
                  : 'transparent', // highlight active
              borderBottomWidth: 0.5,
              borderColor: '#fff',
            }}
            onPress={() => {
              dispatch({ type: 'SET_ACTIVE_ROOM', id: room.id });
              props.navigation.navigate('Chat');
            }}
          >
            <Text
              style={{
                color:
                  isActive && dark
                    ? '#fff'
                    : !isActive && dark
                    ? colors.white
                    : '#000',
              }}
            >
              {room.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: dark ? colors.black : colors.white,
          marginTop: 20,
          borderWidth: dark ? 0.5 : undefined,
        }}
        onPress={() => {
          dispatch({
            type: 'ADD_ROOM',
            name: `Chat ${state.rooms.length + 1}`,
          });
          props.navigation.navigate('Chat');
        }}
      >
        <Text style={{ color: dark ? colors.white : colors.black }}>
          + New Chat
        </Text>
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
