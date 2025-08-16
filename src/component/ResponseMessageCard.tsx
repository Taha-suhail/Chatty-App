import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { s, vs } from 'react-native-size-matters';
import { colors } from '../styles/colors';
import TypingEffect from './TypingEffect';
import { useChat } from '../context/ChatContext';
interface ResponseMessageCardProp {
  message: string;
}
const ResponseMessageCard: FC<ResponseMessageCardProp> = ({
  message,
  thinking,
}) => {
  const { state, dispatch } = useChat();
  const dark = state.isDark;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageContainer,
          { backgroundColor: dark ? colors.black : '#e8e8e8' },
        ]}
      >
        <Text>{message}</Text>
        <Text style={styles.messageText}>-------------------</Text>
        <TypingEffect text={message} style={styles.messageText} />
      </View>
    </View>
  );
};

export default ResponseMessageCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: vs(4),
    marginBottom: vs(12),
  },
  messageContainer: {
    backgroundColor: '#e8e8e8',
    borderRadius: s(20),
    maxWidth: '80%',
    padding: s(10),
  },
  messageText: {
    color: colors.black,

    fontSize: s(16),
  },
});
