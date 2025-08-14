import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CameraGallery = () => {
  const [imageUri, setImageUri] = React.useState('');
  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.didCancel === true) {
        Alert.alert('No image selected');
        return;
      }
      console.log('Gallery result:', result);
      setImageUri(result.assets?.[0]?.uri);
    } catch (error) {
      console.error('Error opening gallery:', error);
    }
  };
  const openCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
      });
      console.log('Gallery result:', result);
      setImageUri(result.assets?.[0]?.uri);
    } catch (error) {
      console.error('Error opening gallery:', error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <Text style={{ color: 'white', fontSize: 30 }} onPress={openGallery}>
        Open Gallery
      </Text>
      <Text style={{ color: 'white', fontSize: 30 }} onPress={openCamera}>
        Open Camera
      </Text>
      <Image
        style={{ height: 250, width: 250, borderRadius: 8 }}
        source={{ uri: imageUri }}
      />
    </SafeAreaView>
  );
};

export default CameraGallery;

const styles = StyleSheet.create({});
