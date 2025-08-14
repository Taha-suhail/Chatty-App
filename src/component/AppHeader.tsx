import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppIcon from '../../assets/icons/AppIcon';
import { s, vs } from 'react-native-size-matters';
import { colors } from '../styles/colors';
import { IS_ANDROID } from '../constants/Platform';

const AppHeader = () => {
  return (
    <View style={styles.container}>
      <AppIcon height={s(30)} width={s(30)} stroke={'#fff'} />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vs(12),
    backgroundColor: colors.black,
    paddingTop: IS_ANDROID ? undefined : vs(43),
  },
});
