import React, { useState,useEffect} from 'react';
import { View,StyleSheet,Text,Button,TouchableOpacity,Image,Alert} from 'react-native';
import { DraxProvider, DraxView } from 'react-native-drax';
import useDynamicRefs from 'use-dynamic-refs';
import { ProgressBar, Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../assets/congratulations.jpg')
export default function SampleCourse({navigation}){

    //Get the token information stored 
    async function getToken(){
        try{
            //fetch data with key token
            const value = await AsyncStorage.getItem('token');
            setToken(value)
        }catch(err){
            console.log(err);
        }
    }

    //To dynamically access react elements with reference
    const [getRef, setRef] =  useDynamicRefs();

    const [token,setToken] = useState()

    //if true then show congratulations component
    const [sholdShow, setSholdShow] = useState(false)
    //Percentage complete
    const [compolated, setComplated] = useState(0);

    //percentage of progressbar
    const [progress, setPRogress] = useState(0);

    //Left objects
    const [idLeft,setIdLeft]= useState('');
    //Right objects
    const [idRight,setIdRight]= useState('');

    //mock data
    const [correctAnswer,setCorrectAnswer] = useState([ 
    {
        answer:"pocket money",
    },
    {
        answer:"holiday resort",
    },
    {
        answer:"national park",
    },
    {
        answer:"scuba diving",
    },
    {
        answer:"office worker",
    }]);

    //mock data
    const [data,setData]=useState([
    {
        chosen1:"pocket",
        chosen2:"resort",
    },
    {
        chosen1:"scuba",
        chosen2:"park",
    },
    {
        chosen1:"national",
        chosen2:"money",
    },
    {
        chosen1:"holiday",
        chosen2:"diving",
    },
    {
        chosen1:"office",
        chosen2:"worker",
    }]);
    const [answer,setAnswer] = useState(``);

    //Run getToken method when component is called
    useEffect(()=>{
        getToken();
    })

    useEffect(()=>{

        //Creating css operation based on drag and drop changing answer, idLeft, idRight states

        correctAnswer.map(r=>{
            if(r.answer==answer){
                const refIdLeft = getRef(idLeft)
                const refIdRight = getRef(idRight)
                setComplated(compolated+0.2)
                setPRogress(progress+20)
                if(compolated==0.8){
                    setSholdShow(true)
                }
                refIdLeft.current.setNativeProps({
                    style:{
                        display:'none'
                    }
                })
                refIdRight.current.setNativeProps({
                    style:{
                        display:'none'
                    }
                })
            }
        })
    },[answer,idLeft,idRight])

    return(
        
        <DraxProvider>
            <View style={{flexDirection:'row',backgroundColor:'#e7f0ff',justifyContent:'center',alignItems:'center',padding:30}}>
                <View style={{width:'75%'}}>
                    <ProgressBar style={{width:'100%',height:20,borderRadius:10,backgroundColor:'white',marginTop:30}} progress={compolated} color={Colors.blue900} />
                    <Text  style={{color:'blue',fontSize:10,marginLeft:10,marginTop:10}}>{`%${progress} complated`}</Text>
                </View>
                <View style={{width:20,height:20}}>

                </View>
                <View style={{width:'25%'}}>
                    <TouchableOpacity 
                    style ={{width:75,height:75,backgroundColor:'#0165fe',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:30}}>x</Text>
                </TouchableOpacity>  
                </View>
            </View>
            
            <View style={styles.container}>
                {
                    //Show components by sholdShow state
                    sholdShow ? (
                        <>
                        <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                            <Image style={{width:'50%', height:'50%', borderRadius:50}} source={image}>

                            </Image>
                        </View>
                        </>
                    ):(<>
                                   {data.map(r=> 
               <View  key={`${r.chosen2}keyview`} style={styles.row}>
                   <View style={{width:'40%'}}>
                    <View style={styles.box} ref={setRef(r.chosen1)}>
                        <DraxView
                                style={styles.draggable}
                                onDragStart={(event) => {
                                    console.log(event);
                                }}
                                payload={r.chosen1}
                                key={r.chosen1}

                            >
                                <Text  key={`${r.chosen1}key`}>{r.chosen1}</Text>
                            </DraxView>
                    </View>
                   </View>
                   <View style={{width:'40%'}}>
                   <View style={styles.box} ref={setRef(r.chosen2)}>
                   <DraxView
                        style={styles.receiver}
                        key={r.chosen2}
                        id={r.chosen2}
                        onReceiveDragDrop={({ dragged: { payload } }) => {
                            console.log(`${payload} ${r.chosen2}`);
                            setIdLeft(payload)
                            setIdRight(r.chosen2)
                            setAnswer(`${payload} ${r.chosen2}`)
                        }}
                    >
                        <Text key={`${r.chosen2}key`}>{r.chosen2}</Text>
                    </DraxView>
                   </View>
                   </View>
                </View>)
                }
                    </>)
                }

            </View>
            <View style={{width:'100%', alignItems:'center',backgroundColor:'#e7f0ff',paddingBottom:'20%'}}>
                    <Button onPress={()=>{navigation.navigate('SampleCourse2')}} disabled={!sholdShow} title={'Continue'} />
            </View>
        </DraxProvider>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor:'#e7f0ff',

    },
    box:{
        width:'100%'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    draggable: {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        
    },
    receiver: {
        width: '100%',
        height: '100%',
        alignItems:'center',
        borderRadius:10,
        justifyContent:'center',
        backgroundColor:'white',
        borderColor:'blue',
        borderWidth:1,
        backgroundColor:'#e7f0ff'
    },
    row:{
        marginBottom:50,
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    Continue:{
        height: 60,
        borderRadius:10,
        backgroundColor:'#7e52be',
        marginBottom:100,
        width:'50%',
      },
      ContinueText:{
        textAlign: 'center',
        width: 'auto',
        marginTop:20,
        color:'white',
        margin:'auto'
      }
});
  