import AsyncStorage
from "@react-native-async-storage/async-storage";

import {
  API_CONFIG,
} from "../config/api";

const API_URL =
  `${API_CONFIG.BASE_URL}${API_CONFIG.ANIMALS}`;

// ======================================
// CREATE
// ======================================

export async function createHealthRecord(
  animalId: string,
  record: any
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-records`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(record),
    }
  );

  if (!response.ok) {

    const error =
      await response.text();

    console.log(error);

    throw new Error(
      "Error creando registro"
    );
  }

  return response.json();
}

// ======================================
// GET ALL
// ======================================

export async function getHealthRecords(
  animalId: string
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-records`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error obteniendo registros"
    );
  }

  return response.json();
}

// ======================================
// GET BY ID
// ======================================

export async function getHealthRecordById(
  animalId: string,
  recordId: string
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-records/${recordId}`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error obteniendo registro"
    );
  }

  return response.json();
}

// ======================================
// UPDATE
// ======================================

export async function updateHealthRecord(
  animalId: string,
  recordId: string,
  record: any
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-records/${recordId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(record),
    }
  );

  if (!response.ok) {

    const error =
      await response.text();

    console.log(error);

    throw new Error(
      "Error actualizando registro"
    );
  }

  return response.json();
}

// ======================================
// DELETE
// ======================================

export async function deleteHealthRecord(
  animalId: string,
  recordId: string
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-records/${recordId}`,
    {
      method: "DELETE",

      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    const error =
      await response.text();

    console.log(error);

    throw new Error(
      "Error eliminando registro"
    );
  }

  return response.json();
}

// =========================
// HEALTH EVENTS
// =========================

export async function getHealthEvents(
  animalId: string
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-events`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error obteniendo eventos"
    );
  }

  return response.json();
}

export async function getHealthEventById(
  animalId: string,
  eventId: string
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-events/${eventId}`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error obteniendo evento"
    );
  }

  return response.json();
}

export async function createHealthEvent(
  animalId: string,
  event: any
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-events`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(event),
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error creando evento"
    );
  }

  return response.json();
}

export async function updateHealthEvent(
  animalId: string,
  eventId: string,
  event: any
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-events/${eventId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(event),
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error actualizando evento"
    );
  }

  return response.json();
}

export async function deleteHealthEvent(
  animalId: string,
  eventId: string
) {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/${animalId}/health-events/${eventId}`,
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
      "Error eliminando evento"
    );
  }

  return response.json();
}

export async function getUpcomingHealthEvents() {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response = await fetch(
    `${API_URL}/health-events/upcoming`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    throw new Error(
      "Error obteniendo próximos eventos"
    );
  }

  return response.json();
}