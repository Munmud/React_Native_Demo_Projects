import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import Home from "../../screens/Home";
import Signup from "../../screens/Signup";
import Signin from "../../screens/Signin";
import { AuthContext } from "../../context/auth";
import HeaderTabs from "./HeaderTabs";

export default function ScreensNav() {
  const Stack = createNativeStackNavigator();
  const [state, setState] = useContext(AuthContext);
  const authencicated = state && state.token !== "" && state.user !== null;
  return (
    <Stack.Navigator
      initialRouteName="Home"
      //   screenOptions={{ headerShown: false }}
    >
      {authencicated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Links Daily",
            headerRight: () => <HeaderTabs />,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
