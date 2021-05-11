
import React, { useEffect,useMemo,useState } from 'react';
import { ImageBackground,StyleSheet, Text, View,Button,Alert,TouchableOpacity,TextInput,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {login} from '../APIs/services'
const image = require('../assets/LoginPage.png')
export default function LoginPage({navigation}) {
  //for loading
  const [isloading, setIsloading] = useState(false);
  //for data to be sent
  const [data,setData] = useState({});
    //for username
  const [username,setUsername] = useState("");
  //for password
  const [password,setPassword] = useState("");

  //Fill data state when username or password state changes
  useEffect(()=>{
    setData({
      username:username,
      password:password
    })
  },[username,password])

  //JsonWebToken Adding tokens to memory for
  const setToken = async (data)=>{
    try{
      await AsyncStorage.setItem('token',data);
    }catch(err){
      console.log(err);
    }
  }

  //Login Request
  const loginFromApi = ()=>{
    setIsloading(true)
    login(data).then(function(response) {
      console.log(response)

      //Sends the token from request to the setToken method
      setToken(response.data.token);
      if(response.data.length===0){
        navigation.navigate('Login')
        return
      }
      navigation.navigate('SampleCourse')
      setIsloading(false)
    }).catch(function(err) {
      setIsloading(false)
      console.log(err)
    })
  }
  

  //manage loading stat and if loading status is true, show loading
  if(isloading){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
         <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.loginGrup}>

            <View style={styles.searchSection}>
                <Icon  name='person-outline' size={20} color="#000"/>
                <TextInput
                    autoCapitalize='none'
                    keyboardType="default"
                    placeholder="Username"
                    style={styles.input}
                    onChangeText={val =>{setUsername(val)}}
                />
            </View>
            <View style={styles.searchSection}>
                <Icon  name='lock-closed-outline' size={20} color="#000"/>
                <TextInput
                    onChangeText={val =>{setPassword(val)}}
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <TouchableOpacity 
            onPress={loginFromApi}
                  style ={styles.Login}>
                    <Text style={styles.loginText}>Login</Text>
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
  loginGrup:{
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
