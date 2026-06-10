import AsyncStorage
from "@react-native-async-storage/async-storage";

import {
  API_CONFIG
} from "../config/api";

const API_URL =
  `${API_CONFIG.BASE_URL}${API_CONFIG.SALES}`;


  export const getSales =
  async () => {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response =
    await fetch(
      API_URL,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  if (!response.ok) {

    throw new Error(
      "Error obteniendo ventas"
    );
  }

  return await response.json();
};
export const updateSale =
  async (
    saleId: string,
    data: any
  ) => {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    const response =
      await fetch(
        `${API_URL}/${saleId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(data),
        }
      );

    if (!response.ok) {

      throw new Error(
        "Error updating sale"
      );
    }

    return await response.json();
};
export const deleteSale =
  async (saleId: string) => {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response =
    await fetch(
      `${API_URL}/${saleId}`,
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
      "Error eliminando venta"
    );
  }

  return true;
};