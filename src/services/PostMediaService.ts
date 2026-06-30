import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_CONFIG } from "../config/api";

export async function uploadPostMedia(postId: string, imageUri: string) {
  const token = await AsyncStorage.getItem("token");

  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    name: "post-image.jpg",
    type: "image/jpeg",
  } as any);

  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.POST_MEDIA.replace("{postId}", postId)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Error subiendo imagen");
  }

  return response.json();
}

export async function getPostMedia(postId: string) {
  const token = await AsyncStorage.getItem("token");

  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.GET_POST_MEDIA.replace("{postId}", postId)}`;

  console.log("MEDIA URL:", url);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("MEDIA STATUS:", response.status);

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  console.log("MEDIA DATA:", JSON.stringify(data));

  return data;
}
