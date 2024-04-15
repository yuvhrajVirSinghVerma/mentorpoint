import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Modal,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import AppButton from "../components/AppButton";
import RNEInput from "../components/RNEInput";
import opportunitiesApi from "../apis/opportunities";
import useAuth from "../auth/useAuth";
import { Picker } from "@react-native-picker/picker";
import { Button, colors } from "react-native-elements";
import { TabView, SceneMap } from "react-native-tab-view";
import {
  Actionsheet,
  useDisclose,
  Box,
  Center,
  NativeBaseProvider,
} from "native-base";
import Toast from "react-native-root-toast";

import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
const validationSchema = yup.object().shape({
  company: yup.string().required(),
  job_title: yup.string().required(),
  application_link: yup.string().url(),
});

function AddOpportunityScreen({ visible, setData }) {
  const { user } = useAuth();
  const mentorid = user?._id;

  const [selectedType, setSelectedType] = useState();
  const [value, setValue] = useState({});
  useEffect(() => {
    return () => {
      console.log("unmounted", value);
      setData(value);
    };
  });

  const { isOpen, onOpen, onClose } = useDisclose();

  let types = [
    "Full Time",
    "Part Time",
    "Contract",
    "Internship",
    "Temporary",
    "Other",
  ];
  return (
    <ScrollView style={{flex:1, backgroundColor: "#1e2020" }}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            company: "",
            application_link: "",
            type: "",
          }}
          validationSchema={validationSchema}
        >
          {({
            errors,
            handleSubmit,
            touched,
            handleChange,
            setFieldValue,
            values,
          }) => (
            <>
              <View>
                <RNEInput
                  // placeholder="Enter Company Name"
                  bg="white"
                  label="Company Name"
                  name="company"
                  onInputChange={(text) => {
                    let temp = value;
                    temp.company = text;
                    setValue({ ...temp });
                  }}
                  error={touched?.company && errors?.company}
                  inputContainerStyle={{
                    borderBottomWidth: 2, borderWidth: 0 ,borderBottomColor:'white',
                    marginBottom: 20,
                  }}
                  inputStyle={{ backgroundColor: "#1e2020", color: "white" }}
                  labelStyle={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white",
                  }}
                />
                <RNEInput
                  // placeholder="Enter Job Title"
                  bg="white"
                  label="Job Title"
                  name="job_title"
                  multiline={true}
                  onInputChange={(text) => {
                    console.log("tttt ", text);
                    let temp = value;
                    temp.job_title = text;
                    setValue({ ...temp });
                  }}
                  error={touched.job_title && errors.job_title}
                  inputContainerStyle={{
                    marginBottom: 20,
                    borderBottomWidth: 2, borderWidth: 0 ,borderBottomColor:'white'
                  }}
                  inputStyle={{ backgroundColor: "#1e2020", color: "white" }}
                  labelStyle={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white",
                  }}
                />
                <RNEInput
                  // placeholder="Enter Application Link"
                  bg="white"
                  label="Application Link"
                  name="application_link"
                  onInputChange={(text) => {
                    let temp = value;
                    temp.application_link = text;
                    setValue({ ...temp });
                  }}
                  error={touched?.application_link && errors?.application_link}
                  inputContainerStyle={{ borderBottomWidth: 2, borderWidth: 0 ,borderBottomColor:'white'}}
                  inputStyle={{ backgroundColor: "#1e2020", color: "white" }}
                  labelStyle={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white",
                  }}
                />
                {/* <View
                  style={{
                    marginTop: 20,
                    marginHorizontal: 10,
                    backgroundColor: colors.greyOutline,
                    borderRadius: 5,
                    marginBottom: 20,
                  }}
                >
                   <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedType(itemValue);
                      setFieldValue("type", itemValue);
                    }}
                  >
                    <Picker.Item label="Full Time" value="Full Time" />
                    <Picker.Item label="Part Time" value="Part Time" />
                    <Picker.Item label="Contract" value="Contract" />
                    <Picker.Item label="Internship" value="Internship" />
                  </Picker> 
                </View> */}
                  <View>
                  <RNEInput
                    // placeholder="Enter Application Link"
                    bg="white"
                    label="Location"
                    name="location"
                    value={values.location}
                    onInputChange={() => {}}
                    error={touched?.location && errors?.location}
                    inputContainerStyle={{
                      borderBottomWidth: 2,
                      borderWidth: 0,
                      borderBottomColor:'white'
                    }}
                    inputStyle={{ backgroundColor: "#1e2020", color: "white" }}
                    labelStyle={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      let temp = value;
                      if(!values.location){
                        Toast.show("Please Add Location", {
                          duration: Toast.durations.LONG,
                        });
                        return
                      }
                      if (!temp.location) temp.location = [];
                      temp.location = [...temp.location, values.location];
                      console.log("loc ", temp, values.location);
                      setValue({ ...temp });
                      setFieldValue("location","")
                    }}
                    style={{ position: "absolute", right: 10 }}
                  >
                    <MaterialIcons name="add" size={26} color="white" />
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      flexWrap: "wrap",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom:40
                    }}
                  >
                    {value?.location?.map((loc, ind) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            let temp = value;
                            temp.location = temp.location.filter(
                              (_, i) => i != ind
                            );
                            setValue({ ...temp });
                          }}
                          style={{ flexDirection: "row", marginRight: 8 }}
                        >
                          <Text style={{ color: "white" }}>{loc}</Text>
                          <Entypo
                            name="circle-with-cross"
                            size={18}
                            color="white"
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <Center style={{ marginBottom: 40 }}>
                  <TouchableOpacity
                    style={{ padding: 8, width: "100%", height: 100 }}
                    onPress={onOpen}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Job Type
                      </Text>
                      <MaterialIcons name="edit" size={24} color="white" />
                    </View>
                    <Text style={{ fontSize: 14, color: "white" }}>
                      {selectedType?selectedType:"Add Job Types"}
                    </Text>
                  </TouchableOpacity>

                  <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                      {types?.map((t) => {
                        return (
                          <TouchableOpacity
                            style={{
                              marginBottom: 20,
                              width: "100%",
                              height: 20,
                            }}
                            onPress={() => {
                              setSelectedType(t);
                              setFieldValue("type", t);
                              let temp = value;
                              temp.type = t;
                              setValue({ ...temp });
                              onClose();
                            }}
                          >
                            <Text>{t}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </Actionsheet.Content>
                  </Actionsheet>

                </Center>
              
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const SecondRoute = ({ data }) => {
  // console.log("second ",data)
  const { user } = useAuth();
  console.log("user ",user)

  const mentorid = user?._id;
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  let [Questions, setQuestions] = useState([
    //make this a state
    {
      title: "Custom Question",
      Question: "Try Asking a question ?",
      type: "Custom",
      idealAns: "yes",
      selectedType: "",
      selectedIdealAns: "",
      selectedQues:""
    },
    {
      title: "Background Check",
      Question: "Are u willing to undergo a Background check ?",
      type: "dropdown",
      idealAns: "yes",
    },
    {
      title: "Experience with Skill",
      Question: "How Many Years of Experience do you have ?",
      type: "Both",
      textinp: "Skill",
    },
    {
      title: "Experience",
      Question: "How Many Years of Experience do you have ",
      type: "numeric",
    },
  ]);

  let [selecedQues, setSelectedQues] = useState([]);
  const successResponse = () => {
    Toast.show("job added successfully", {
      duration: Toast.durations.LONG,
    });
    navigation.navigate("Opportunities", {
      buttonTitle: "All Opportunities",
      screenName: "Opportunities",
    });
  };

  const failResponse = () => {
    Toast.show("failed to post this job", {
      duration: Toast.durations.LONG,
    });
    navigation.navigate("Home", {
      buttonTitle: "Take me to Home",
      screenName: "Home",
    });
  };
  const addService = (values) => {
    console.log("second ", values, selecedQues);
    let obj={...values,ScreeningQues:selecedQues}
    try {
      opportunitiesApi
      .addOpportunity({ mentor_id: mentorid, ...obj })
      .then((res) => {
        console.log("res ",res)
        if (res.ok) {
          successResponse();
        } else {
          failResponse();
        }
      })
      .catch((err) => {
        failResponse();
      });
    } catch (error) {
      console.log("error ",error)
    }
  };

  const setSelectedQuesfun = (val) => {
    let temp = selecedQues;
    setSelectedQues([...temp, val]);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#1e2020" }}>
      <Formik
        initialValues={{
          description: "",
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, values }) => (
          <>
          {/* <Text style={{color:'white'}}>{JSON.stringify(values)}</Text> */}
            <RNEInput
              name="description"
              style={{ borderWidth: 1 }}
              label="Tell Us About Role"
              value={values.description}
              onChangeText={handleChange("description")}
              // onInputChange={()=>{console.log("Valll ",values)}}
              inputContainerStyle={{
                borderBottomWidth: 2,
                marginBottom: 20,
                borderWidth: 0,
                borderBottomColor:'white',
                minHeight: 40, // Set a minimum height to ensure the TextInput is visible
                maxHeight: 200, // Set a maximum height if needed to limit the growth
                // height: Math.max(40, values?.description?.split('\n').length * 40)
              }}
              multiline={true}
              inputStyle={{ backgroundColor: "#1e2020", color: "white" }}
              labelStyle={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white"
                ,marginTop:40
              }}
            />

            <View style={{marginVertical:40}}>
              <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Applicants Collection</Text>
              <View style={{flexDirection:'row'}}>
              <Text style={{color:'white'}}>You Will get Notified Applicants at </Text>
              <Text style={{color:'white',fontWeight:'bold'}}>{user.email}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Center style={{ marginBottom: 40 }}>
                <TouchableOpacity
                  onPress={onOpen}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 350,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    {" "}
                    Screening Questions
                  </Text>
                  <Ionicons name="add-circle-sharp" size={28} color="white" />
                </TouchableOpacity>

                <View
                  style={{
                    marginHorizontal: 6,
                    position: "relative",
                    left: -115,
                  }}
                >
                  {selecedQues.length == 0 && (
                    <Text style={{ color: "white", fontSize: 16 }}>
                      Add Questions
                    </Text>
                  )}
                </View>

                <View style={{ position:'relative',left:0 }}>
                  {selecedQues.map((ele,ind) => {
                    return (
                      <View style={{ flexDirection:'row',marginVertical: 7,marginLeft:-40}}>
                        <Text style={{ color: "white" ,marginRight:10}}>{ele.type==='Custom'?ele.selectedQues:ele.Question}</Text>
                        <TouchableOpacity
                        onPress={()=>{
                          let temp=selecedQues
                          temp=temp.filter((_,i)=>i!=ind)
                          setSelectedQues([...temp])
                        }}
                        >
                        <Entypo
                          name="circle-with-cross"
                          size={18}
                          color="white"
                        />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>

                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content style={{ backgroundColor: "#1e2020" }}>
                    {Questions.map((t, ind) => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginBottom: 50,
                            width: "100%",
                            height: 40,
                          }}
                          onPress={() => {
                            onClose();
                          }}
                        >
                          <Details
                            props={t}
                            ind={ind}
                            setQuestions={setQuestions}
                            Questions={Questions}
                            setSelectedQues={setSelectedQuesfun}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </Actionsheet.Content>
                </Actionsheet>
              </Center>
            </View>

            <View style={styles.bottombuttons}>
              <Button
                title="Post Job"
                buttonStyles={{
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  console.log("presses ", values, data);
                  addService({ ...data, ...values });
                }}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
const Details = ({ props, ind, setQuestions, Questions, setSelectedQues }) => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log("props details", props);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, ...props?.modalViewStyle }}>
            <TouchableOpacity
              style={{ right: -4, top: -8, position: "absolute" }}
              onPress={() => setModalVisible(false)}
            >
              <Entypo name="circle-with-cross" size={30} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ width: "100%" }}>
              <View>
                <Text style={{ fontWeight: "bold" }}>Question </Text>
                <Text>{props?.Question}</Text>
              </View>
              <View>
                {props.type == "dropdown" && (
                  <View>
                    <Text style={{ fontWeight: "bold" }}>Ideal Answer</Text>
                    <Text>{props.idealAns}</Text>
                  </View>
                )}
                {props.type == "numeric" && (
                  <View>
                    <Text style={{ fontWeight: "bold" }}>Ideal Answer</Text>
                    <TextInput
                      placeholder="Minimum"
                      style={{ borderBottomWidth: 1 }}
                    />
                  </View>
                )}
                {props.type == "Both" && (
                  <View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>
                        {props?.textinp}
                      </Text>
                      <TextInput
                        placeholder={props?.textinp}
                        style={{ borderBottomWidth: 1 }}
                      />
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Ideal Answer</Text>
                      <TextInput
                        placeholder="Minimum"
                        style={{ borderBottomWidth: 1 }}
                      />
                    </View>
                  </View>
                )}

                {props.type == "Custom" && (
                  <View>
                    <View>
                      <TextInput
                        placeholder={"Question"}
                        style={{ borderBottomWidth: 1 }}
                        onChangeText={(val)=>{
                          let temp=Questions
                          temp[ind].selectedQues=val;
                          setQuestions([...temp])
                        }}
                      />
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Response Type</Text>
                      <Picker
                        selectedValue={props?.selectedType}
                        onValueChange={(itemValue, itemIndex) => {
                          let temp = Questions;
                          temp[ind] = { ...props, selectedType: itemValue };
                          setQuestions([...temp]);
                        }}
                      >
                        <Picker.Item label="Yes/No" value="Dropdown" />
                        <Picker.Item label="Numeric" value="Numeric" />
                      </Picker>
                    </View>
                    {props?.selectedType == "Numeric" ? (
                      <View>
                        <Text style={{ fontWeight: "bold" }}>Ideal Answer</Text>
                        <TextInput
                          placeholder="Minimum"
                          style={{ borderBottomWidth: 1 }}
                          onChangeText={(val)=>{
                            let temp=Questions
                            temp[ind].minimum=val;
                            setQuestions([...temp])
                          }}
                        />
                      </View>
                    ) : (
                      <View>
                        <Text style={{ fontWeight: "bold" }}>Ideal Answer</Text>
                        <Picker
                          selectedValue={props?.selectedIdealAns}
                          onValueChange={(itemValue, itemIndex) => {
                            let temp = Questions;
                            temp[ind] = {
                              ...props,
                              selectedIdealAns: itemValue,
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
              <View style={{ marginVertical: 40 }}>
                <Button
                  title={"Add"}
                  onPress={() => {
                    setSelectedQues(props);
                    setModalVisible(false)
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ ...styles.button, ...props?.detailsstyle }}
        onPress={() => {
          console.log("btn ", modalVisible);
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>{props.title}</Text>
        <Text style={styles.textStyle}>{props.Question}</Text>
      </TouchableOpacity>
    </View>
  );
};
// const Main=({route})=>{
//   const[data,setData]=useState({})

//   // useEffect(() => {
//   //   setData((prevData) => ({ ...prevData, ...route.params }));
//   // }, [route.key]);
//   return(
//     <>
//     {route.key=='first' ?
//       <AddOpportunityScreen setData={setData} />
//       :
//       <SecondRoute data={data} />
//   }
//     </>

//   )
// }
// const renderScene = (route ) => {
//   return<Main route={route.route} />
//   switch (route.route.key) {
//     case 'first':
//       return <AddOpportunityScreen setData={setData} />;
//     case 'second':
//       return <SecondRoute data={data} />;
//   }
// };
{/* <NativeBaseProvider>
<TabView
  navigationState={{ index, routes }}
  renderScene={({ route }) => {
    console.log("yuvi ", data);
    switch (route.key) {
      case "first":
        return <AddOpportunityScreen setData={setData} />;
      case "second":
        return <SecondRoute data={data} />;
    }
  }}
  onIndexChange={setIndex}
  initialLayout={{ width: layout.width }}
/>
</NativeBaseProvider> */}
export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [route, setRoute] = React.useState("first");

  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);
  const [data, setData] = useState({});
  return (
    <NativeBaseProvider>
  <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:10}}>
    <TouchableOpacity
    onPress={()=>setRoute("first")}
    ><Text style={route=="first" ?{borderBottomWidth:1,borderBottomColor:'blue',fontWeight:'bold'}:{fontWeight:'bold'}}>About Job</Text></TouchableOpacity>

    <TouchableOpacity
    onPress={()=>setRoute("second")}
    ><Text style={route!="first" ?{borderBottomWidth:1,borderBottomColor:'blue',fontWeight:'bold'}:{fontWeight:'bold'}}>Add Screening Questions</Text></TouchableOpacity>
  </View>

    {route=="first"?<AddOpportunityScreen setData={setData} />:<SecondRoute data={data}/>}
  </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "bold",
    // textAlign: "center",
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  modalView: {
    height: "80%",
    width: "90%",
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
    borderRadius: 5,
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 10,
  },
  bottombuttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
