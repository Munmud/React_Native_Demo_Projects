import { SafeAreaView, View } from "react-native";
import React, { useContext } from "react";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";

export default function Home() {
  const [state, setState] = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}
