import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'


const SplashScreen = ({navigation}) => {
  
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Signup');
    }, 2000);
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>RN Chat App</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F9FAFB',
    },
    logoText:{
        fontSize:32,
        fontWeight:'bold',
        color:'#333',
        textAlign:'center',
      }

})