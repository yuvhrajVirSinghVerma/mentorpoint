import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Modal
} from "react-native";

import React, { useEffect, useState, useLayoutEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import ProfileCard from "../components/ProfileCard";
import SkillBadge from "../components/SkillBadge";
import { colors, statusbar } from "../configs/variables";
import Socialcard from "../components/SocialCard";
import useAuth from "../auth/useAuth";
import mentorsApi from "../apis/mentors";
import RNEInput from "../components/RNEInput";
// import { ArrowLeftOutlined } from '@ant-design/icons';
import { HeaderBackButton } from "@react-navigation/elements";
import { Entypo ,MaterialIcons} from "@expo/vector-icons";
import OpportunityCard from "../components/OpportunityCard";
import Toast from "react-native-root-toast";

export default function UserProfile({ navigation, route }) {
  const [drawer, setDrawer] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  const userid = user?._id;
  const focus = useIsFocused();
 const[isShowingApplied,setisApplied]=useState(false)

 useEffect(()=>{
  if(isShowingApplied){

  }else{
    
  }
 },[isShowingApplied])
  const handleOpenLink = async (link) => {
    if (!link) return null;
    await Linking.openURL(link);
  };
  const filterjobs=async(ind)=>{
    try {
      let res = await mentorsApi.updateMentor({ updatejob:true,jobs: userData.jobs[ind]._id, _id: userData._id,isSaved:true });
    console.log("res ", res.ok);
    if (res.ok) {
      let temp=userData;
      temp.jobs=temp.jobs.filter((f,i)=>i!=ind)
      setUserData({...temp})
    } else{
      Toast.show("Error on Deleting Job", {
        duration: Toast.durations.LONG,
      });
    }
    } catch (error) {
      console.log("err ",error)
      
    }
    
  }
  useLayoutEffect(() => {
    console.log("left");
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  });
  useEffect(() => {
    // if (!focus) return <Text>Hello</Text>;
    if (focus) {
      console.log("focus ", focus);
      setUserData(null);
      mentorsApi.getMentors({ _id: userid }).then((res) => {
        if (res.ok) {
          console.log("res.data.data ",res)
          setUserData(res.data.data[0]);
        }
      });
    }
  }, [focus]);

  return (
    <>
      {userData == null && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {userData && (
        <ScrollView>
          <View>
            <View
              style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <ProfileCard {...userData} />
          </View>

          <View style={styles.biocontainer}>
            <Text
              style={{
                color: colors.grey,
                fontWeight: "bold",
              }}
            >
              Bio
            </Text>
            <Text
              style={{
                textAlign: "justify",
                lineHeight: 20,
                marginVertical: 5,
              }}
            >
              {userData.bio}
            </Text>
          </View>

          <View style={styles.skillscontainer}>
            <Text
              style={{
                color: colors.grey,
                fontWeight: "bold",
              }}
            >
              Skills
            </Text>
            <View style={styles.badgecontainer}>
              {userData.skills.map((item) => {
                return <SkillBadge skill={item} key={item} />;
              })}
            </View>
          </View>

          <View style={styles.socialcontainer}>
            <Text
              style={{
                color: colors.grey,
                fontWeight: "bold",
              }}
            >
              Social Profiles
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Socialcard
                name={"github"}
                onPress={() => handleOpenLink(userData?.github_url)}
              />
              <Socialcard
                name={"linkedin"}
                onPress={() => handleOpenLink(userData?.linkedin_url)}
              />
              <Socialcard
                name={"instagram"}
                onPress={() => handleOpenLink(userData?.instagram_url)}
              />
            </View>
          </View>

         <SavedJobsModal jobs={isShowingApplied?(userData.AppliedJobs):(userData.jobs)} filterjobs={filterjobs} setisApplied={setisApplied} isShowingApplied={isShowingApplied}/>
          {/* <View style={styles.skillscontainer}>
            <Text
              style={{
                color: colors.grey,
                fontWeight: "bold",
              }}
            >
              Meeting URL
            </Text>
            
          </View> */}
        </ScrollView>
      )}
    </>
  );
}
const SavedJobsModal = ({ jobs,filterjobs,setisApplied,isShowingApplied}) => {
  const [modalVisible, setModalVisible] = useState(false);
 
  console.log("props details", jobs);
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
       <View style={{flexDirection:'row',justifyContent:'space-evenly',width:'80%'}}>
        <TouchableOpacity
        onPress={()=>{
          setisApplied(false)
         }}
        >
           <Text style={!isShowingApplied ?{color:'blue',borderBottomWidth:1}:{color:'black'}}>Saved Jobs</Text>
           </TouchableOpacity>
      
       <TouchableOpacity 
       onPress={()=>{
        setisApplied(true)
       }}
       >
        <Text style={isShowingApplied ?{color:'blue',borderBottomWidth:1}:{color:'black'}}>Applied Jobs</Text>
        </TouchableOpacity>
       
       </View>

            <TouchableOpacity
              style={{ right: -4, top: -8, position: "absolute" }}
              onPress={() => setModalVisible(false)}
            >
              <Entypo name="circle-with-cross" size={30} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ width: "100%" }}>
              {jobs.map((ele,ind)=>{
                return(
                  <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                    {/* <View>
                    <Text>{ele.company}</Text>
                    <Text>{ele.job_title}</Text>
                    <Text>{ele.type}</Text>
                    <Text>{ele.description}</Text>
                    </View> */}
                    <OpportunityCard
                    {...ele} oncardClick={()=>{}} index={ind} 
                    showSave={false}
                    timesection={
                      { marginTop:-8,marginLeft:-12,flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start'}
                    }
                    applybtnstyle={ele.isApplied?{width:60,marginTop:-6,marginLeft:12}:{width:60,marginTop:10,marginLeft:12}}
                    detailsstyle={{position:'relative',
                    top:57,
                    width:60,
                    right:-10,
                    borderRadius:0,
                    right:10
                  }}
                  modalViewStyle={{height:'80%',width:'95%'}}
                  typestyle={{fontSize:14}}
                  containerStyle={isShowingApplied?{width:200}:{width:200,marginLeft:40}}
                    />
                    {!isShowingApplied && (
                      <TouchableOpacity
                    style={{position:'relative',right:26,top:-2}}
                    onPress={()=>{
                      console.log("ind ",ind)
                      filterjobs(ind)
                    }}
                    >
                    <MaterialIcons name="delete" size={30} color="black" />
                    </TouchableOpacity>
                    )}

                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("btn ", modalVisible);
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>My Jobs</Text>
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
    height: "60%",
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
    padding: 8,
    backgroundColor: "#2196f3",
    borderRadius: 5,
    bottom: 14,
    width: 110,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  biocontainer: {
    marginLeft: 20,
    marginVertical: 10,
    marginRight: 20,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  skillscontainer: {
    marginLeft: 20,
    marginVertical: 10,
    marginRight: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingBottom: 10,
    alignItems: "flex-start",
  },
  badgecontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  socialcontainer: {
    marginLeft: 20,
    marginVertical: 5,

    marginRight: 20,
    paddingBottom: 10,
  },
});
