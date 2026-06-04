import AsyncStorage
from "@react-native-async-storage/async-storage";
import {
  API_CONFIG
} from "../config/api";

const API_URL =
  `${API_CONFIG.BASE_URL}${API_CONFIG.ANIMALS}`;

// =========================
// GET ALL
// =========================

export async function getAnimals() {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  console.log("[getAnimals] Token:", token ? "✓ present" : "✗ missing");
  console.log("[getAnimals] URL:", API_URL);

  const response = await fetch(
    API_URL,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  console.log("[getAnimals] Status:", response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("[getAnimals] Error response:", errorText);
    throw new Error(
      "Error obteniendo animales"
    );
  }

  return response.json();
}

// =========================
// GET BY ID
// =========================

export async function getAnimalById(
  id: string
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error obteniendo animal"
    );
  }

  return response.json();
}

// =========================
// CREATE
// =========================

export async function createAnimal(
  animal: any
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    API_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(animal),
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error creando animal"
    );
  }

  return response.json();
}

// =========================
// UPDATE
// =========================

export async function updateAnimal(
  id: string,
  animal: any
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(animal),
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error actualizando animal"
    );
  }

  return response.json();
}

// =========================
// DELETE
// =========================

export async function deleteAnimal(
  id: string
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error eliminando animal"
    );
  }

  return response.json();
}