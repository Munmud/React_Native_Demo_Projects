import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import { AuthContext } from "../context/auth";
import CircleLogo from "../components/auth/CircleLogo";

const Account = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState({
    // url: "https://cdn.pixabay.com/photo/2022/09/15/11/14/sea-7456253_960_720.jpg",
    public_id: "",
  });
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [uploadImage, setUploadImage] = useState("");

  useEffect(() => {
    if (state) {
      const { name, email, image, role } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, [state]);

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

  const handleUpload = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (pickerResult.cancelled) {
      return;
    }
    // send to backend for uploading to cloud
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);
    const { data } = await axios.post("/upload-image", { image: base64Image });

    // update async storage
    const as = JSON.parse(await AsyncStorage.getItem("@auth"));
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));

    // updat context
    setState({ ...state, user: data });
    setImage(data.image);
    alert("Image Saved");
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <CircleLogo>
        {image && image.url ? (
          <Image
            source={{
              uri: image.url,
            }}
            style={{
              width: 190,
              height: 190,
              borderRadius: 100,
              marginVertical: 20,
            }}
          />
        ) : uploadImage ? (
          <Image
            source={{
              uri: uploadImage,
            }}
            style={{
              width: 190,
              height: 190,
              borderRadius: 100,
              marginVertical: 20,
            }}
          />
        ) : (
          <TouchableOpacity onPress={handleUpload}>
            <FontAwesome5 name="camera" size={25} />
          </TouchableOpacity>
        )}
      </CircleLogo>

      {image && image.url ? (
        <TouchableOpacity onPress={handleUpload}>
          <FontAwesome5
            name="camera"
            size={25}
            style={{ marginBottom: 1, marginTop: -5, alignSelf: "center" }}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Text title center style={{ paddingBottom: 10 }}>
        {name}
      </Text>
      <Text medium center style={{ paddingBottom: 10 }}>
        {email}
      </Text>
      <Text medium center light style={{ paddingBottom: 50 }}>
        {role}
      </Text>
      <UserInput
        name="PASSWORD"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        autoCompleteType="password"
      />
      <SubmitButton
        title="Update Password"
        handleSubmit={handleSubmit}
        loading={loading}
      />

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

export default Account;
