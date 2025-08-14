import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { colors } from '../styles/colors';
import { s, vs } from 'react-native-size-matters';
interface isSendMessageCard {
  message: string;
}
const SendMessageCard: FC<isSendMessageCard> = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
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
