import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_CONFIG } from "../config/api";

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.AI}`;

// =========================
// CREATE INTERACTION
// =========================

export async function createAiInteraction(ownerId: string, inputText: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      ownerId,
      inputText,
    }),
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error creando interacción");
  }

  return response.json();
}

// =========================
// GET INTERACTIONS
// =========================

export async function getAiInteractions() {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo interacciones");
  }

  return response.json();
}

// =========================
// GET INTERACTION BY ID
// =========================

export async function getAiInteractionById(interactionId: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${interactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo interacción");
  }

  return response.json();
}
