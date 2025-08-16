import React, { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import AppHeader from '../component/AppHeader';
import SendMessageCard from '../component/SendMessageCard';
import ResponseMessageCard from '../component/ResponseMessageCard';
import { s } from 'react-native-size-matters';
import { SENT, RECEIVED, useChat } from '../context/ChatContext';
import ChatInput from '../component/ChatInput';
import EmptyChat from '../component/EmptyChat';
import { geminiResponse } from '../api/http-request';
import { colors } from '../styles/colors';

const ChatScreen = () => {
  const { state, dispatch } = useChat();
  const activeRoom = state.rooms.find(r => r.id === state.activeRoomId);
  const [msgInput, setMsgInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const flatlistRef = useRef(null);

  const scrollToBottom = () => {
    if (flatlistRef.current && activeRoom?.messages.length > 0) {
      flatlistRef.current.scrollToEnd({ animated: true });
    }
  };

  const onMessageSent = (sentMsg: string) => {
    dispatch({
      type: 'ADD_MESSAGE',
      roomId: activeRoom.id,
      message: { id: Date.now(), message: sentMsg, type: SENT },
    });

    responseFromGemini(sentMsg);
  };

  const responseFromGemini = async msg => {
    setThinking(true);
    const response = await geminiResponse(msg);
    dispatch({
      type: 'ADD_MESSAGE',
      roomId: activeRoom.id,
      message: { id: Date.now(), message: response, type: RECEIVED },
    });
    setThinking(false);
  };

  if (!activeRoom) {
    return <Text style={{ padding: 20 }}>No chat selected</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: state.isDark ? colors.black : undefined,
      }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <AppHeader />
        <FlatList
          ref={flatlistRef}
          data={activeRoom.messages}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            item.type === SENT ? (
              <SendMessageCard message={item.message} />
            ) : (
              <ResponseMessageCard message={item.message} />
            )
          }
          ListFooterComponent={thinking ? <Text>Thinking...</Text> : null}
          contentContainerStyle={{ paddingHorizontal: s(8) }}
          ListEmptyComponent={<EmptyChat />}
          onLayout={scrollToBottom}
          onContentSizeChange={scrollToBottom}
        />
        <ChatInput
          messageValue={msgInput}
          setMessage={setMsgInput}
          onMessageSent={onMessageSent}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
