import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_CONFIG } from "../config/api";

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.INVENTORY}`;

export async function getMilkBalance() {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(`${API_URL}/balance`);
  console.log(response.status);

  if (!response.ok) {
    throw new Error("Error obteniendo balance");
  }

  return response.json();
}

export async function getMilkMovements() {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/movements`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo movimientos");
  }

  return response.json();
}
