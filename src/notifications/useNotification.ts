import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';

const requestNotificationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the notifications');
    } else {
      console.log('Notification permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('Token : ', token);
  } catch (error) {
    console.error('Error getting token: ', error);
  }
};
export const useNotification = () => {
  useEffect(() => {
    requestNotificationPermission();
    getToken();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const msgBody = remoteMessage.notification?.body || 'No body';
      const msgTitle = remoteMessage.notification?.title || 'No title';
      Alert.alert(msgBody, msgTitle);
    });

    return unsubscribe;
  }, []);
};
