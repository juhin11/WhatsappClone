import {Image, StyleSheet, Text, TextInput, View, Button} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

import {db} from '../firebase.config';
import {
  collection,
  addDoc,
  where,
  query,
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

import Context from '../context/Context'

const Profile = ({navigation, route}) => {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [name, setName] = useState('');

  const [loggedInUserData,setLoggedInUserData] = useContext(Context);

  useEffect(() => {
    const {email} = route.params;
    const {password} = route.params;
    setEmail(email);
    setPassword(password);
  }, []);

  function  AddUser(){
    //Firebase
    const colRef = collection(db, 'users');
    // Adding User
    addDoc(colRef, {
      name: name,
      email: userEmail,
      password: userPassword,
      avtarURL:
        'https://raw.githubusercontent.com/3stbn/wp-clone/main/assets/user-icon.png',
    })
    .then(() => {
        const q = query(colRef, where('email', '==', userEmail));
        onSnapshot(q, snapshot => {

          let users = [];

          snapshot.docs.forEach(doc => {
            users.push({...doc.data(), id: doc.id});
          });

          const chatRef = collection(db,'chats');
          setDoc(doc(chatRef, users[0].id ), {
            createdAt: serverTimestamp(),             
          })

          setLoggedInUserData({id:users[0].id,email:users[0].email})
            // .then(()=>{
            //   const msgRef = collection(db,`/chats/${users[0].id}/msgs`)
            //    addDoc(msgRef,{
            //      msg:'Hi success',
            //      senderID:users[0].id,
            //      reciverID:users[0].id,
            //      createdAt: serverTimestamp(),
            //    })
            // })
          });
        })
        navigation.navigate('Chats')
    }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile info</Text>

      <View style={styles.bannerImg}>
        <FontAwesomeIcon style={{color: '#aaa'}} size={40} icon={faUser} />
      </View>

      <View style={styles.form}>
        <Text>Please provide your name</Text>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor={'#128c7ed9'}
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      <View style={{marginTop: 'auto', marginBottom: 32, width: '80%'}}>
        <Button
          title="Continue"
          disabled={!name}
          color="#128c7e"
          onPress={AddUser}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImg: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  text: {
    fontSize: 28,
    color: '#128c7e',
    marginTop: 32,
    marginBottom: 32,
    fontWeight: '500',
  },
  input: {
    minWidth: '80%',
    borderBottomColor: '#075e54',
    borderBottomWidth: 2,
    fontSize: 18,
    marginBottom: 24,
    color: '#075e54',
  },
  form: {
    marginTop: 32,
  },
});
