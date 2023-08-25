import {StyleSheet, Text, View} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons/';
import {faMessage} from '@fortawesome/free-solid-svg-icons/';

import AllChats from './AllChats';
import Camera from './Camera';
import {TouchableOpacity} from 'react-native-gesture-handler';


const Chats = ({navigation,route}) => {

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Whatsapp</Text>
      </View>

      <View style={styles.floatBtn}>
        <TouchableOpacity onPress={()=>navigation.navigate('AddChat')}>
          <FontAwesomeIcon
            style={{color: '#ece5dd'}}
            size={22}
            icon={faMessage}
          />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        initialRouteName="AllChats"
        screenOptions={{
          tabBarStyle: {backgroundColor: '#075e54'},
          tabBarIndicatorStyle: {backgroundColor: '#ece5dd', height: 4},
        }}>
        <Tab.Screen
          name="Camera"
          component={Camera}
          options={{
            tabBarActiveTintColor: '#075e54',
            tabBarInactiveTintColor: 'gray',
            tabBarAllowFontScaling: true,
            tabBarLabelStyle: {fontSize: 16},
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <FontAwesomeIcon
                style={{color: '#ece5dd'}}
                size={20}
                icon={faCamera}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AllChats"
          component={AllChats}
          options={{
            tabBarLabel: 'Chats',
            tabBarAllowFontScaling: true,
            tabBarLabelStyle: {
              color: '#ece5dd',
              fontSize: 16,
              fontWeight: '500',
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default Chats;

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
  floatBtn: {
    backgroundColor: '#075e54',
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    bottom: 40,
    right: 20,
  },
});
