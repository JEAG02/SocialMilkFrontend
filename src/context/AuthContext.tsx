import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage
from "@react-native-async-storage/async-storage";

const AuthContext =
  createContext<any>(null);

export function AuthProvider({
  children,
}: any) {

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  // =========================
  // RESTORE SESSION
  // =========================

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession =
    async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      const storedUser =
        await AsyncStorage.getItem(
          "user"
        );

      if (token) {

        setIsAuthenticated(true);

        if (storedUser) {

          setUser(
            JSON.parse(
              storedUser
            )
          );
        }
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // LOGIN
  // =========================

  const login = async (
    data: any
  ) => {

    console.log(
      "LOGIN RESPONSE:"
    );

    console.log(data);

    // TOKEN

    const token =
      data.token ||
      data.accessToken ||
      data.jwt;

    if (!token) {

      throw new Error(
        "El backend no devolvió token"
      );
    }

    // PROFILE ID

    // (no longer needed - JWT handles auth)

    // SAVE TOKEN

    await AsyncStorage.setItem(
      "token",
      token
    );

    console.log(
      "[AuthContext] Token saved:",
      token.substring(0, 20) + "..."
    );

    // USER DATA

    const userData = {

      email:
        data.email ||
        "",

      fullName:
        data.fullName ||
        "",
    };

    // SAVE USER

    await AsyncStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    setIsAuthenticated(true);

    console.log(
      "AUTH:",
      true
    );
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = async () => {

    await AsyncStorage.removeItem(
      "token"
    );

    await AsyncStorage.removeItem(
      "user"
    );

    setUser(null);

    setIsAuthenticated(false);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);