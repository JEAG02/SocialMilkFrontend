import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_CONFIG } from "../config/api";

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.PROFILES}`;

export async function getMyProfile() {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_CONFIG.BASE_URL}/auth/profiles/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo perfil");
  }

  return response.json();
}
export async function updateMyProfile(profileData: any) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_CONFIG.BASE_URL}/auth/profiles/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Error actualizando perfil");
  }

  return response.json();
}

export async function deleteProfileAvatar() {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.DELETE_PERFIL_MEDIA}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error eliminando foto");
  }

  return response.json();
}
