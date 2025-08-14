import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const GoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '679386350596-6g95e74tccrnulhv2c7mqu8nt9q5e053.apps.googleusercontent.com',
  });
  const [userInfo, setUserInfo] = React.useState(null);
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log('response =', JSON.stringify(response, null, 3)); //JavaScript object into a JSON strin
        setUserInfo(response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <Text style={{ fontSize: 28, color: '#fff' }}>hello+-</Text>
      <Button title="Google Sign In" onPress={googleSignIn} color="#4285F4" />
      <Text style={{ fontSize: 28, color: '#fff' }}>
        {userInfo?.user?.name}
      </Text>
      <Text style={{ fontSize: 28, color: '#fff' }}>
        {userInfo.user?.email}
        <Image
          style={{ height: 30, width: 30 }}
          source={{ uri: userInfo?.user?.photo }}
        />
      </Text>
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({});
