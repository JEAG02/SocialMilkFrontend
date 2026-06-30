import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_CONFIG } from "../config/api";

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.POSTS}`;

// =========================
// GET FEED
// =========================

export async function getFeed() {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}?page=1&pageSize=20`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error obteniendo feed");
  }

  const data = await response.json();

  console.log("FEED RESPONSE:");

  console.log(data);

  // SI EL BACKEND DEVUELVE:
  // { items: [...] }

  if (Array.isArray(data.items)) {
    return data.items;
  }

  // SI DEVUELVE:
  // { data: [...] }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  // SI YA ES ARRAY

  if (Array.isArray(data)) {
    return data;
  }

  return [];
}

// =========================
// CREATE POST
// =========================

export async function createPost(content: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error creando post");
  }

  return response.json();
}

// =========================
// UPDATE POST
// =========================

export async function updatePost(postId: string, content: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${postId}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("Error actualizando post");
  }

  return response.json();
}

// =========================
// DELETE POST
// =========================

export async function deletePost(postId: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${postId}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error eliminando post");
  }

  return true;
}

// =========================
// POSTS BY PROFILE
// =========================

export async function getPostsByProfile(profileId: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(
    `http://192.168.38.77:5264/api/v1/profiles/${profileId}/posts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error obteniendo posts del perfil");
  }

  const data = await response.json();

  return data.data || data;
}
// =========================
// GET POST BY ID
// =========================

export async function getPostById(postId: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo publicación");
  }

  return response.json();
}
// =========================
// LIKE POST
// =========================

export async function likePost(postId: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${postId}/likes`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error dando like");
  }

  try {
    return await response.json();
  } catch {
    return true;
  }
}

// =========================
// DISLIKE POST
// =========================

export async function dislikePost(postId: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${postId}/likes`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error quitando like");
  }

  return true;
}

// =========================
// GET LIKES
// =========================

export async function getLikes(postId: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${postId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error obteniendo likes");
  }

  const data = await response.json();

  console.log("LIKES RESPONSE:");

  console.log(data);

  return data;
}
