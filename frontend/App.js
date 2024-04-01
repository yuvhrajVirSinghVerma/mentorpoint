import { StyleSheet, Text, View, Platform } from "react-native";
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import Drawer from "./app/navigation/Drawer";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { useState ,useEffect,useRef} from "react";
import authStorage from "./app/auth/storage";
import { StatusBar } from "expo-status-bar";
import AuthContext from "./app/auth/context";
import { Provider } from 'react-redux';
import store from './app/state/Store'
import { RootSiblingParent } from 'react-native-root-siblings';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification:async()=>({
    shouldShowAlert:true,
    shouldPlaySound:true,
    shouldSetBadge:true
  })
})
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    // if (finalStatus !== 'granted') {
    //   console.log("Constants.expoConfig.extra.eas.projectId ",Constants.expoConfig.extra.eas.projectId)
    //   alert('Failed to get push token for push notification!');
    //   return;
    // }
    token = await Notifications.getDevicePushTokenAsync();
    // let res=await Notifications.getExpoPushTokenAsync()
    // console.log(token," =>=> ",res);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}
export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setReady] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(()=>{
    console.log("onstants.manifest.id ",Constants.manifest.id)
    registerForPushNotificationsAsync().then(token => console.log("token : ",token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // setNotification(notification);
      console.log("notiii ",notification)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("ressnotiii ",response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  })
  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) Promise.all([]);
    setUser(user);
    return Promise.all([]);
  };
  if (isReady === false) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setReady(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <RootSiblingParent>
    <Provider store={store}>
      {user ? (
        <AuthContext.Provider value={{ user, setUser }}>
          <Drawer />
        </AuthContext.Provider>
      ) : (
        <AuthContext.Provider value={{ user, setUser }}>
          <AuthNavigator />
        </AuthContext.Provider>
      )}
      <StatusBar style="dark" />
    </Provider>
    </RootSiblingParent>
  );
}
