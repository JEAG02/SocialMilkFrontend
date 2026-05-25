import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // cambia luego
    timeout: 5000,
});

api.interceptors.request.use((config) => {
  // aquí luego metemos el token
return config;
});