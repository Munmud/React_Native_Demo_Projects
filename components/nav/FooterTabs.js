import { View, TouchableOpacity } from "react-native";
import React from "react";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const Tab = ({ name, text }) => {
  return (
    <TouchableOpacity>
      <>
        <FontAwesome5
          name={name}
          size={25}
          style={{
            marginBottom: 3,
            alignSelf: "center",
          }}
        />
        <Text>{text}</Text>
      </>
    </TouchableOpacity>
  );
};

export default function FooterTabs() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <Tab name="home" text="Home" />
      <Tab name="plus-square" text="Post" />
      <Tab name="list-ol" text="Links" />
      <Tab name="user" text="Account" />
    </View>
  );
}
