import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const Msg = props => {
  const [user, setUser] = useState('sender');
  useEffect(()=>{
    setUser(props.user)
  },[props])

  return (
    <View
      style={{
        backgroundColor: 'white',
        maxWidth: '70%',
        minWidth:'15%',
        margin: 16,
        padding: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        borderBottomRightRadius:user=='sender'?12:0,
        borderBottomLeftRadius:user!='sender'?12:0,
        alignSelf:user=='sender'?'flex-start':'flex-end',
        alignItems:'baseline',
        flexDirection:'row',
      }}>
      <Text style={{fontSize:16}}>{props.value} | </Text>
      <Text style={{fontSize:10,paddingLeft:4}}>{props.time}</Text>
    </View>
  );
};

export default Msg;

