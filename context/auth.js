import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API } from "../config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  const navigation = useNavigation();

  const token = state && state.token ? state.token : "";
  // config axios
  axios.defaults.baseURL = API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // handle token expire
  axios.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        await AsyncStorage.removeItem("@auth");
        setState({ user: null, token: "" });
        navigation.navigate("Signin");
      }
    }
  );

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem("@auth");
        const as = JSON.parse(value);
        setState({ ...state, user: as.user, token: as.token });
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };
    loadFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
