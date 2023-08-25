import 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import React from 'react';
import First from './Screens/First';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Chats from './Screens/Chats';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from './Screens/Chat';
import AddChat from './Screens/AddChat';
import ContextWrapper from './context/ContextWrapper';


const Main = ()=>{
  return(

    <ContextWrapper>
      <App/>
    </ContextWrapper>
    
  )
}

const App = () => {

  const Stack = createStackNavigator();

  return (

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="First">
          <Stack.Screen name="First" component={First} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="AddChat" component={AddChat} />
        </Stack.Navigator>
      </NavigationContainer>

  );
};

export default Main;
