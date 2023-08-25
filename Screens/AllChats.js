import {ScrollView} from 'react-native'

import React, {useContext, useEffect, useState} from 'react'
import ChatListItem from '../Components/ChatListItem'

import Context from '../context/Context'

import {db} from '../firebase.config'
import {collection, onSnapshot, query, where} from 'firebase/firestore'

const AllChats = ({navigation}) => {
  const [userData, setUserData] = useState([])

  const [loggedInUserData] = useContext(Context)

  useEffect(() => {
    const collectionRef = collection(db, `/chats/${loggedInUserData.id}/chattedUsers`)

    onSnapshot(
      collectionRef,
      snapshot => {
        let users = []
        snapshot.docs.forEach(doc => {
          users.push({...doc.data(), id: doc.id})
        })
        setUserData(users)
      }
    )
  }, [])

  return (
    <ScrollView>
      {userData.map(e => {

            return (
              <ChatListItem
                navigation={navigation}
                name={e.id}
                lastMsg="Hiiiiii"
                lastMsgTym="12:00 AM"
                userData={userData}
                key={e.id}
              />
            )

      })}
    </ScrollView>
  );
};

export default AllChats;
