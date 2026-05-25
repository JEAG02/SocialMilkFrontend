import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}