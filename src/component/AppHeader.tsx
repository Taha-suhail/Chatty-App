import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppIcon from '../../assets/icons/AppIcon';
import { s, vs } from 'react-native-size-matters';
import { colors } from '../styles/colors';
import { IS_ANDROID } from '../constants/Platform';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useChat } from '../context/ChatContext';
type DrawerNav = DrawerNavigationProp<any>;

const AppHeader = () => {
  const { state, dispatch } = useChat();
  const navigation = useNavigation<DrawerNav>();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.icon}
      >
        <Entypo name="menu" size={s(28)} color={colors.white} />
      </TouchableOpacity>

      <View style={styles.container}>
        <AppIcon height={s(30)} width={s(30)} stroke={'#fff'} />
      </View>
      {state.isDark ? (
        <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_THEME' })}>
          <Feather name="sun" size={s(28)} color={colors.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_THEME' })}>
          <MaterialIcons name="dark-mode" size={s(28)} color={colors.white} />
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_THEME' })}>
        <MaterialIcons name="dark-mode" size={s(28)} color={colors.white} />
      </TouchableOpacity> */}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: vs(12),
    // backgroundColor: colors.black,
    // paddingTop: IS_ANDROID ? undefined : vs(43),
  },
  mainContainer: {
    flexDirection: 'row',
    paddingVertical: vs(16),
    backgroundColor: colors.black,
    paddingTop: IS_ANDROID ? undefined : vs(43),
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(12),
    // gap: s(130),
  },
  icon: {},
});
