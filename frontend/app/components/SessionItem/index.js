import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../configs/variables";
import { Rating } from "react-native-ratings";
import { Entypo } from "@expo/vector-icons";
export default function SessionItem(props) {
  return (
    // <TouchableOpacity >
    <View
      style={{
        borderColor: colors.grey,
        borderRadius: 5,
        borderWidth: 2,
        margin: 15,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <View style={styles.sessioncontainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <Text style={styles.sessionheader}>{props.title}</Text>
          </View>

          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold", marginRight: 5, fontSize: 15 }}>
              Price
            </Text>
            <Text style={styles.pricing}>
              {"\u20A8"} {props.fee}
            </Text>
          </View>
        </View>
        {/* Reviews  */}
        <View style={{ top: 12 }}>
          <Text style={{ fontWeight: "bold", marginRight: 5, fontSize: 15 }}>
            Overall Rating
          </Text>
          {isNaN(props.rating) || props.rating <= 0 ? (
            <Text
              style={{
                textAlign: "center",
                color: "#ffcc00",
                fontWeight: "bold",
              }}
            >
              Not Rated
            </Text>
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "#ffcc00",
                fontWeight: "bold",
              }}
            >
              {props.rating}/5
            </Text>
          )}

          <ReviewModal props={props} />
        </View>
        {/* <View style={styles.moveicon}>
          <MaterialCommunityIcons name="chevron-right" size={30} />
        </View> */}
      </View>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          padding: 8,
          backgroundColor: "#0094ff",
          borderRadius: 10,
          bottom: 14,
          width: "70%",
          marginTop: "10%",
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>
          Show Details
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const ReviewModal = ({ props }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
              style={{ right: -4, top: -8, position: "absolute" }}
              onPress={() => setModalVisible(false)}
            >
              <Entypo name="circle-with-cross" size={30} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ width: "100%" }}>
              {props.feedback.map((ele) => {
                return (
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderWidth:1,
                      borderColor:"#959697",
                      marginBottom:10,
                      borderRadius:10,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 10,
                        paddingLeft:8,
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>{ele.user}</Text>
                      <Rating
                      type="star"
                      fractions={1}
                      ratingCount={5}
                      imageSize={15}
                      readonly={true}
                      startingValue={ele.rating}
                    />
                    </View>
                    <ScrollView>
                    <View style={{marginLeft:10}}>
                    <Text>{ele.feedback}</Text>
                    </View>
                    </ScrollView>
                   
                   
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => {
          if (props.feedback.length <= 0) return;
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Reviews({props.feedback.length})</Text>
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
    backgroundColor: "#00eeff",
    borderRadius: 10,
    bottom: 14,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  sessioncontainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    overflow: "hidden",
  },
  sessionheader: {
    fontSize: 17,
    fontWeight: "bold",
  },
  pricing: {
    color: "green",
    fontWeight: "bold",
    fontSize: 15,
  },
  moveicon: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
