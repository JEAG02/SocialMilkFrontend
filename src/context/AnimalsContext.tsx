import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import {
  getAnimals,
} from "../services/animalsService";

export interface Animal {

  animalId: string;

  ownerId: string;

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

  const [animals, setAnimals] =
    useState<Animal[]>([]);

  const [loading, setLoading] =
    useState(false);

  const loadAnimals =
    async () => {

    try {

      setLoading(true);

      const profileId =
        await AsyncStorage.getItem(
          "profileId"
        );

      if (!profileId) return;

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

    loadAnimals();

  }, []);

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