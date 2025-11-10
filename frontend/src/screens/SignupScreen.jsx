import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');

  const onHandleSignup = async () => {
    try {
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      };
      const response = await fetch(
        'http://10.0.2.2:5000/api/register',
        options,
      );
      const data = await response.json();
      console.log('User data:----->', data);
      if (!data) {
        Alert.alert(
          'Signup Failed',
          'Please check your details and try again.',
        );
      }
      navigation.navigate('Login');

      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWithIcon}>
          <Icon name="account-circle" size={24} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        
        <View style={styles.inputWithIcon}>
          <Icon name="email" size={24} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        
        <View style={styles.inputWithIcon}>
          <Icon name="phone" size={24} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            keyboardType="numeric"
            value={number}
            onChangeText={setNumber}
          />
        </View>
        
        <View style={styles.inputWithIcon}>
          <Icon name="lock" size={24} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Divider */}
        {/* <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View> */}

        {/* Google Sign Up Button */}

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    paddingLeft: 10,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#e93e3eff',
    padding: 15,
    width: 350,
    borderRadius: 32,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 32,
    paddingHorizontal: 16,
    marginVertical: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: 350,
    marginLeft: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    width: 350,
    borderRadius: 32,
    alignItems: 'center',
    marginVertical: 8,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 16,
  },
  loginLink: {
    color: '#e93e3eff',
    fontSize: 16,
    fontWeight: '600',
  },
});
