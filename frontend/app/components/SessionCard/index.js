import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../configs/variables";
import { Badge } from "react-native-elements";
import { SimpleLineIcons } from "@expo/vector-icons";
import AppButton from "../AppButton";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import useAuth from "../../auth/useAuth";
import { Rating } from "react-native-ratings";
import servicesApi from "../../apis/services";
import { Entypo } from "@expo/vector-icons";
import sessionApi from '../../apis/sessions'
export default function SessionCard(props) {
  const starttime = moment(props.start_time).format("LLL");
  const focus = useIsFocused();
  const { user } = useAuth();
  console.log("props ", props.mentor_id,user._id);

  let [chatUnread, setChatRead] = useState(0);
  useEffect(() => {
    if(!focus)return
    let chatread = 0;
    // console.log("user ",user)
    props.chats.map((ch) => {
      // console.log("effect ch ",ch)
      if (
        ch.user._id !=
        (user.role == "student" ? props.user_id._id : props.mentor_id)
      ) {
        chatread += ch.read ? 0 : 1;
      }
    });
    setChatRead(chatread);
  }, [focus]);
  return (
    <View style={styles.container}>
      <View style={styles.sessionheader}>
        <View style={styles.sessionicon}>
          <FontAwesome name="book" size={30} color="black" />
        </View>
        <View style={styles.sessiontitle}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {props?.service_id?.title}
          </Text>
          <Text
            style={{
              opacity: 0.7,
              fontWeight: "600",
            }}
          >
            {/* {props?.service_id?.mentor_name} */}
            {user.role == "student" ? (
              <Text>Mentor : {props?.service_id?.mentor_name}</Text>
            ) : (
              <Text>student : {props?.user_id?.name}</Text>
            )}
          </Text>
        </View>
        {/* //+++++++++++ratings and reviews++++++++++ */}
        <RatingsModal
          serviceId={props.service_id._id}
          mentorId={props.service_id.mentor_id}
          sessionId={props._id}
          isReviewed={props.isReviewed}
        />

        {/* //+++++++++++ratings and reviews++++++++++ */}
      </View>

      <View style={styles.pricingsection}>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text style={styles.pricing}>
            {props?.service_id?.fee == "0" ? "FREE" : props?.service_id?.fee}
          </Text>
        </View>
      </View>

      <View style={styles.timesection}>
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <SimpleLineIcons name="calendar" size={18} color="black" />
        </View>
        <View>
          <Text
            style={{
              fontWeight: "700",
            }}
          >
            {starttime}
          </Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            title="Chat"
            onPress={props?.handleChat}
            buttonStyles={{
              paddingVertical: 5,
              paddingHorizontal: 50,
              borderRadius: 5,
              marginVertical: 10,
            }}
          />
          {chatUnread > 0 && (
            <View
              style={{
                position: "absolute",
                backgroundColor: "red",
                width: 25,
                height: 25,
                borderRadius: 20,
                right: 0,
                top: 0,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {chatUnread}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.button}>
          <AppButton
            title="Meet"
            onPress={() => console.log("click")}
            buttonStyles={{
              paddingVertical: 5,
              paddingHorizontal: 50,
              borderRadius: 5,
              marginVertical: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
}
function RatingsModal({ serviceId, mentorId,sessionId,isReviewed }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setfeedback] = useState("");
  const [RatingCnt, setRatingCnt] = useState(2.5);
  const { user } = useAuth();
  const handleSubmit = () => {
    let feedbackobj = {
      feedback: feedback,
      user: user.name,
      rating: RatingCnt,
    };
    servicesApi
      .editService({
        _id: serviceId,
        is_deleted: false,
        feedback: feedbackobj,
        mentorId,
      })
      .then(async(res) => {
        console.log(res.data);

        await sessionApi.updateSessions({isReviewed:true,_id:sessionId});
        // setServices(res?.data?.data);
        // setLoaded(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setModalVisible(!modalVisible);
  };

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
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ right: -4, top: -4, position: "absolute" }}
              onPress={() => setModalVisible(false)}
            >
              <Entypo name="circle-with-cross" size={30} color="black" />
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                width: "100%",
                height: "100%",
                marginTop: 10,
              }}
            >
              <View>
                <View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:"flex-start"}}>
                  <Text>Rating {RatingCnt}/5</Text>
                  <Rating
                    type="star"
                    fractions={1}
                    ratingCount={5}
                    imageSize={20}
                    readonly={false}
                    minValue={0.5}
                    onStartRating={(val) => {
                      console.log("val ", val);
                      setRatingCnt(val);
                    }}
                    onSwipeRating={(rating) => {
                      console.log("rating ", rating);
                      setRatingCnt(rating);
                    }}
                  />
                </View>
                <View style={{width: "100%", height: "100%" }}>
                  <Text style={{marginVertical:10,fontWeight:'bold',fontSize:15}}>Your FeedBack</Text>
                  <TextInput
                    value={feedback}
                    onChangeText={(val) => {
                      setfeedback(val);
                    }}
                    style={{ borderWidth: 1, width: "100%", height: "45%" }}
                  />
                </View>
              </View>

              <View>
                <TouchableOpacity
                  style={{
                    padding: 8,
                    backgroundColor: "#0094ff",
                    borderRadius: 10,
                    marginBottom:20
                  }}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.textStyle}>submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
     {mentorId!=user._id && <TouchableOpacity
        style={{
          padding: 8,
          backgroundColor: (isReviewed?"grey":"#0094ff"),
          borderRadius: 10,
        }}
        onPress={() => setModalVisible(true)}
        disabled={isReviewed}
      >
        <Text style={styles.textStyle}>Feedback</Text>
      </TouchableOpacity>
}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    height: "35%",
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
    backgroundColor: "#0094ff",
    borderRadius: 10,
    bottom: 14,
    width: "70%",
    marginTop: "10%",
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    paddingVertical: 10,
    margin: 10,
    borderBottomColor: colors.grey,
    borderBottomWidth: 2,
    justifyContent: "space-around",
  },
  sessionheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 10,
    alignItems: "center",
  },
  sessionicon: {
    padding: 10,
    backgroundColor: colors.lightskyblue,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sessiontitle: {
    marginLeft: 10,
  },
  pricingsection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  pricing: {
    color: "green",
    fontWeight: "bold",
    fontSize: 15,
  },
  timesection: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  buttons: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  button: {},
});
