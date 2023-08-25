import { Image, Settings, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const First = ({navigation}) => {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('Login')
    },1000)
  },[])
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        resizeMode='cover'
        style={styles.bannerImg}
      />
      <Text style={styles.text}>Whatsapp</Text>
    </View>
  )
}

export default First

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  bannerImg:{
    width:100,
    height:100,
    aspectRatio:1,
  },
  text:{
    fontSize:24,
    color:'#128c7e',
    marginTop:32,
  }
})