import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Button,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SessionItem from "../components/SessionItem";
import servicesApi from "../apis/services";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ArrowLeftOutlined } from '@ant-design/icons';
// import{HomeScreen} from '../'
export default function ServicesScreen({ navigation,route}) {
  const [services, setServices] = useState([]);
  const [loaded, setLoaded] = useState(true);
  // const navigation = useNavigation();
  const mentor_id = route?.params?.mentor_id;
  const isFocus = useIsFocused();
  // console.log("route ",route.goBack())
  // console.log("navigation ",navigation)

  useLayoutEffect(()=>{
    // navigation.setOptions({
    //   headerLeft: () => (
    //    <TouchableOpacity 
    //    onPress={()=>navigation.goBack()}>
    //      <ArrowLeftOutlined />
    //    </TouchableOpacity>
    //   ),
    // });
  })
  useEffect(() => {
    // if (!isFocus) return null;
    console.log("isFocus ",isFocus)
    if(isFocus){
      setServices([]);
    setLoaded(true);
    servicesApi
      .getServices({ mentor_id: mentor_id, is_deleted: false })
      .then((res) => {
        console.log(res.data);
        setServices(res?.data?.data);
        setLoaded(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isFocus]);

  return (
    <View style={styles.container}>
      {services.length > 0 ? (
        <ScrollView>
          {services.map((item) => {
            return (
              <SessionItem
                key={item._id}
                {...item}
                onPress={() => {
                  navigation.navigate("Booking", {
                    serviceid: item._id,
                    mentor_id: mentor_id,
                  });
                }}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          {loaded && <ActivityIndicator size="large" color="#0000ff" />}
          {!loaded && (
            <View>
              <Text>No Services by Mentor</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
