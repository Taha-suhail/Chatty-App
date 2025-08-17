import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { s, vs } from 'react-native-size-matters';
import { colors } from '../styles/colors';
import TypingEffect from './TypingEffect';
import { useChat } from '../context/ChatContext';
interface ResponseMessageCardProp {
  message: string;
  isNew: boolean;
}
const ResponseMessageCard: FC<ResponseMessageCardProp> = ({
  message,
  isNew,
}) => {
  const { state } = useChat();
  const dark = state.isDark;
  const [animated, setAnimated] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(
        () => setAnimated(false),
        1000 + message.length * 20,
      );
      return () => clearTimeout(timer);
    }
  }, [isNew, message]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageContainer,
          { backgroundColor: dark ? colors.black : '#e8e8e8' },
        ]}
      >
        {animated ? (
          <TypingEffect text={message} style={styles.messageText} />
        ) : (
          <Text
            style={[
              styles.messageText,
              { color: dark ? colors.white : colors.black },
            ]}
          >
            {message}
          </Text>
        )}
        {/* <TypingEffect text={message} style={styles.messageText} /> */}
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
