import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import AppButton from "../../components/AppButton";
export default function SuccessAnimation({ navigation, route }) {
  const { buttonTitle, screenName } = route?.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          margin: 20,
        }}
      >
        <LottieView source={require("./success.json")} autoPlay loop />
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <AppButton
          title={buttonTitle}
          onPress={() => navigation.navigate(screenName)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
