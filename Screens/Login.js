import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'

import { collection,onSnapshot,query,where, } from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import {auth,db} from '../firebase.config'
import Context from '../context/Context'

const Login = ({navigation}) => {


    const [loggedInUserData,setLoggedInUserData] = useContext(Context);
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')


    const [loggedIn,setLoggedIn] = useState(false);
    // const [userData,setUserData] = useState([]);

    const searchUser = async ()=>{    
      const colRef = collection(db, 'users');
      const q = query(colRef, where('email', '==', email));
      await onSnapshot(q, async(snapshot)=> {
          let users = [];
              snapshot.docs.forEach(doc => {
              users.push({...doc.data(), id: doc.id});
            });
            setLoggedInUserData({id:users[0].id, email : users[0].email})
            navigation.navigate('Chats') 
          })
      }

    const handelLogin= ()=>{
      signInWithEmailAndPassword(auth,email,password)
      .then(async() => {
        setLoggedIn(true)
        // alert('Login Success !')
        searchUser() 
      })
      .catch((err)=>{
        alert(err)
        setEmail('');
        setPassword('');
      })  
  }


    const handelRegister=()=>{
      createUserWithEmailAndPassword(auth,email,password)
      .then(()=>{
        alert('Registration Success!');
        navigation.navigate('Profile',{email:email,password:password})
      })
      .catch((err)=>{
        alert(err);
        setEmail('');
        setPassword('');
      })
    }


    // const signin = async()=>{
    //   try {
    //     await GoogleSignin.hasPlayServices();
    //     const {accessToken, idToken} = await GoogleSignin.signIn();
    //     setLoggedIn(true);
    //   } catch (error) {
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //       // user cancelled the login flow
    //       alert('Cancel');
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //       alert('Signin in progress');
    //       // operation (f.e. sign in) is in progress already
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //       alert('PLAY_SERVICES_NOT_AVAILABLE');
    //       // play services not available or outdated
    //     } else {
    //       // some other error happened
    //     }
    //   }
    // }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Whatsapp</Text>
      {/* <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
        /> */}
        <Image
            source={require('../assets/welcome.png')}
            resizeMode='contain'
            style={styles.bannerImg}
        />
        <View style={styles.form}>
            <TextInput placeholder='Email' placeholderTextColor={'#128c7ed9'} style={styles.input} value={email} onChangeText={text=>setEmail(text)} />
            <TextInput placeholder='Password' placeholderTextColor={'#128c7ed9'} style={styles.input} value={password} onChangeText={text=>setPassword(text)} secureTextEntry={true} />

            <View style={{marginBottom:16}}>
              <Button title='Login' disabled={!password || !email} color='#128c7e' onPress={handelLogin} />
            </View>

            <View>
              <Button title='Register' disabled={!password || !email} color='#128c7e' onPress={handelRegister} />
            </View>

        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
      },
      bannerImg:{
        width:250,
        height:250,
        aspectRatio:1,
      },
      text:{
        fontSize:28,
        color:'#128c7e',
        marginBottom:32,
        fontWeight:"500"
      },
      input:{
        minWidth:'80%',
        borderBottomColor:'#075e54',
        borderBottomWidth:2,
        fontSize:18,
        marginBottom:24,
        color:'#075e54'
    },
    form:{
        marginTop:32,
    },
})