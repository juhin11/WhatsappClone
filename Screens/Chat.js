import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons/';
import {ScrollView} from 'react-native-gesture-handler';
import Msg from '../Components/Msg';
import { collection,serverTimestamp ,getDoc , setDoc ,doc, onSnapshot, query, orderBy} from 'firebase/firestore';
import { db } from '../firebase.config';

import Context from '../context/Context'


const Chat = ({navigation , route }) => {

  const [msg, setMsg] = useState('');

  const [reciverEmail,setreciverEmail] = useState('');
  const [reciverId,setReciverId] = useState('')
  const [reciverName,setReciverName] = useState('')
  const [allMsg,setAllMsg] = useState([])


  const windowWidth = Dimensions.get('window').width;

  const [loggedInUserData,] = useContext(Context)
  const [senderEmail,setSenderEmail] = useState('')

  useEffect(()=>{
    const {userID,userName,userEmail} = route.params
    setReciverId(userID)
    setreciverEmail(userEmail)
    setReciverName(userName)
    setSenderEmail(loggedInUserData.email)
  },[])

  useEffect(()=>{       

    setTimeout(()=>{
      // Getting all msges Realtime
      const allMsgRef = collection(db,`/chats/${loggedInUserData.id}/chattedUsers/${loggedInUserData.reciverEmail}/msgs`)
      const q = query(allMsgRef, orderBy("createdAt", "asc"))
      onSnapshot(q,(snapshot)=>{
        let messages = [];
        snapshot.docs.forEach(doc =>{
          messages.push({...doc.data(),id: doc.id})
        })
        setAllMsg(messages);
      })
    },100)
  },[reciverEmail])
  

  const handelSend = async()=>{
    
    const msgSenderRef = collection(db,`/chats/${loggedInUserData.id}/chattedUsers/${reciverEmail}/msgs`)
    setDoc(doc(msgSenderRef), {
      msg: msg,
      createdAt: serverTimestamp(),
      senderID: loggedInUserData.id,
      reciverId : reciverId,             
    }).then(()=>{
      const msgReciverRef = collection(db,`/chats/${reciverId}/chattedUsers/${senderEmail}/msgs`)
      setDoc(doc(msgReciverRef), {
        msg: msg,
        createdAt: serverTimestamp(),
        senderID: loggedInUserData.id,
        reciverId : reciverId,             
      })
    }).then(setMsg(''))
    
  }
    
  return (
    <View style={{backgroundColor: '#dcf8c6', minHeight: '100%'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chats');
          }}>
          <FontAwesomeIcon
            style={{color: '#ece5dd'}}
            size={20}
            icon={faArrowLeft}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/3stbn/wp-clone/main/assets/user-icon.png',
          }}
          style={styles.userAvtar}
        />
        <Text style={{fontSize: 18, color: '#ece5dd', fontWeight: '600'}}>
          {reciverName}
        </Text>
      </View>
      <ImageBackground source={{uri:'https://raw.githubusercontent.com/3stbn/wp-clone/main/assets/chatbg.png'}} resizeMode='cover'>

        <ScrollView style={styles.msgConatainer}>

  
          {allMsg.map((e)=>{
            return(
              <Msg value={e.msg} user={loggedInUserData.id==e.senderID?'reciver':'sender'} time = "12:10 PM" key={e.id}/>
            )
          })}

        </ScrollView>
      </ImageBackground>

      <View style={styles.sendMsg}>
        <TextInput
          value={msg}
          onChangeText={text => setMsg(text)}
          style={{
            width: windowWidth - 60,
            marginHorizontal: 5,
            borderWidth: 2,
            borderColor: '#ddd',
            borderRadius: 40,
            fontSize: 18,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
          }}
          placeholder="Enter the message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handelSend}> 
          <FontAwesomeIcon
            style={{color: '#ece5dd'}}
            size={16}
            icon={faPaperPlane}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Chat;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#075e54',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: '10%',
  },
  userAvtar: {
    width: 40,
    height: 40,
    aspectRatio: 1,
    borderRadius: 20,
    marginHorizontal: 16,
  },
  msgConatainer: {
    height: '84%',
  },
  sendMsg: {
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#128c7e',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
})
