import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_CONFIG } from "../config/api";

export async function updateProfileImage(imageUrl: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(
    `${API_CONFIG.BASE_URL}/profiles/profile-image`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profileImageUrl: imageUrl,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Error actualizando imagen");
  }

  return response.json();
}
