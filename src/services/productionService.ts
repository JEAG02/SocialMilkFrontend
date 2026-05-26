import AsyncStorage
from "@react-native-async-storage/async-storage";

const API_URL =
  "http://192.168.153.77:5264/api/v1/production";

// =========================
// GET ALL
// =========================

export async function getProductions(
  profileId: string
) {

  const response = await fetch(
    `${API_URL}?profileId=${profileId}`
  );

  if (!response.ok) {
    throw new Error(
      "Error obteniendo producciones"
    );
  }

  return response.json();
}

// =========================
// CREATE
// =========================

export async function createProduction(
  production: any
) {

  const response = await fetch(
    API_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        production
      ),
    }
  );

  if (!response.ok) {

    const error =
      await response.text();

    console.log(error);

    throw new Error(
      "Error creando producción"
    );
  }

  return response.json();
}

// =========================
// UPDATE PRODUCTION
// =========================

export async function updateProduction(
  id: string,
  production: any
) {

  const response =
    await fetch(
      `${API_URL}/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          production
        ),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Error actualizando producción"
    );
  }

  return response.json();
}
// =========================
// GET BY ID
// =========================

export async function getProductionById(
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
      "Error obteniendo producción"
    );
  }

  return response.json();
}
// =========================
// DELETE
// =========================

export async function deleteProduction(
  id: string
) {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Error eliminando producción"
    );
  }

  return response.json();
}

// =========================
// SUMMARY
// =========================

export async function getProductionSummary(
  profileId: string
) {

  const response = await fetch(
    `${API_URL}/summary?profileId=${profileId}`
  );

  if (!response.ok) {
    throw new Error(
      "Error obteniendo resumen"
    );
  }

  return response.json();
}