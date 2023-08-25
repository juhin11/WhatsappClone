import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useState} from 'react';

import {db} from '../firebase.config';
import {query, collection, where, onSnapshot,setDoc,doc,serverTimestamp, getDoc} from 'firebase/firestore';

import Context from '../context/Context'
import { async } from '@firebase/util';

const AddChat = ({navigation}) => {


  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState([]);

  const [senderEmail,setSenderEmail] = useState('')

  const [loggedInUserData,] = useContext(Context)
  
  const searchUser = async ()=>{    
    const colRef = collection(db, 'users');
    const q = query(colRef, where('email', '==', email));
    await onSnapshot(q, snapshot => {
        let users = [];
            snapshot.docs.forEach(doc => {
            users.push({...doc.data(), id: doc.id});
          });
          setUserData(users);
        },
        (err)=>{
          alert('No user Found');
          setUserData([{name:'no user found',avtarURL:'https://raw.githubusercontent.com/3stbn/wp-clone/main/assets/user-icon.png'}])
          console.log(err)
        })
        console.log(userData)
    }

    const handelMessage = async()=>{
      
      // Adding to Chatted User Collection
      const senderReference = collection(db,`chats/${loggedInUserData.id}/chattedUsers`)
      setDoc(doc(senderReference, userData[0].email ), {
        createdAt: serverTimestamp(),             
      })

      // Adding to Chatted User Collection
      const reciverReference = collection(db,`chats/${userData[0].id}/chattedUsers`)
      setDoc(doc(reciverReference, loggedInUserData.email ), {
      createdAt: serverTimestamp(),             
      }).then(()=>{
        // console.log(userData[0])
        navigation.navigate('Chat',{userID : userData[0].id,userEmail : userData[0].email,userName : userData[0].name})
      })    
      
    }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Chat</Text>
      </View>

      <View style={styles.conatiner}>
        <Text style={{fontSize: 16}}>Please provide the email</Text>
        <TextInput
          placeholder="Enter the email"
          placeholderTextColor={'#128c7ed9'}
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={{marginTop: 'auto', marginBottom: 32, width: '100%'}}>
          <Button title="Continue" disabled={!email} color="#128c7e" onPress={searchUser} />
        </View>
      </View>

      {userData.length==0 ? 
        <View>
          <Text style={{textAlign:'center',fontSize:24,color:'#ccc'}}>No user Found</Text>
        </View>
       : 
        <View style={{width: '90%', marginHorizontal: '5%'}}>
          <Text style={{fontSize: 20, color: '#128c7ed9', marginVertical: 16}}>
            Available User
          </Text>
          <View
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              padding: 16,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 12,
              }}>
              <Image
                source={{
                  uri:userData.length==0?'https://raw.githubusercontent.com/3stbn/wp-clone/main/assets/user-icon.png':userData[0].avtarURL ,
                }}
                style={styles.userAvtar}
              />
              <Text style={{fontSize: 16, marginLeft: 12}}>{userData.length==0?'username':userData[0].name}</Text>
            </View>
            <Button title="Message" color="#128c7e" onPress={handelMessage} disabled={userData.length==0} />
          </View>
        </View>
       }  
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#075e54',
  },
  headerText: {
    fontSize: 24,
    color: '#ece5dd',
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
  conatiner: {
    padding: 16,
  },
  userAvtar: {
    width: 50,
    height: 50,
    aspectRatio: 1,
    borderRadius: 50,
  },
});
