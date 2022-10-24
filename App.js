import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RootNavigation from "./RootNavigation";

export default function App() {
  return <RootNavigation />;
}
