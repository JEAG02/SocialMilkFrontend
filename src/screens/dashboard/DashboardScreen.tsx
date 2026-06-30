import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useEffect, useState } from "react";

import { getAnimals } from "../../services/animalsService";

import { getProductions } from "../../services/productionService";

import { getSales } from "../../services/salesService";

import { getMyProfile } from "../../services/authProfileService";

import { getMilkBalance } from "../../services/milkInventoryService";

export default function DashboardScreen({ navigation }: any) {
  const [animalsCount, setAnimalsCount] = useState(0);

  const [productionsCount, setProductionsCount] = useState(0);

  const [salesCount, setSalesCount] = useState(0);

  const [availableMilk, setAvailableMilk] = useState(0);

  const [userName, setUserName] = useState("");

  const [totalMilkProduced, setTotalMilkProduced] = useState(0);

  const [totalSalesAmount, setTotalSalesAmount] = useState(0);

  const [lastProduction, setLastProduction] = useState<any>(null);

  const [lastSale, setLastSale] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [animals, productions, sales, milk, profile] = await Promise.all([
        getAnimals(),
        getProductions(),
        getSales(),
        getMilkBalance(),
        getMyProfile(),
      ]);

      setUserName(profile.fullName);

      setAnimalsCount(animals?.length || 0);

      setProductionsCount(productions?.length || 0);

      setSalesCount(sales?.length || 0);

      setAvailableMilk(milk?.availableLiters || 0);

      const milkProduced =
        productions?.reduce(
          (total: number, production: any) =>
            total + Number(production.milkVolumeLiters || 0),
          0,
        ) || 0;

      setTotalMilkProduced(milkProduced);

      const salesAmount =
        sales?.reduce(
          (total: number, sale: any) => total + Number(sale.totalAmount || 0),
          0,
        ) || 0;

      setTotalSalesAmount(salesAmount);

      if (productions.length > 0) {
        const latestProduction = [...productions].sort(
          (a, b) =>
            new Date(b.productionDate).getTime() -
            new Date(a.productionDate).getTime(),
        )[0];

        setLastProduction(latestProduction);
      }

      if (sales.length > 0) {
        const latestSale = [...sales].sort(
          (a, b) =>
            new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime(),
        )[0];

        setLastSale(latestSale);
      }
    } catch (error) {
      console.log("Error dashboard", error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}

      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <View>
            <Text style={styles.greeting}>Hola {userName}</Text>

            <Text style={styles.farmTitle}>Tu finca hoy</Text>
          </View>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="stats-chart" size={28} color="#fff" />
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.kpiCard}>
          <Ionicons name="paw" size={28} color="#d97706" />

          <Text style={styles.kpiValue}>{animalsCount}</Text>

          <Text style={styles.kpiLabel}>Animales</Text>
        </View>

        <View style={styles.kpiCard}>
          <Ionicons name="flask" size={28} color="#16a34a" />

          <Text style={styles.kpiValue}>{totalMilkProduced}</Text>

          <Text style={styles.kpiLabel}>Litros producidos</Text>
        </View>

        <View style={styles.kpiCard}>
          <Ionicons name="cash" size={28} color="#3b82f6" />

          <Text style={styles.kpiValue}>
            ${totalSalesAmount.toLocaleString()}
          </Text>

          <Text style={styles.kpiLabel}>Ventas</Text>
        </View>
        <View style={styles.kpiCard}>
          <Ionicons name="water" size={28} color="#06b6d4" />

          <Text style={styles.kpiValue}>{availableMilk}</Text>

          <Text style={styles.kpiLabel}>Inventario</Text>
        </View>
      </View>
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Accesos rápidos</Text>

        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("Animals")}
          >
            <Ionicons name="paw" size={30} color="#d97706" />
            <Text>Animales</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("Production")}
          >
            <Ionicons name="flask" size={30} color="#16a34a" />
            <Text>Producción</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("Sales")}
          >
            <Ionicons name="cash" size={30} color="#3b82f6" />
            <Text>Ventas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("MilkInventory")}
          >
            <Ionicons name="water" size={30} color="#06b6d4" />
            <Text>Inventario</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.activityCard}>
        <Text style={styles.analyticsTitle}>Actividad reciente</Text>

        {lastProduction && (
          <View style={styles.activityItem}>
            <Ionicons name="flask" size={24} color="#16a34a" />

            <Text style={styles.activityText}>
              Última producción: {lastProduction.milkVolumeLiters}L
            </Text>
          </View>
        )}

        {lastSale && (
          <View style={styles.activityItem}>
            <Ionicons name="cash" size={24} color="#3b82f6" />

            <Text style={styles.activityText}>
              Última venta: ${lastSale.totalAmount}
            </Text>
          </View>
        )}
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  header: {
    backgroundColor: "#14b8a6",

    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 40,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor: "rgba(255,255,255,0.92)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: 15,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 6,
  },

  headerIcon: {
    width: 60,
    height: 60,

    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.12)",

    justifyContent: "center",
    alignItems: "center",
  },

  progressCard: {
    backgroundColor: "#fff",

    margin: 22,
    padding: 26,

    borderRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,

    elevation: 4,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 24,
  },

  progressWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  outerCircle: {
    width: 220,
    height: 220,

    borderRadius: 110,

    borderWidth: 18,
    borderColor: "#16a34a",

    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    color: "#ccfbf1",
    fontSize: 15,
    fontWeight: "600",
  },

  farmTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 4,
  },

  innerCircle: {
    width: 160,
    height: 160,

    borderRadius: 80,

    backgroundColor: "#f8fafc",

    justifyContent: "center",
    alignItems: "center",
  },

  progressValue: {
    fontSize: 42,
    fontWeight: "900",
    color: "#111827",
  },

  progressLabel: {
    color: "#64748b",
    marginTop: 6,
    fontWeight: "700",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    paddingHorizontal: 22,
  },

  kpiCard: {
    width: "48%",

    backgroundColor: "#fff",

    borderRadius: 28,

    padding: 22,

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  kpiIcon: {
    width: 56,
    height: 56,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 16,
  },

  kpiValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },

  kpiLabel: {
    color: "#64748b",
    marginTop: 6,
    fontWeight: "700",
  },

  analyticsCard: {
    backgroundColor: "#fff",

    marginHorizontal: 22,
    marginTop: 6,

    borderRadius: 30,

    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  analyticsTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 24,
    color: "#111827",
  },

  barsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",

    height: 180,
  },

  barItem: {
    alignItems: "center",
  },

  bar: {
    width: 42,

    borderRadius: 16,
  },

  barLabel: {
    marginTop: 10,
    color: "#64748b",
    fontWeight: "700",
  },

  activityCard: {
    backgroundColor: "#fff",

    marginHorizontal: 22,
    marginTop: 18,

    borderRadius: 30,

    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  activityItem: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 22,
  },

  activityText: {
    marginLeft: 14,
    color: "#334155",
    fontWeight: "600",
    flex: 1,
    lineHeight: 22,
  },
  inventoryCard: {
    backgroundColor: "#fff",

    margin: 22,

    borderRadius: 30,

    padding: 28,

    alignItems: "center",
  },

  inventoryValue: {
    fontSize: 42,

    fontWeight: "900",

    marginTop: 10,

    color: "#111827",
  },

  inventoryLabel: {
    marginTop: 8,

    color: "#64748b",

    fontWeight: "700",
  },

  quickActions: {
    marginHorizontal: 22,

    marginTop: 10,
  },

  quickGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",
  },

  quickCard: {
    width: "48%",

    backgroundColor: "#fff",

    borderRadius: 24,

    padding: 22,

    alignItems: "center",

    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 22,

    fontWeight: "900",

    marginBottom: 16,
  },
});
