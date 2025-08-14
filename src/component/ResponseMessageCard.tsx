import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { s, vs } from 'react-native-size-matters';
import { colors } from '../styles/colors';
import TypingEffect from './TypingEffect';
interface ResponseMessageCardProp {
  message: string;
}
const ResponseMessageCard: FC<ResponseMessageCardProp> = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {/* <Text style={styles.messageText}>{message}</Text>hel */}
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
