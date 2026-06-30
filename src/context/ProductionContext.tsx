import { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "./AuthContext";

import {
  getProductions,
  createProduction as createProductionService,
  deleteProduction as deleteProductionService,
} from "../services/productionService";

// =========================
// TYPES
// =========================

export interface Production {
  productionId: string;

  animalId: string;

  milkVolumeLiters: number;

  productionDate: string;

  shift: string;

  notes?: string;
}

interface ProductionContextData {
  productions: Production[];

  loading: boolean;

  loadProductions: () => Promise<void>;

  createProduction: (production: any) => Promise<void>;

  deleteProduction: (id: string) => Promise<void>;
}

const ProductionContext = createContext({} as ProductionContextData);

export function ProductionProvider({ children }: any) {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [productions, setProductions] = useState<Production[]>([]);

  const [loading, setLoading] = useState(false);

  // =========================
  // LOAD
  // =========================

  const loadProductions = async () => {
    try {
      setLoading(true);

      const data = await getProductions();

      setProductions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      loadProductions();
    }
  }, [authLoading, isAuthenticated]);

  // =========================
  // CREATE
  // =========================

  const createProduction = async (production: any) => {
    try {
      await createProductionService({
        animalId: production.animalId,

        productionDate: new Date().toISOString(),

        milkVolumeLiters: Number(production.liters),

        shift: production.shift,
      });

      await loadProductions();
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  // =========================
  // DELETE
  // =========================

  const deleteProduction = async (id: string) => {
    try {
      await deleteProductionService(id);

      await loadProductions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductionContext.Provider
      value={{
        productions,

        loading,

        loadProductions,

        createProduction,

        deleteProduction,
      }}
    >
      {children}
    </ProductionContext.Provider>
  );
}

export function useProduction() {
  return useContext(ProductionContext);
}
