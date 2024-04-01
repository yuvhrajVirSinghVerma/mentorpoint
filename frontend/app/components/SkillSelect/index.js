import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SkillInput from "../SkillInput";
import { colors } from "../../configs/variables";
import AppButton from "../AppButton";
import { useFormikContext } from "formik";

export default function SkillSelect({ skills }) {
  var selectedOptions = skills ? skills : [];
  const [skill, setSkill] = useState("");
  const { setFieldValue } = useFormikContext();

  const handleAddSkill = async () => {
    if (skill.length > 0) selectedOptions = selectedOptions.concat(skill);
    console.log(selectedOptions);
    setFieldValue("skills", selectedOptions);
  };
  const handleDeleteSkill = (skillToDelete) => {
    selectedOptions = selectedOptions.filter((item) => item != skillToDelete);
    setFieldValue("skills", selectedOptions);
  };
  return (
    <>
      <View>
        <View style={styles.inputs}>
          <View
            style={{
              flex: 1,
            }}
          >
            <SkillInput
              label="Skills"
              name="skills"
              placeholder="Add Skills"
              bg="white"
              onInputChange={(value) => {
                setSkill(value);
              }}
            />
          </View>
          <View>
            <AppButton
              title="Add"
              buttonStyles={{
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => handleAddSkill()}
            />
          </View>
        </View>

        <View style={styles.chips}>
          {selectedOptions.map((item) => {
            return (
              <View key={item}>
                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "white",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: colors.grey,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteSkill(item)}>
                      <View
                        style={{
                          paddingLeft: 10,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="delete"
                          size={20}
                          color="red"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputs: {
    flexDirection: "row",
    alignItems: "center",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
