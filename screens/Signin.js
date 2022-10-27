import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import { AuthContext } from "../context/auth";
import CircleLogo from "../components/auth/CircleLogo";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("moontasir042@gmail.com");
  const [password, setPassword] = useState("1234567");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      //
      const { data } = await axios.post("/signin", {
        email,
        password,
      });
      if (data.error) {
        throw new Error(data.error);
      }
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      navigation.navigate("Home");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text title center>
        Sign In
      </Text>
      <CircleLogo />
      <UserInput
        name="EMAIL"
        value={email}
        setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <UserInput
        name="PASSWORD"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        autoCompleteType="password"
      />
      <SubmitButton
        title="Sign In"
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <Text small center>
        Not yet Registered?{" "}
        <Text color="#ff2222" onPress={() => navigation.navigate("Signup")}>
          Sign Up
        </Text>
      </Text>

      <Text small center color="orange" style={{ marginTop: 10 }}>
        Forgot Password ?
      </Text>

      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
});

export default Signin;
