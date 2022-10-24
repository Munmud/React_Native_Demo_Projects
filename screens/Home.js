import { SafeAreaView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";

export default function Home() {
  const [state, setState] = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <FooterTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
  },
});
