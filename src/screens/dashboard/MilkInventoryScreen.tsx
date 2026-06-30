import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
  getMilkBalance,
  getMilkMovements,
} from "../../services/milkInventoryService";

export default function MilkInventoryScreen({ navigation }: any) {
  const [balance, setBalance] = useState<any>(null);

  const [movements, setMovements] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const loadInventory = async () => {
    try {
      const [balanceData, movementsData] = await Promise.all([
        getMilkBalance(),
        getMilkMovements(),
      ]);

      setBalance(balanceData);

      setMovements(movementsData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Volver atrás</Text>
      </View>

      <View style={styles.balanceCard}>
        <Ionicons name="water" size={42} color="#fff" />

        <Text style={styles.balanceValue}>
          {balance?.availableLiters ?? 0} L
        </Text>

        <Text style={styles.balanceLabel}>Inventario Disponible</Text>
      </View>

      <Text style={styles.sectionTitle}>Movimientos</Text>

      {movements.map((movement) => {
        const isEntry = movement.movementType === "IN";

        const movementLabel =
          movement.movementType === "IN"
            ? "ENTRADA"
            : movement.movementType === "OUT"
              ? "SALIDA"
              : movement.movementType;

        return (
          <View key={movement.inventoryMovementId} style={styles.movementCard}>
            <Ionicons
              name={isEntry ? "arrow-up-circle" : "arrow-down-circle"}
              size={28}
              color={isEntry ? "#16a34a" : "#ef4444"}
            />

            <View
              style={{
                flex: 1,
                marginLeft: 12,
              }}
            >
              <Text style={styles.movementTitle}>{movementLabel}</Text>

              <Text style={styles.movementDate}>
                {new Date(movement.movementDate).toLocaleDateString()}
              </Text>
            </View>

            <Text
              style={{
                fontWeight: "800",
                fontSize: 16,
              }}
            >
              {movement.milkVolumeLiters} L
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  balanceCard: {
    backgroundColor: "#3b82f6",

    margin: 20,

    borderRadius: 24,

    padding: 30,

    alignItems: "center",
  },

  balanceValue: {
    color: "#fff",

    fontSize: 38,

    fontWeight: "900",

    marginTop: 10,
  },

  balanceLabel: {
    color: "#dbeafe",

    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 22,

    fontWeight: "900",

    marginHorizontal: 20,

    marginBottom: 16,
  },

  movementCard: {
    backgroundColor: "#fff",

    marginHorizontal: 20,

    marginBottom: 12,

    padding: 18,

    borderRadius: 18,

    flexDirection: "row",

    alignItems: "center",
  },

  movementTitle: {
    fontWeight: "800",
  },

  movementDate: {
    color: "#64748b",
    marginTop: 4,
  },
  backButton: {
    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor: "#3b82f6",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },
  header: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 20,

    paddingTop: 60,

    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 24,

    fontWeight: "900",

    color: "#111827",

    marginLeft: 16,
  },
});
