import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {collection, query, onSnapshot, where, getDocs,doc} from 'firebase/firestore';
import {db} from '../firebase.config';
import Context from '../context/Context'

const ChatListItem = props => {

  const [name, setName] = useState('');
  const [lastMsg, setLastMsg] = useState('');
  const [time, setTime] = useState('');
  const [userData, setUserData] = useState({name : 'userName', email:"user@email", id:"userID"});
  
  const [loggedInUserData,setLoggedInUserData] = useContext(Context)
  

  useEffect(()=>{
  
      const collectionRef = collection(db, `/users`);
      const q = query(collectionRef, where('email', '==', name));
      
      onSnapshot(q, (snapshot) => {
        let user = [];
        snapshot.docs.forEach(doc => {
          user.push({...doc.data(), id: doc.id});
        });
        // console.log(user)
         setUserData(user[0]);
      });

  
  },[userData])
  
  
  useEffect(() => {
    setName(props.name);
    setLastMsg(props.lastMsg);
    setTime(props.lastMsgTym);
  }, [props]);


  const deviceWidth = Math.round(Dimensions.get('screen').width);


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>{
        setLoggedInUserData({
          id: loggedInUserData.id,
          email:loggedInUserData.email,
          reciverid:userData.id,
          reciverEmail:userData.email
        })
        props.navigation.navigate('Chat', {
          userID: userData.id,
          userEmail: userData.email,
          userName: userData.name,
        })
      }
      }>
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/3stbn/wp-clone/main/assets/user-icon.png',
        }}
        style={styles.userAvtar}
      />
      <View style={styles.userInfo}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>
          {name ? name : 'Username'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: deviceWidth - 92,
          }}>
          <Text style={{}}>{lastMsg ? lastMsg : 'Last Message'}</Text>
          <Text style={{}}>{time ? time : 'Time'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvtar: {
    width: 50,
    height: 50,
    aspectRatio: 1,
    borderRadius: 50,
  },
  userInfo: {
    marginLeft: 16,
  },
});
