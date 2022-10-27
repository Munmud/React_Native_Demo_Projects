import React from "react";
import { View, SafeAreaView } from "react-native";
import Text from "@kaloraat/react-native-text";
import FooterTabs from "../components/nav/FooterTabs";

export default function Links() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Links Screen</Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}
