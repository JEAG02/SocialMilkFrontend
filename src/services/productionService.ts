import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_CONFIG } from "../config/api";

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCTION}`;

// =========================
// GET ALL
// =========================

export async function getProductions() {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo producciones");
  }

  return response.json();
}

// =========================
// CREATE
// =========================

export async function createProduction(production: any) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(production),
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error creando producción");
  }

  return response.json();
}

// =========================
// UPDATE PRODUCTION
// =========================

export async function updateProduction(id: string, production: any) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(production),
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error actualizando producción");
  }

  return response.json();
}

// =========================
// GET BY ID
// =========================

export async function getProductionById(id: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo producción");
  }

  return response.json();
}

// =========================
// DELETE
// =========================

export async function deleteProduction(productionId: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${productionId}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error eliminando producción");
  }

  return true;
}

// =========================
// SUMMARY
// =========================

export async function getProductionSummary(animalId: string, period: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/summary?animalId=${animalId}&period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error obteniendo resumen");
  }

  return response.json();
}
