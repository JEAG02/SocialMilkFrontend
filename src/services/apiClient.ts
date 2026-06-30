import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { triggerLogout } from "./authEvents";

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // Token expirado
  if (response.status === 401) {
    await AsyncStorage.multiRemove(["token", "user"]);

    triggerLogout();

    Alert.alert("Sesión expirada", "Debes iniciar sesión nuevamente.");

    throw new Error("SESSION_EXPIRED");
  }

  return response;
}
