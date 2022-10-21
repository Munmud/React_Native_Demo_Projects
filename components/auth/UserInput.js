import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Text from "@kaloraat/react-native-text";

const UserInput = ({
  name,
  value,
  setValue,
  autoCapitalize = "none",
  keyboardType = "default",
  autoCompleteType = "default",
  secureTextEntry = false,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text semi> {name}</Text>
      <TextInput
        style={{
          borderBottomWidth: 0.5,
          height: 48,
          borderBottomColor: "#8e93a1",
          marginBottom: 30,
        }}
        value={value}
        onChangeText={(text) => setValue(text)}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCompleteType={autoCompleteType}
      />
    </View>
  );
};

export default UserInput;
