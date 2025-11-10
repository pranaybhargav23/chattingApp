import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try{
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
      const response = await fetch("http://10.0.2.2:5000/api/login", options);
      const data = await response.json();
      console.log('Login response data:----->', data.token);
      if(data.token){
        await AsyncStorage.setItem('token', data.token);
         navigation.navigate('TabNavigation');
      }else{
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      }
      setEmail('');
      setPassword('');
    }catch(err){
      console.error('Error during login:', err);
     
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Log In</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Email" 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput 
          placeholder="Password" 
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        
        {/* Divider */}
        {/* <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View> */}
        
        {/* Google Login Button */}
       
        
        {/* Signup Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    width: 350,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 32,
    paddingHorizontal: 16,
    marginVertical: 8,
    marginLeft: 10,
  },
  inputContainer: { 
    marginTop: 50, 
    alignItems: 'center' 
  },
  button: {
    backgroundColor: '#e93e3eff',
    padding: 15,
    width: 350,
    borderRadius: 32,
    marginTop: 30,
    alignItems: 'center',
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 16,
  },
  signupLink: {
    color: '#e93e3eff',
    fontSize: 16,
    fontWeight: '600',
  },
});