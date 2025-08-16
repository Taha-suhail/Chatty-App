import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppIcon from '../../assets/icons/AppIcon';
import { s, vs } from 'react-native-size-matters';
import { useChat } from '../context/ChatContext';
import { colors } from '../styles/colors';

const EmptyChat = () => {
  const { state, dispatch } = useChat();
  const dark = state.isDark;
  return (
    <View style={styles.container}>
      <AppIcon
        height={vs(100)}
        width={s(100)}
        stroke={dark ? colors.white : colors.black}
      />
      <Text
        style={[styles.title, { color: dark ? colors.white : colors.black }]}
      >
        Hello
      </Text>
      <Text
        style={[styles.subtitle, { color: dark ? colors.white : colors.black }]}
      >
        What can i help you with?
      </Text>
    </View>
  );
};

export default EmptyChat;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: s(150),
  },
  title: {
    fontSize: s(24),
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: s(18),
  },
});
