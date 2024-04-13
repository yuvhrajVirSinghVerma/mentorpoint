import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

export default function AppButton({
  title,
  onPress,
  buttonStyles,
  IconComponent,
  textStyle,
}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.button, buttonStyles]}>
        {IconComponent && (
          <View
            style={{
              marginRight: 10,
              justifyContent: "center",
            }}
          >
            {IconComponent}
          </View>
        )}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "#0080ff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 15,
  },
  text: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 18,
  },
});
