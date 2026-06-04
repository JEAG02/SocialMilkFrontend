import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import { useAuth } from "./AuthContext";

import {
  getAnimals,
} from "../services/animalsService";

export interface Animal {

  animalId: string;

  animalName: string;

  breed?: string;
}

interface AnimalsContextData {

  animals: Animal[];

  loading: boolean;

  loadAnimals: () => Promise<void>;
}

const AnimalsContext =
  createContext(
    {} as AnimalsContextData
  );

export function AnimalsProvider({
  children,
}: any) {

  const { isAuthenticated, loading: authLoading } = useAuth();

  const [animals, setAnimals] =
    useState<Animal[]>([]);

  const [loading, setLoading] =
    useState(false);

  const loadAnimals =
    async () => {

    try {

      setLoading(true);

      const data =
        await getAnimals();

      setAnimals(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    if (!authLoading && isAuthenticated) {
      loadAnimals();
    }

  }, [authLoading, isAuthenticated]);

  return (

    <AnimalsContext.Provider
      value={{
        animals,
        loading,
        loadAnimals,
      }}
    >

      {children}

    </AnimalsContext.Provider>
  );
}

export function useAnimals() {

  return useContext(
    AnimalsContext
  );
}