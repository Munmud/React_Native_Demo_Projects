import { SafeAreaView, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../context/auth";

export default function HeaderTabs() {
  const [state, setState] = useContext(AuthContext);
  const signOut = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signOut}>
        {/* <Text>HeaderTabs</Text> */}
        <FontAwesome5 name="sign-out-alt" sign={25} color="#ff9900" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
