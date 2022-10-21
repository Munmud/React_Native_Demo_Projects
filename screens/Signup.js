import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <Text title center>
        Sign Up
      </Text>
      <UserInput name="NAME" value={name} setValue={setName} />
      <UserInput name="EMAIL" value={email} setValue={setEmail} />
      <UserInput name="PASSWORD" value={password} setValue={setPassword} />
      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
    </View>
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
