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
import { Picker } from "@react-native-picker/picker";
import { HeaderBackButton } from "@react-navigation/elements";
import AppImagePicker from "../components/ImagePicker";
import useAuth from "../auth/useAuth";
import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons";
import opportunitiesApi from "../apis/opportunities";
import axios from "axios";
import Toast from "react-native-root-toast";

export default ScreeningQues = ({ route, navigation }) => {
  let { ScreeningQues, email ,id} = route.params;
  let [question, setQuestions] = useState(ScreeningQues);
  const { user } = useAuth();
  console.log("user ", user);
  const [mno, setMno] = useState(user.mobile_number);
  const [ResumeLink, setResumeLink] = useState("");
  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={{ backgroundColor: "#1e2020" }}
    >
      <HeaderBackButton
        tintColor="white"
        style={{ marginTop: 40, width: 50 }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{ height: 1000, marginRight: 40 }}>
        <View style={{ marginTop: 20 }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                left: 10,
              }}
            >
              Contact Info
            </Text>
            <View
              style={{
                marginVertical: 40,
                height: 70,
                width: 250,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <AppImagePicker imageUri={null} />
              </View>
              <View>
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
                >
                  {user.name}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 18,
                    flexWrap: "wrap",
                  }}
                >
                  {user.bio}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ height: "80%", justifyContent: "space-around", left: 20 }}
          >
            <View>
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
              >
                Email Address
              </Text>
              <TextInput
                placeholder="Email Address"
                value={user.email}
                style={{
                  color: "white",
                  fontSize: 16,
                  borderBottomWidth: 2,
                  marginTop: 10,
                  borderBottomColor: "white",
                }}
              />
            </View>
            <View>
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
              >
                Mobile Number
              </Text>
              <TextInput
                placeholder="Mobile Number"
                value={mno}
                style={{
                  color: "white",
                  fontSize: 16,
                  borderBottomWidth: 2,
                  marginTop: 10,
                  borderBottomColor: "white",
                }}
                keyboardType="numeric"
                onChangeText={(val) => {
                  setMno(val);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={async () => {
                let res = await DocumentPicker.getDocumentAsync();
                console.log("res: ", res);
                setResumeLink(res);
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginRight: 10,
                  }}
                >
                  Upload Resume
                </Text>
                <Entypo name="upload" size={24} color="white" />
              </View>
              <Text style={{ color: "white", fontSize: 15 }}>
                {ResumeLink.name}
              </Text>
            </TouchableOpacity>

            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Additionals Questions
            </Text>
            {question.map((sq, ind) => {
              return (
                <View>
                  <Text style={{ color: "white", fontSize: 18 }}>
                    {sq.type === "Custom" ? sq.selectedQues : sq.Question}
                  </Text>
                  {sq.type === "dropdown" && (
                    <View
                      style={{
                        borderBottomColor: "white",
                        borderBottomWidth: 2,
                      }}
                    >
                      <Picker
                        dropdownIconColor={"white"}
                        selectedValue={sq?.selectedAns || sq?.idealAns}
                        style={{ color: "white", width: 150 }}
                        onValueChange={(itemValue, itemIndex) => {
                          let temp = ScreeningQues;
                          console.log("temp ",temp)
                          temp[ind] = {
                            ...sq,
                            selectedAns: itemValue,
                          };
                          console.log("temp after ",temp)

                          setQuestions([...temp]);
                        }}
                      >
                        <Picker.Item label="Yes" value="Yes" />
                        <Picker.Item label="No" value="No" />
                      </Picker>
                    </View>
                  )}
                  {sq.type === "numeric" && (
                    <View>
                      <TextInput
                        keyboardType="numeric"
                        style={{
                          color: "white",
                          fontSize: 16,
                          borderBottomWidth: 2,
                          marginTop: 10,
                          borderBottomColor: "white",
                        }}
                        onChangeText={(val) => {
                          let temp = ScreeningQues;
                          temp[ind] = {
                            ...sq,
                            selectedAns: val,
                          };
                          setQuestions([...temp]);
                        }}
                      />
                    </View>
                  )}
                  {sq.type === "Custom" && (
                    <View>
                      {sq.selectedType === "Numeric" ? (
                        <View>
                          <TextInput
                            keyboardType="numeric"
                            style={{
                              color: "white",
                              fontSize: 16,
                              borderBottomWidth: 2,
                              marginTop: 10,
                              borderBottomColor: "white",
                            }}
                            onChangeText={(val) => {
                              let temp = ScreeningQues;
                              temp[ind] = {
                                ...sq,
                                selectedAns: val,
                              };
                              setQuestions([...temp]);
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            borderBottomColor: "white",
                            borderBottomWidth: 2,
                          }}
                        >
                          <Picker
                            dropdownIconColor={"white"}
                            selectedValue={
                              sq?.selectedAns || sq?.selectedIdealAns
                            }
                            style={{ color: "white", width: 150 }}
                            onValueChange={(itemValue, itemIndex) => {
                              let temp = ScreeningQues;
                              temp[ind] = {
                                ...sq,
                                selectedAns: itemValue,
                              };
                              setQuestions([...temp]);
                            }}
                          >
                            <Picker.Item label="Yes" value="Yes" />
                            <Picker.Item label="No" value="No" />
                          </Picker>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
            <Button
              title="Submit"
              onPress={async () => {
                console.log("email ", email, question, mno, ResumeLink);
              //   const formData = new FormData();
                let data = {
                  email,
                  question,
                  mno,
                  ResumeLink,
                  skills: user.skills,
                  bio: user.bio,
                  name: user.name,
                  id
                };
              //   formData.append("file",ResumeLink);
              // //   formData.append('data',
              // //  {
              // //   uri: ResumeLink.uri,
              // //   name: ResumeLink.name,
              // //   data: data,
              // //  }
              // //   )

                // const res = await axios.post(
                //   "http://192.168.1.8:8000/api/opportunities/apply",
                //   formData,
                  
                // );
                let res=await opportunitiesApi.apply(data)
                // console.log("resss ",res.data.ok,res.data.data)
                if(res?.data?.ok==1){
                  Toast.show(res.data.data?.message, {
                    duration: Toast.durations.LONG,
                  });
                  navigation.goBack()
                }
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
