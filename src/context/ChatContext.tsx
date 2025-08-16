import React, { createContext, useReducer, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SENT = 'SENT';
export const RECEIVED = 'RECEIVED';

type Message = {
  id: number;
  message: string;
  type: string;
};

type ChatRoom = {
  id: string;
  name: string;
  messages: Message[];
};

type ChatState = {
  rooms: ChatRoom[];
  activeRoomId: string | null;
  isDark: boolean;
};

type ChatAction =
  | { type: 'ADD_ROOM'; name: string }
  | { type: 'SET_ACTIVE_ROOM'; id: string }
  | { type: 'ADD_MESSAGE'; roomId: string; message: Message }
  | { type: 'LOAD_STATE'; payload: ChatState }
  | { type: 'TOGGLE_THEME' };

const defaultRoomId = Date.now().toString();

const initialState: ChatState = {
  rooms: [
    {
      id: defaultRoomId,
      name: 'General Chat', // or whatever name you want
      messages: [],
    },
  ],
  activeRoomId: defaultRoomId, // set the first room as active by default
  isDark: false,
};
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_ROOM':
      const newRoom: ChatRoom = {
        id: Date.now().toString(),
        name: action.name,
        messages: [],
      };
      return {
        ...state,
        rooms: [...state.rooms, newRoom],
        activeRoomId: newRoom.id,
      };

    case 'SET_ACTIVE_ROOM':
      return { ...state, activeRoomId: action.id };

    case 'ADD_MESSAGE':
      return {
        ...state,
        rooms: state.rooms.map(room =>
          room.id === action.roomId
            ? { ...room, messages: [...room.messages, action.message] }
            : room,
        ),
      };
    case 'LOAD_STATE':
      return {
        ...initialState, // fallback values
        ...action.payload,
      };
    case 'TOGGLE_THEME':
      return { ...state, isDark: !state.isDark };
    default:
      return state;
  }
}

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
}>({ state: initialState, dispatch: () => {} });

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  useEffect(() => {
    const loadChats = async () => {
      try {
        const savedData = await AsyncStorage.getItem('chatState');
        if (savedData) {
          const parsedState: ChatState = JSON.parse(savedData);
          dispatch({ type: 'LOAD_STATE', payload: parsedState });
        }
      } catch (error) {
        console.log('Error loading chats:', error);
      }
    };

    loadChats();
  }, []);

  // Save chats whenever state changes
  useEffect(() => {
    AsyncStorage.setItem('chatState', JSON.stringify(state));
  }, [state]);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
