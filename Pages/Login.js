import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground,StyleSheet, Text, View,Button,Alert,TouchableOpacity,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const image = require('../assets/login2.png')
export default function Login({navigation}) {

  //For navigation
    const loginPage = ()=>{
        navigation.navigate('Login')
    }

    const signupPage = ()=>{
        navigation.navigate('Signup')
    }
  
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.loginGrup}>
        <TouchableOpacity 
                onPress={loginPage}
                style ={styles.Login}>
                  <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity> 

          <TouchableOpacity 
                onPress={signupPage}
                style ={styles.Signup}>
                  <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>

    </ImageBackground>
    <StatusBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  loginGrup:{
    marginTop:'75%',
    height:250,
    backgroundColor:'white',
  },

  Login:{
    height: 60,
    borderRadius:10,
    backgroundColor:'#7e52be',
    marginLeft :50,
    marginRight:50,
    marginTop :20,
  },

  Signup:{
    height: 60,
    borderRadius:10,
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: "thistle",
    marginLeft :50,
    marginRight:50,
    marginTop :50,
  },
  signupText:{
    textAlign: 'center',
    width: 'auto',
    marginTop:20,
    color:'black',
    margin:'auto',
  },
  loginText:{
    textAlign: 'center',
    width: 'auto',
    marginTop:20,
    color:'white',
    margin:'auto'
  }
});
