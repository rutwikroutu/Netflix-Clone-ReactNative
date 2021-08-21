import React, { useEffect, useState } from 'react'

import Home from './screen/Home'
import Login from './screen/Login'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Register from './screen/Register';
import Splash from './screen/Splash';
import { SafeAreaViewProvider } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
import ViewMovie from './screen/ViewMovie';
import MyList from './screen/MyList';
import { db } from './firebase';
import firebase from 'firebase';
import SearchScreen from './screen/SearchScreen';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  function BottomStackScreen() {
    return (
      <Tab.Navigator tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#5B5B5B",
        style: {
          backgroundColor: '#141414',
          borderTopWidth: 0,
          elevation: 0,   // for Android
          shadowOffset: {
            width: 0, height: 0 // for iOS
          },
          height: 60,
          paddingBottom: 10
        },
      }}

        screenOptions={{
          tabBarItemStyle: { flexDirection: 'row' }
        }}
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} style={{ marginBottom: -10 }} />
        }} />
        <Tab.Screen name="Coming Soon" component={Home} options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="video-library" size={24} color={color} style={{ marginBottom: -10 }} />
        }} />
        <Tab.Screen name="Downloads" component={Home} options={{
          tabBarIcon: ({ color }) => <AntDesign name="download" size={24} color={color} style={{ marginBottom: -10 }} />
        }} />
      </Tab.Navigator>
    );
  }

  const screenOptions = {
    headerShown: false,
    ...TransitionPresets.SlideFromRightIOS,
  }

  return (
    <NavigationContainer>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, }} keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}>
        <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
          <Stack.Screen name="Login" component={Login} options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />
          <Stack.Screen name="Register" component={Register} options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />
          <Stack.Screen name="BottomStack" component={BottomStackScreen} />
          <Stack.Screen name="ViewMovie" component={ViewMovie} />
          <Stack.Screen name="MyList" component={MyList} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  )
}

export default App
