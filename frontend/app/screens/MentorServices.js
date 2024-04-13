import { Button, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState,useLayoutEffect } from "react";
import SessionTypeItem from "../components/SessionTypeItem";
import AppButton from "../components/AppButton";
import servicesApi from "../apis/services";
import { useIsFocused } from "@react-navigation/native";
import useAuth from "../auth/useAuth";
import { HeaderBackButton } from "@react-navigation/elements";

export default function SessionsTypeScreen({ navigation }) {
  const [drawer, setDrawer] = useState(false);
  const [services, setServices] = useState([]);
  const focus = useIsFocused();
  const { user } = useAuth();
  const mentor_id = user?._id;

  const handleDeleteService = (id, value) => {
    servicesApi
      .editService({ _id: id, is_deleted: value })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditService = (id) => {
    navigation.navigate("EditService", { service_id: id });
  };
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
    if (!focus) return;
    setServices(null);
    servicesApi.getServices({ mentor_id: mentor_id }).then((res) => {
      setServices(res.data.data);
    });
  }, [focus]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Add Your Session Types</Text>
        </View>
        <FlatList
          keyboardShouldPersistTaps={"handled"}
          data={services}
          keyExtractor={(item) => item._id}
          renderItem={(item) => (
            <SessionTypeItem
              {...item}
              handleDeleteItem={(id, value) => handleDeleteService(id, value)}
              handleEditItem={() => handleEditService(item.item._id)}
            />
          )}
        />
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Button
          title="Add New"
          onPress={() => navigation.navigate("AddService")}
          buttonStyles={{
            borderRadius: 5,
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  titlecontainer: {
    marginHorizontal: 10,
  },
});
