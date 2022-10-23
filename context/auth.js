import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  // config axios
  axios.defaults.baseURL = API;

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
