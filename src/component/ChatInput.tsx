import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { colors } from '../styles/colors';
import { s, vs } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
interface ChatInputProps {
  messageValue: string;
  setMessage: (message: string) => void;
  onMessageSent: (message: string) => void;
}
const ChatInput: FC<ChatInputProps> = ({
  messageValue,
  setMessage,
  onMessageSent,
}) => {
  const sendMessageHandler = () => {
    if (messageValue.trim().length > 0) {
      onMessageSent(messageValue);
      setMessage('');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask anything"
        multiline
        value={messageValue}
        onChangeText={setMessage}
        placeholderTextColor={colors.black}
      />
      <TouchableOpacity style={styles.sendBtn} onPress={sendMessageHandler}>
        <Feather name="send" size={s(15)} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.mediumGray,
    padding: s(10),
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray,
    paddingHorizontal: s(15),
    paddingVertical: vs(10),
    marginRight: 10,
    borderRadius: s(20),
  },
  sendBtn: {
    backgroundColor: colors.black,
    width: s(35),
    height: s(35),
    borderRadius: s(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
