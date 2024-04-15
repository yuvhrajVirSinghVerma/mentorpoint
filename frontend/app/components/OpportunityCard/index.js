import {
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { colors } from "../../configs/variables";
import AppButton from "../AppButton";
import { Entypo } from "@expo/vector-icons";
import mentorsApi from "../../apis/mentors.js";
import useAuth from "../../auth/useAuth.js";
import Toast from "react-native-root-toast";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";
import ScreeningQues from '../../screens/ScreeningQues.js'
import { useNavigation } from "@react-navigation/native";
export default function OpportunityCard(props) {
  const addedDate = props.date ? new Date(props.date).toLocaleDateString() : "";
  let { user, showDetails = true, showSave = true } = props;
  // console.log("user in oppurtun ", user.jobs,props);
  console.log("propppppsss ++++++++++++++++ ",props?.ScreeningQues)
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      // if (finalStatus !== 'granted') {
      //   console.log("Constants.expoConfig.extra.eas.projectId ",Constants.expoConfig.extra.eas.projectId)
      //   alert('Failed to get push token for push notification!');
      //   return;
      // }
      token = await Notifications.getDevicePushTokenAsync();
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token.data;
  }
  const notificationListener = useRef();
  const responseListener = useRef();
  // useEffect(()=>{
  //   registerForPushNotificationsAsync().then(token => console.log("token : ",token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     // setNotification(notification);
  //     console.log("notiii ",notification)
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log("ressnotiii ",response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // },[])
  const save = async (isSaved) => {
    // console.log("user ",user._id)
    let res = await mentorsApi.updateMentor({
      jobs: props._id,
      _id: user._id,
      isSaved: isSaved,
      updatejob:true
    });
    console.log("res ", res.ok);
    if (res.ok) {
      props.oncardClick(props.index);
      let text = !isSaved ? "Saved Successfully" : "Job unsaved";
      Toast.show(text, {
        duration: Toast.durations.LONG,
      });
    } else {
      Toast.show("Error on saving this job", {
        duration: Toast.durations.LONG,
      });
    }
  };
  let [screeningQues,setScreeningQues]=useState(props?.ScreeningQues || [])
  const navigation = useNavigation();
 
  return (
    <View
      style={[
        { ...styles.container, ...props.containerStyle },
        styles.elevation,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.workicon}>
          <MaterialIcons name="work" size={24} color="black" />
        </View>

        <View style={styles.worktitle}>
          <Text style={styles.title}>{props.job_title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="building" size={15} color="black" />
            <View style={{ justifyContent: "center", marginHorizontal: 8 }}>
              <Text style={{ ...styles.subtitle }}>{props.company}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        {props?.mentor_id == user?._id && <Text>Edit</Text>}
        {showDetails && <Details props={props} />}
      </View>
      <View style={{ position: "absolute" }}>
        <Text
          style={{
            top: 70,
            marginLeft: 10,
            position: "absolute",
            fontWeight: "bold",
            fontSize: 15,
            ...props.typestyle,
          }}
        >
          {props.type}
        </Text>
        <Text
          style={{
            top: 90,
            marginLeft: 10,
            position: "absolute",
            fontSize: 14,
            fontWeight: "bold",
            ...props.typestyle,
          }}
        >
          Posted By :{" "}
          <Text style={{ fontWeight: "400" }}>{props.mentor_id.name}</Text>
        </Text>
      </View>
      <View>
        {showSave && (
          <TouchableOpacity
            onPress={() => {
              save(props.isSaved);
            }}
            style={{
              position: "absolute",
              fontWeight: "bold",
              fontSize: 16,
              padding: 5,
              // backgroundColor: "#2196f3",
              backgroundColor: props.isSaved ? "grey" : "#2196f3",
              borderRadius: 5,
              bottom: -20,
              width: 50,
            }}
          >
            {/* <Entypo name="save" size={24} color="black" /> */}
            {props.isSaved ? (
              <Text style={{ textAlign: "center", color: "white" }}>Saved</Text>
            ) : (
              <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={{ ...styles.timesection, ...props.timesection }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SimpleLineIcons name="calendar" size={18} color="black" />
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
              }}
            >
              {addedDate}
            </Text>
          </View>
        </View>

        <View style={{ width: 110, ...props.applybtnstyle }}>
        {props?.isApplied ?(
          <Text style={{color:'green',fontSize:17,marginTop:20,textAlign:'center',fontWeight:'bold'}}>Applied</Text>
        ):
        (
         <>
          <Button
          title={props?.ScreeningQues.length > 0?"Ease Apply":"Apply"}
          onPress={() => {
            console.log("props?.ScreeningQues ",props?.ScreeningQues)
            props?.ScreeningQues.length > 0 ?navigation.navigate("ScreeningQues", {
            ScreeningQues:screeningQues,
            email:props.mentor_id.email,
            id:props._id
          })
            :
            Linking.openURL(props.application_link)
          }
          }
        />
        {props?.ScreeningQues.length > 0 &&<View style={{position:'absolute',top:10,right:0}}>
        <Entypo name="arrow-right" size={14} color="white" /></View>}
        </>
       
        )
        }
           
        </View>
      </View>
     </View>
  );
}

const Details = ({ props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log("props details", props);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, ...props.modalViewStyle }}>
            <TouchableOpacity
              style={{ right: -4, top: -8, position: "absolute" }}
              onPress={() => setModalVisible(false)}
            >
              <Entypo name="circle-with-cross" size={30} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ width: "100%" }}>
              <View>
                <Text style={{ fontWeight: "bold" }}>Description</Text>
                <Text>{props.description}</Text>
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Location</Text>
                {props.location.map((l, index) => {
                  return <Text key={{ index }}>{l}</Text>;
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ ...styles.button, ...props.detailsstyle }}
        onPress={() => {
          console.log("btn ", modalVisible);
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  modalView: {
    height: "50%",
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 8,
    backgroundColor: "#2196f3",
    borderRadius: 5,
    bottom: 14,
    width: 110,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 10,
    shadowColor: "#171717",
    elevation: 2,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  workicon: {
    padding: 10,
    backgroundColor: colors.lightskyblue,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  worktitle: {
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 30,
    // width:100
  },
  subtitle: {
    opacity: 0.5,
    fontWeight: "bold",
  },
  timesection: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "flex-end",
  },
});
