import { View, TouchableOpacity } from "react-native";
import React from "react";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "react-native-elements";

export const Tab = ({ name, text, handlePress, screenName, routeName }) => {
  const activeScreenColor = screenName === routeName ? "orange" : "black";
  return (
    <TouchableOpacity onPress={handlePress}>
      <FontAwesome5
        name={name}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
        color={activeScreenColor}
      />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default function FooterTabs() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <>
      <Divider width={1} />
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          marginHorizontal: 30,
          justifyContent: "space-between",
        }}
      >
        <Tab
          name="home"
          text="Home"
          handlePress={() => navigation.navigate("Home")}
          screenName="Home"
          routeName={route.name}
        />
        <Tab
          name="plus-square"
          text="Post"
          handlePress={() => navigation.navigate("Post")}
          screenName="Post"
          routeName={route.name}
        />
        <Tab
          name="list-ol"
          text="Links"
          handlePress={() => navigation.navigate("Links")}
          screenName="Links"
          routeName={route.name}
        />
        <Tab
          name="user"
          text="Account"
          handlePress={() => navigation.navigate("Account")}
          screenName="Account"
          routeName={route.name}
        />
      </View>
    </>
  );
}
