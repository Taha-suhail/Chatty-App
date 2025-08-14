import {
  Button,
  FlatList,
  FlatListProps,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AppHeader from '../component/AppHeader';
import SendMessageCard from '../component/SendMessageCard';
import ResponseMessageCard from '../component/ResponseMessageCard';
import { s } from 'react-native-size-matters';
import { RECEIVED, SENT } from '../constants/Chat';
import ChatInput from '../component/ChatInput';
import EmptyChat from '../component/EmptyChat';
import { geminiResponse, huggingFaceResponse } from '../api/http-request';
interface Message {
  id: number;
  message: string;
  type: string;
}
const ChatScreen = () => {
  const [thinking, setThinking] = useState<boolean>(false);
  const messageList: Message[] = [
    {
      message: 'Hello',
      id: 1,
      type: SENT,
    },
    {
      message: 'Hello, How can i assist you today',
      id: 2,
      type: RECEIVED,
    },
    {
      message: 'Tell me something about react native',
      id: 3,
      type: SENT,
    },
  ];
  const [messagesData, setMessagesData] = useState<Message[]>([]);
  const [msgInput, setMsgInput] = useState('');
  const flatlistRef = useRef<FlatList>(null);
  // function to scroll to bottom of the screen
  const scrollToBottom = () => {
    if (flatlistRef.current && messagesData.length > 0) {
      flatlistRef.current.scrollToEnd({ animated: true });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  //function to send a message to Ai
  const onMessageSent = (sentMsg: string) => {
    console.log('the User typed : ', msgInput);
    setMessagesData(prevMsg => {
      return [
        ...prevMsg,
        {
          message: msgInput,
          id: prevMsg.length + 1,
          type: SENT,
        },
      ];
    });
    responseFromGemini(sentMsg);
  };
  const responseFromGemini = async (msg: string) => {
    setThinking(true);
    const response = await geminiResponse(msg);
    onGetResponse(response);
    setThinking(false);
  };
  const onGetResponse = (response: string) => {
    setMessagesData(prevMsg => {
      return [
        ...prevMsg,
        {
          message: response,
          id: prevMsg.length + 1,
          type: RECEIVED,
        },
      ];
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <AppHeader />

        <FlatList
          ref={flatlistRef}
          data={messagesData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return item.type === SENT ? (
              <SendMessageCard message={item.message} />
            ) : (
              <ResponseMessageCard message={item.message} />
            );
          }}
          ListFooterComponent={
            thinking ? <Text style={{ padding: 8 }}>Thinking...</Text> : null
          }
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

const styles = StyleSheet.create({});
