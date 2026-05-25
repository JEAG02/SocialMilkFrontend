import { NavigationContainer }
from "@react-navigation/native";

import {
  AuthProvider,
  useAuth,
}
from "./src/context/AuthContext";

import AuthStack
from "./src/navigation/AuthStack";

import MainTabs
from "./src/navigation/MainTabs";

import {
  TasksProvider,
} from "./src/context/TasksContext";


function Routes() {

  const {
    isAuthenticated,
    loading,
  } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
       {isAuthenticated
        ? <MainTabs />
        : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <TasksProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </TasksProvider>
  );
}