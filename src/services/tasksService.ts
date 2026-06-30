import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_CONFIG } from "../config/api";

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.TASKS}`;

export async function getTasks() {
  const token = await AsyncStorage.getItem("token");

  console.log("[getTasks] Token:", token ? "✓ present" : "✗ missing");
  console.log("[getTasks] URL:", API_URL);

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("[getTasks] Status:", response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("[getTasks] Error response:", errorText);
    throw new Error("Error obteniendo tareas");
  }

  return response.json();
}

// =========================
// CREATE
// =========================

export async function createTask(task: any) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error("Error creando tarea");
  }

  return response.json();
}

// =========================
// UPDATE STATUS
// =========================

export async function updateTaskStatus(id: string, status: number) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    throw new Error("Error actualizando tarea");
  }

  return response.json();
}

// =========================
// DELETE
// =========================

export async function deleteTask(id: string) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error eliminando tarea");
  }

  return response.json();
}
