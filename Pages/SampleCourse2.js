import React, { useState,useEffect} from 'react';
import { View,StyleSheet,Text,TouchableOpacity,TextInput,Button,Keyboard,TouchableHighlight} from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
export default function SampleCourse2(){
    const [colorOne,setColorOne] = useState(false)
    const [colorTwo,setColorTwo] = useState(true)
    const [answer, setAnswer] = useState('');
    const [data, setData] = useState({
        answerone:'',
        answertwo:'',
    });
    const [answerOne, setAnswerOne] = useState('');
    const [answerTwo, setAnswerTwo] = useState('');
    const [progres, setProgress] = useState(0)
    const [sholdShow, setSholdShow] = useState(true)
    
    const [exampleCheck, setExampleCheck]= useState(true)

    useEffect(()=>{
        if(answer.toLocaleLowerCase().trim()==="haven’t packed" || answer.toLocaleLowerCase().trim()=="havent packed"){
            setProgress(0.2)
            setSholdShow(false)
            Keyboard.dismiss()
        }
        else{
            setProgress(0)
        }
    },[answer])

    useEffect(()=>{
        if(data.answerone.toLocaleLowerCase().trim()==="yet" && data.answertwo.toLocaleLowerCase().trim()==="ago"){
            setProgress(progres+0.2)
            setSholdShow(!sholdShow)
        }
        else{
            setProgress(progres)
        }
        console.log(data)
    },[data])
    
    useEffect(()=>{
        setData({
            answerone:answerOne,
            answertwo:answerTwo
        })
    },[answerOne,answerTwo])

    function clickedAnswer(event) {
        if(event._dispatchInstances.memoizedProps.children==="yet" || event._dispatchInstances.memoizedProps.children==="before"){
            setAnswerOne(event._dispatchInstances.memoizedProps.children)
            if(colorOne){
                setColorOne(!colorOne)
            }else{
                setColorOne(!colorOne)
            }
        }
        else{
            setAnswerTwo(event._dispatchInstances.memoizedProps.children)
            if(colorTwo){
                setColorTwo(!colorTwo)
            }else{
                setColorTwo(!colorTwo)
            }
        }
        console.log(event._dispatchInstances.memoizedProps.children)
    }
    
    const exampleOne =(
      <View style={styles.container}>
                            <View style={{flexDirection:'row',backgroundColor:'#e7f0ff',justifyContent:'center',alignItems:'center',padding:30}}>
                                <View style={{width:'75%'}}>
                                    <ProgressBar style={{width:'100%',height:20,borderRadius:10,backgroundColor:'white',marginTop:20}} progress={progres} color={Colors.blue900} />
                                    <Text style={{color:'blue',fontSize:10,marginLeft:10,marginTop:10}}>{progres*100}% complate</Text>
                                </View>
                                <View style={{width:30,height:30}}>

                                </View>
                                <View style={{width:'25%'}}>
                                    <TouchableOpacity 
                                    style ={{width:75,height:75,backgroundColor:'#0165fe',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'white',fontSize:30}}>x</Text>
                                </TouchableOpacity>  
                                </View>
                            </View>  
                            <View style={{alignItems:'center'}}>
                                <Text style={{width:'75%'}}>Complete with the Present Perfect Simple of the verbs in brackets</Text>  
                            </View>
                            <View style={{flexDirection:'row',marginTop:50}}>

                                <View style={{alignItems:'center',width:'20%'}}>
                                    <Text style={{fontSize:30,color:'blue'}}>A:</Text>
                                </View>

                                <View  style={{width:'80%'}}>
                                    <Text style={{fontSize:30}}>So, are you ready for your holiday ?</Text>
                                </View>

                            </View>
                            <View style={{flexDirection:'row',marginTop:50}}>

                                <View style={{alignItems:'center',width:'20%'}}>
                                    <Text style={{fontSize:30,color:'blue'}}>B:</Text>
                                </View>

                                <View  style={{width:'80%',flexDirection:'colum'}}>
                                    <View style={{width:'80%',flexDirection:'row'}}>
                                        <Text style={{fontSize:30}}>Not really. I </Text>
                                        <TextInput autoCapitalize='none' placeholder="anything" onChangeText={(val)=>{setAnswer(val)}} style={{width:'50%',borderBottomWidth:1,fontSize:20,color:'blue'}}></TextInput>
                                    </View>
                                    <View style={{width:'100%'}}>
                                        <Text style={{fontSize:30}}>(not pack) my suitcase yet.</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={{width:'100%', alignItems:'center',backgroundColor:'#e7f0ff',paddingBottom:'0%',marginTop:'50%'}}>
                                    <Button onPress={()=>setExampleCheck(!exampleCheck)} disabled={sholdShow} title={'Continue'} />
                            </View>
                        </View>
    );


    const exampleTwo = (    
    <View style={styles.container}>
                        <View style={{flexDirection:'row',backgroundColor:'#e7f0ff',justifyContent:'center',alignItems:'center',padding:30}}>
                            <View style={{width:'75%'}}>
                                <ProgressBar style={{width:'100%',height:20,borderRadius:10,backgroundColor:'white',marginTop:20}} progress={progres} color={Colors.blue900} />
                            <Text style={{color:'blue',fontSize:10,marginLeft:10,marginTop:10}}>{progres*100}% complate</Text>
                            </View>
                            <View style={{width:30,height:30}}>

                            </View>
                            <View style={{width:'25%'}}>
                                    <TouchableHighlight 
                                    onPress={(event)=>{clicked(event)}}
                                    style ={{width:75,height:75,backgroundColor:'#0165fe',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'white',fontSize:30}}>x</Text>
                            </TouchableHighlight>  
                            </View>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={{width:'75%'}}>Chose the correct option</Text>  
                            </View>
                            <View style={{flexDirection:'row',marginTop:50}}>
                                <View style={{alignItems:'center',width:'8%'}}>
                                </View>
                                <View  style={{width:'92%'}}>
                                        <Text style={{fontSize:40}}>
                                            Jake hasn't finished his homework
                                            <Text accessibilityValue={true} onPress={(event)=>clickedAnswer(event)} style={colorOne?{fontSize:30,backgroundColor:"blue"}:{fontSize:30,backgroundColor:"white"}}>yet</Text> /
                                            <Text onPress={(event)=>clickedAnswer(event)} style={!colorOne?{fontSize:30,backgroundColor:"blue"}:{fontSize:30,backgroundColor:"white"}}>before</Text> 
                                            He started it half an hour 
                                            <Text onPress={(event)=>clickedAnswer(event)}  style={colorTwo?{fontSize:30,backgroundColor:"blue"}:{fontSize:30,backgroundColor:"white"}}>so far</Text> /
                                            <Text onPress={(event)=>clickedAnswer(event)}  style={!colorTwo?{fontSize:30,backgroundColor:"blue"}:{fontSize:30,backgroundColor:"white"}}>ago</Text>
                                    </Text>
                                </View>
                        </View>
            <View style={{width:'100%', alignItems:'center',backgroundColor:'#e7f0ff',paddingBottom:'0%',marginTop:'50%'}}>
                        <Button onPress={()=>setExampleCheck(!exampleCheck)} disabled={!sholdShow} title={'Continue'} />
            </View>
    </View>
    
    )

    return(
        <>
            {exampleCheck ? (<>{exampleOne}</>):(<>{exampleTwo}</>)}

        </>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor:'#e7f0ff',
    }
});