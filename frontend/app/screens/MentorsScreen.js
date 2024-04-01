import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MentorCard from "../components/MentorCard";
import mentorsApi from "../apis/mentors";
import { useIsFocused } from "@react-navigation/native";
import mentorid from "../utils/mentorid";
import RNEInput from "../components/RNEInput";
import { Input } from "react-native-elements";
import { colors } from "../configs/variables";
import { Feather } from "@expo/vector-icons";
import useAuth from "../auth/useAuth"

export default function MentorsScreen({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [mentors, setMentors] = useState([]);
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  let {user}=useAuth()
  console.log("user ",user)
  const successResponse = () => {
    navigation.navigate("Success", {
      buttonTitle: "Take me to Home",
      screenName: "Home",
    });
  };

  const failResponse = () => {
    navigation.navigate("Failure", {
      buttonTitle: "Retry",
      screenName: "Home",
    });
  };

  useEffect(() => {
    if (!focus) return;
    mentorsApi
      .getMentors({ role: "mentor",_id:user._id })
      .then((res) => {
        console.log("ressss ",res);
        if (res.ok == true) setMentors(res.data.data);
        else {
          failResponse();
        }
      })
      .catch((err) => {
        console.log("errorr",err);
        failResponse();
      });
  }, [focus]);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setMentors([]);
    if (!focus) return;
    mentorsApi
      .getMentors({ role: "mentor" })
      .then((res) => {
        if (res.ok == true) setMentors(res.data.data);
        else {
          failResponse();
        }
      })
      .catch((err) => {
        failResponse();
        console.log(err);
      });
    setRefresh(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* <RNEInput/> */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <Feather
          style={{ marginBottom: 18 }}
          name="search"
          size={24}
          color="black"
        />
        <Input
          style={{
            marginRight: 100,
            paddingHorizontal: 10,
            height: 30,
          }}
          onChangeText={(value) => setSearch(value)}
          placeholder="Search"
        />
      </View>

      {mentors.length > 0 ? (
        <FlatList
          data={mentors.filter((mentor) =>
            mentor.name.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item }) => <MentorCard {...item} />}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
});
