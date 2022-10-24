import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./context/auth";
import ScreensNav from "./components/nav/ScreensNav";

export default function RootNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreensNav />
      </AuthProvider>
    </NavigationContainer>
  );
}
