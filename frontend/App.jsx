import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {

  return (
    
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App

