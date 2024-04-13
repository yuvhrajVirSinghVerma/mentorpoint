import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Linking,
  TouchableOpacity
} from "react-native";
import React, { useState,useLayoutEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import SkillBadge from "../components/SkillBadge";
import { colors, statusbar } from "../configs/variables";
import Socialcard from "../components/SocialCard";
import BottonButton from "../components/BottomButton";
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function MentorProfile({ route, navigation }) {
  const params = route.params.user;
  const handleOpenLink = async (link) => {
    if (!link) return null;
    await Linking.openURL(link);
  };
  const [drawer, setDrawer] = useState(false);

  useLayoutEffect(()=>{
    console.log("left")
    // navigation.setOptions({
    //   headerLeft: () => (
    //    <TouchableOpacity 
    //    onPress={()=>navigation.goBack()}>
    //      <ArrowLeftOutlined />
    //    </TouchableOpacity>
    //   ),
    // });
  })
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <ProfileCard {...params} />
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
            {params?.bio}
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
            {params.skills.map((item) => {
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
              onPress={() => handleOpenLink(params?.github_url)}
            />
            <Socialcard
              name={"linkedin"}
              onPress={() => handleOpenLink(params?.linkedin_url)}
            />
            <Socialcard
              name={"instagram"}
              onPress={() => handleOpenLink(params?.instagram_url)}
            />
          </View>
        </View>
      </ScrollView>
      <BottonButton
        title="Start Session"
        onPress={() =>
          navigation.navigate("Services", { mentor_id: params._id })
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
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
