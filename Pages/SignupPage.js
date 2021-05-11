import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useEffect, useState } from 'react';
import { ImageBackground,StyleSheet, Text, View,Button,Alert,TouchableOpacity,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {register} from '../APIs/services'
const image = require('../assets/RegisterPage.png')
export default function SignupPage({navigation}) {

  const [data,setData] = useState({});
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");

  {/*Fills the data state when username password and e-mail values ​​change in input*/}
  useEffect(()=>{
    setData({
      username:username,
      password:password,
      email:email,
    })
  },[username,password,email])

  useEffect(()=>{
    console.log(data)
  },[data])



  const registerFromApi = () => {
    if((data.username=="" || data.username==null) || (data.email=="" || data.email==null) || (data.password=="" || data.password==null)){
      Alert.alert("Fill in the fields");
      return
    }
      register(data)
      .then(function(response) {
        console.log(response)
        navigation.navigate('Login')
      })
      .catch(function(err) {
        console.log(err)
      })
  }
  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.signUpGrup}>
          <View style={styles.searchSection}>
              <Icon  name='person-outline' size={20} color="#000"/>
              <TextInput
                  placeholder="Username"
                  style={styles.input}
                  onChangeText={val =>{setUsername(val)}}
              />
          </View>
          <View style={styles.searchSection}>
              <Icon  name='lock-closed-outline' size={20} color="#000"/>
              <TextInput
                  placeholder="E-Mail"
                  style={styles.input}
                  onChangeText={val =>{setEmail(val)}}
              />
          </View>
          <View style={styles.searchSection}>
              <Icon  name='lock-closed-outline' size={20} color="#000"/>
              <TextInput
                  placeholder="Password"
                  style={styles.input}
                  onChangeText={val =>{setPassword(val)}}
                  secureTextEntry
              />
          </View>
          <TouchableOpacity
              onPress={registerFromApi} 
                style ={styles.Login}>
                  <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity> 
        </View>
        </ImageBackground>
        </KeyboardAwareScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding:0,
    margin:0,
    flex: 1,
    flexDirection: "column",
    backgroundColor:'white',
  },
  Login:{
    height: 60,
    borderRadius:10,
    backgroundColor:'#7e52be',
    marginTop :20,
    width:'80%',
    marginLeft:20
  },
  image: {


  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  signUpGrup:{
    marginTop:'100%',
    backgroundColor:'white',
    alignItems: 'center',
    height:'50%',
    paddingBottom:15
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth:1,
    borderColor:'black',
    maxHeight:27,
    marginTop:'5%',
    width:'77%',
    marginLeft:20
  },
  input:{
    width:'100%',
    height:20,
  },
  loginText:{
    textAlign: 'center',
    width: 'auto',
    marginTop:20,
    color:'white',
    margin:'auto'
  }
});
