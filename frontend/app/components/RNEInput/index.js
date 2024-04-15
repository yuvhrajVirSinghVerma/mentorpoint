import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input } from "react-native-elements";
import { colors } from "../../configs/variables";
import { useFormikContext } from "formik";

export default function RNEInput({
  placeholder,
  label,
  multiline,
  bg,
  onInputChange=()=>{},
  defaultValue,
  name,
  error,
  inputStyle,
  inputContainerStyle,
  labelStyle,
  value
}) {
  const { setFieldValue,values } = useFormikContext();
  return (
    <Input
      defaultValue={defaultValue}
      value={value}
      onChangeText={(text) => {
        setFieldValue(name, text)
        onInputChange(text)
      }}
      placeholder={placeholder}
      label={label}
      multiline={multiline}
      inputStyle={{
        backgroundColor: bg ? bg : colors.lightgrey,...inputStyle
      }}
      inputContainerStyle={{
        // borderBottomWidth: 2,
        // borderWidth: 2,
        // padding: 5,
        // paddingHorizontal: 10,
        // backgroundColor: bg ? bg : colors.lightgrey,
        // borderRadius: 5,
        ...inputContainerStyle
      }}
      labelStyle={{
        color: "black",
        marginBottom: 5,
        ...labelStyle
      }}
      errorMessage={error}
    />
  );
}

const styles = StyleSheet.create({});
