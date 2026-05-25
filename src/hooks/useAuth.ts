import { useState } from "react";
import { login as loginService } from "../services/authService";
import { getToken, removeToken } from "../store/authStore";

export const useAuthService = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      return await loginService(email, password);
    } finally {
      setLoading(false);
    }
  };

  const checkSession = async () => {
    const token = await getToken();
    return !!token;
  };

  const logout = async () => {
    await removeToken();
  };

  return { login, loading, checkSession, logout };
  
};
