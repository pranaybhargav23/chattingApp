import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import TabNavigation from './TabNavigation';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator  initialRouteName= "splash" screenOptions={{headerShown:false}} >
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />

        
    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})