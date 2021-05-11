import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Components
import LoginPage from '../Pages/LoginPage'
import Login from '../Pages/Login'
import SignupPage from '../Pages/SignupPage'
import SampleCourse from '../Pages/SampleCourse';
import SampleCourse2 from '../Pages/SampleCourse2';
export default function CarnaRoutes(){
    const Stack = createStackNavigator();
    return (
          <NavigationContainer >
            {/*Route determination by components*/}
            <Stack.Navigator>
              <Stack.Screen name="Login or Register"  component={Login} />
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="Signup" component={SignupPage} />
              <Stack.Screen options={{animationEnabled:false,headerLeft:()=>null}} name="SampleCourse" component={SampleCourse} />
              <Stack.Screen options={{headerBackTitleVisible:false,headerTitle:'Sample Course 2'}} name="SampleCourse2" component={SampleCourse2} />
            </Stack.Navigator>
          </NavigationContainer>
      );
}