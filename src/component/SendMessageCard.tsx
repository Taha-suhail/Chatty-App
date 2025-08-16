import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { colors } from '../styles/colors';
import { s, vs } from 'react-native-size-matters';
import { useChat } from '../context/ChatContext';
interface isSendMessageCard {
  message: string;
}
const SendMessageCard: FC<isSendMessageCard> = ({ message }) => {
  const { state, dispatch } = useChat();
  const dark = state.isDark;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageContainer,
          { backgroundColor: dark ? colors.ChatBlack : colors.black },
        ]}
      >
        <Text style={styles.textMessage}>{message}</Text>
      </View>
    </View>
  );
};

export default SendMessageCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: vs(4),
  },
  messageContainer: {
    backgroundColor: colors.black,
    borderRadius: s(20),
    maxWidth: '80%',
    padding: s(12),
  },
  textMessage: {
    fontSize: s(16),
    color: colors.white,
  },
});
