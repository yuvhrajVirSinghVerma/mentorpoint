import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { Link, NavigationContainer } from "@react-navigation/native";
import * as Linking from 'expo-linking';
const Stack = createStackNavigator();
const prefix = Linking.createURL('/');


const AuthNavigator = () => {
  const url = Linking.useURL();
  useEffect(()=>{
    console.log("url ",url)
    if(url)handleDeepLink({url})

  },[url])
  const linking = {
    prefixes: ["mentorpoint://",prefix,],
    config: {
          screens: {
            Login: 'Login',
            Signup:'Signup'
          },
        },
  };
  useEffect(()=>{
    console.log("lggedin")
    Linking.addEventListener('url', handleDeepLink);
  
   
  },[])
  // Define a function to handle the incoming deep links
  const handleDeepLink = async(event) => {
    // Extract the URL from the event
    const { url } = event;
    const initialUrl = await Linking.getInitialURL()
    let dt=Linking.parse(url)
    console.log("dttttts ",dt,initialUrl)
    // Handle the URL as needed, e.g., navigate to a specific screen
    // You might want to parse the URL and determine which screen to navigate to
    // For example, using a library like 'react-navigation' to navigate to the appropriate screen
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
