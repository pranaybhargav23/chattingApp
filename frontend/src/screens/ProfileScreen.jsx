import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  
  const onHandleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('User data in ProfileScreen:----->', parsedUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'App needs access to your gallery to select photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openGallery();
        } else {
          Alert.alert(
            'Permission denied',
            'Cannot access gallery without permission',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      openGallery();
    }
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setPhoto(source);
      }
    });
  };

  const handleImagePicker = () => {
    requestGalleryPermission();
  };
  return (
    <View style={styles.continaer}>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.profileContainer}>
          <Image
            source={
              photo || {
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }
            }
            style={{ height: '100%', width: '100%', borderRadius: 100 }}
            resizeMode="cover"
          />
          {/* Add Photo Overlay */}
          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={handleImagePicker}
          >
            <Icon name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
          Username: {user ? user.username : ''}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#666',
            fontWeight: 'bold',
            marginTop: 10,
          }}
        >
          Email: {user ? user.email : ''}
        </Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={onHandleLogOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  continaer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  profileContainer: {
    height: 150,
    width: 150,
    backgroundColor: '#ee85f4ff',
    borderWidth: 1,
    borderRadius: '50%',
    marginTop: 50,
    position: 'relative',
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#075E54',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  logoutButton: {
    marginTop: 50,
    alignSelf: 'center',
    height: 50,
    width: 200,
    backgroundColor: '#e93e3eff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
