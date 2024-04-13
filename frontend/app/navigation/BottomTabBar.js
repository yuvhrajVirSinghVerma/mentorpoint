import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MentorsScreen from "../screens/MentorsScreen";
import SessionsScreen from "../screens/SessionsScreen";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import OppotunitiesScreen from "../screens/OppotunitiesScreen";
import HeaderItem from "../components/HeaderItem";
import BookingScreen from "../screens/BookingScreen";
import BookingStack from "./BookingStack";
const BottomTabs = createBottomTabNavigator();

export default function BottomTabBar() {
  

  return (
    <>
      <BottomTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "black",
          header: (props) => <HeaderItem {...props} />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarItemStyle: {
            margin: 2,
          },
        }}
      >
        <BottomTabs.Screen
          name="Feed"
          component={MentorsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={25} color={color} />
            ),
            title: "Home",
            headerTitle: "Home",
          }}
        />
        <BottomTabs.Screen
          name="Sessions"
          component={SessionsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="event" size={25} color={color} />
            ),
          }}
        />
        {/* <BottomTabs.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color={color}
              />
            ),
          }}
        /> */}
        <BottomTabs.Screen
          name="Opportunities"
          component={OppotunitiesScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="work-outline" size={25} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
