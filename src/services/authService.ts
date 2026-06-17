import {
  API_CONFIG
} from "../config/api";

const API_URL =
  `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH}`;

// =========================
// LOGIN
// =========================

export async function login(
  identifier: string,
  password: string
) {

  const isPhone =
    /^[0-9]+$/.test(
      identifier.trim()
    );

  console.log(
  "URL LOGIN:",
  `${API_URL}/login`
);

const response =
  await fetch(
      `${API_URL}/login`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          email:
            isPhone
              ? null
              : identifier,

          phone:
            isPhone
              ? identifier
              : null,

          password,
        }),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Credenciales inválidas"
    );
  }

  return response.json();
}

// =========================
// REGISTER
// =========================

export async function register(
  email: string,
  password: string,
  phone: string,
  fullName: string,
  locationName: string
) {

  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
        phone,
        fullName,
        locationName,
      }),
    }
  );

  if (!response.ok) {

    const error =
      await response.text();

    console.log(error);

    throw new Error(
      "Error al registrar"
    );
  }

  return response.json();
}