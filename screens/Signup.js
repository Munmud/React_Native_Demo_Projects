import React, { useState } from "react";
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

import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      //
      const data = await axios.post("http://localhost:8000/api/signup", {
        name,
        email,
        password,
      });
      console.log("Submitted");
      alert("Sign up success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text title center>
        Sign Up
      </Text>
      <UserInput
        name="NAME"
        value={name}
        setValue={setName}
        autoCapitalize="words"
      />
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
        title="Signup"
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <Text small center>
        Already Joined ?
        <Text
          color="#ff2222"
          // onPress={}
        >
          Sign In
        </Text>
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

export default Signup;
