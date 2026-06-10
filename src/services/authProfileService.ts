import AsyncStorage
from "@react-native-async-storage/async-storage";

import {
  API_CONFIG
} from "../config/api";

const API_URL =
  `${API_CONFIG.BASE_URL}${API_CONFIG.PROFILES}`;

export async function getMyProfile() {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response =
    await fetch(
      `${API_CONFIG.BASE_URL}/auth/profiles/me`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  if (!response.ok) {

    throw new Error(
      "Error obteniendo perfil"
    );
  }

  return response.json();
}