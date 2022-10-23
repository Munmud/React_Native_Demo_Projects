import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";

export default function SubmitButton({ title, handleSubmit, loading }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#ff9900",
        height: 50,
        //   bottom: 120,
        justifyContent: "center",
        marginBottom: 20,
        marginHorizontal: 15,
        borderRadius: 24,
      }}
      disabled={loading}
      onPress={handleSubmit}
    >
      <Text center bold medium>
        {loading ? "Please Wait..." : title}
      </Text>
    </TouchableOpacity>
  );
}
