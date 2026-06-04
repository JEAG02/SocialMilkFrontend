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

import {AnimalsProvider,}
from "./src/context/AnimalsContext";

// =========================
// ROUTES
// =========================

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

// =========================
// APP
// =========================

export default function App() {

  return (

    <AuthProvider>

      <AnimalsProvider>

        <TasksProvider>

          <Routes />

        </TasksProvider>

      </AnimalsProvider>

    </AuthProvider>
  );
}