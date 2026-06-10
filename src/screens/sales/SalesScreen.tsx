import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import {
  useEffect,
  useState,
  useCallback,
} from "react";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  useFocusEffect,
} from "@react-navigation/native";

import { API_CONFIG } from "../../config/api";

const API_URL =
  `${API_CONFIG.BASE_URL}${API_CONFIG.SALES}`;

export default function SalesScreen({
  navigation,
}: any) {

  const [client, setClient]
    = useState("");

  const [amount, setAmount]
    = useState("");

  const [liters, setLiters]
    = useState("");

  const [sales, setSales]
    = useState<any[]>([]);

  const [period, setPeriod]
    = useState("daily");

  const [summary, setSummary]
    = useState<any[]>([]);

  const [loading, setLoading]
    = useState(false);

  // =========================
  // LOAD SALES
  // =========================

  const loadSales =
    async () => {

    try {

      setLoading(true);

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
          "Error cargando ventas"
        );
      }

      const data =
        await response.json();

      setSales(data);

      // 🔥 cargar summary automáticamente
      if (data.length > 0) {

        loadSummary(
          data[0].buyerName,
        );
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // LOAD SUMMARY
  // =========================

  const loadSummary =
    async (
      buyerName: string
    ) => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          `${API_URL}/summary?period=${period}&buyerName=${buyerName}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {

        throw new Error(
          "Error cargando resumen"
        );
      }

      const data =
        await response.json();

      console.log(
        "SUMMARY DATA:",
        data
      );

      setSummary(data);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // LOAD AUTOMÁTICO
  // =========================

  useEffect(() => {

    loadSales();

  }, []);

  // =========================
  // RECARGAR SUMMARY
  // =========================

  useEffect(() => {

    if (sales.length > 0) {

      loadSummary(
        sales[0].buyerName
      );
    }

  }, [period]);

  // =========================
  // REFRESH AL VOLVER
  // =========================

  useFocusEffect(
    useCallback(() => {

      loadSales();

    }, [])
  );

  // =========================
  // CREATE SALE
  // =========================

  const handleCreate =
    async () => {

    try {

      if (
        !client ||
        !amount ||
        !liters
      ) {

        Alert.alert(
          "Error",
          "Completa todos los campos"
        );

        return;
      }

      setLoading(true);

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({

              saleDate:
                new Date().toISOString(),

              totalLitersSold:
                Number(liters),

              totalAmount:
                Number(amount),

              buyerName:
                client,
            }),
          }
        );

      if (!response.ok) {

        const error =
          await response.text();

        console.log(error);

        throw new Error(
          "Error creando venta"
        );
      }

      Alert.alert(
        "Éxito",
        "Venta registrada"
      );

      setClient("");
      setAmount("");
      setLiters("");

      // 🔥 actualización inmediata
      await loadSales();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo registrar"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

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
            onPress={() =>
              navigation.goBack()
            }
            style={styles.backButton}
          >

            <Ionicons
              name="arrow-back"
              size={24}
              color="#111827"
            />

          </TouchableOpacity>

          <View>

            <Text style={styles.subtitle}>
              Registro comercial
            </Text>

            <Text style={styles.title}>
              Ventas
            </Text>

          </View>

        </View>

        <View style={styles.headerIcon}>

          <Ionicons
            name="cash-outline"
            size={28}
            color="#fff"
          />

        </View>

      </View>

      {/* FORM */}

      <View style={styles.formCard}>

        <Text style={styles.sectionTitle}>
          Nueva Venta
        </Text>

        <Text style={styles.label}>
          Cliente
        </Text>

        <TextInput
          placeholder="Nombre del cliente"
          placeholderTextColor="#94a3b8"
          value={client}
          onChangeText={setClient}
          style={styles.input}
        />

        <Text style={styles.label}>
          Valor de venta
        </Text>

        <TextInput
          placeholder="Ej: 450000"
          placeholderTextColor="#94a3b8"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>
          Litros vendidos
        </Text>

        <TextInput
          placeholder="Ej: 420"
          placeholderTextColor="#94a3b8"
          value={liters}
          onChangeText={setLiters}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleCreate}
          disabled={loading}
        >

          <Ionicons
            name="save-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            {
              loading
                ? "Guardando..."
                : "Guardar venta"
            }
          </Text>

        </TouchableOpacity>

      </View>

      {/* SUMMARY */}

      <View style={styles.summaryCard}>

        <Text style={styles.historyTitle}>
          Resumen de Ventas
        </Text>

        {/* PERIODOS */}

        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
          }}
        >

          {[
            "daily",
            "weekly",
            "monthly",
          ].map((item) => (

            <TouchableOpacity
              key={item}
              onPress={() =>
                setPeriod(item)
              }
              style={[
                styles.periodButton,

                period === item && {
                  backgroundColor:
                    "#16a34a",
                },
              ]}
            >

              <Text
                style={{
                  color:
                    period === item
                      ? "#fff"
                      : "#16a34a",

                  fontWeight: "800",
                }}
              >
                {item}
              </Text>

            </TouchableOpacity>
          ))}

        </View>

        {/* DATA */}

        {summary.length > 0 ? (

          summary.map((item: any) => (

            <View
              key={item.saleId}
              style={{
                marginBottom: 16,
                paddingBottom: 14,
                borderBottomWidth: 1,
                borderBottomColor: "#e2e8f0",
              }}
            >

              <Text style={styles.summaryText}>
                Cliente:
                {" "}
                {item.buyerName}
              </Text>

              <Text style={styles.summaryText}>
                Litros:
                {" "}
                {item.totalLitersSold} L
              </Text>

              <Text style={styles.summaryText}>
                Total:
                {" "}
                ${item.totalAmount}
              </Text>

            </View>
          ))

        ) : (

          <Text
            style={{
              color: "#64748b",
              fontWeight: "600",
            }}
          >
            No hay ventas en este período
          </Text>
        )}

      </View>

      {/* HISTORIAL */}

      <View style={styles.historyContainer}>

        <Text style={styles.historyTitle}>
          Ventas recientes
        </Text>

        {sales.map((item) => (

          <TouchableOpacity
            key={item.saleId}
            style={styles.saleCard}
            onPress={() =>
              navigation.navigate(
                "SaleDetail",
                {
                  saleId:
                    item.saleId,
                }
              )
            }
          >

            <View style={styles.saleIcon}>

              <Ionicons
                name="wallet-outline"
                size={26}
                color="#16a34a"
              />

            </View>

            <View style={{ flex: 1 }}>

              <Text style={styles.saleAmount}>
                ${item.totalAmount}
              </Text>

              <Text style={styles.saleClient}>
                {item.buyerName}
              </Text>

              <Text style={styles.saleLiters}>
                {
                  item.totalLitersSold
                } L
              </Text>

            </View>

          </TouchableOpacity>
        ))}

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

    backgroundColor: "#16a34a",

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

    backgroundColor:
      "rgba(255,255,255,0.92)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  subtitle: {
    color: "#dcfce7",
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

    backgroundColor:
      "rgba(255,255,255,0.18)",

    justifyContent: "center",
    alignItems: "center",
  },

  formCard: {

    backgroundColor: "#fff",

    margin: 22,
    padding: 24,

    borderRadius: 28,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,

    elevation: 4,
  },

  summaryCard: {

    backgroundColor: "#fff",

    marginHorizontal: 22,
    marginBottom: 22,

    padding: 24,

    borderRadius: 28,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 24,
    color: "#111827",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
  },

  input: {

    backgroundColor: "#f8fafc",

    borderRadius: 18,

    paddingHorizontal: 18,
    paddingVertical: 16,

    marginBottom: 20,

    fontSize: 15,

    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  saveButton: {

    backgroundColor: "#16a34a",

    paddingVertical: 18,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 10,
  },

  historyContainer: {
    paddingHorizontal: 22,
  },

  historyTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 18,
    color: "#111827",
  },

  saleCard: {

    backgroundColor: "#fff",

    borderRadius: 24,

    padding: 20,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  saleIcon: {

    width: 58,
    height: 58,

    borderRadius: 18,

    backgroundColor: "#dcfce7",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  saleAmount: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },

  saleClient: {
    marginTop: 4,
    color: "#475569",
    fontWeight: "700",
  },

  saleLiters: {
    marginTop: 2,
    color: "#16a34a",
    fontWeight: "700",
  },

  periodButton: {

    borderWidth: 2,
    borderColor: "#16a34a",

    paddingVertical: 10,
    paddingHorizontal: 16,

    borderRadius: 14,

    marginRight: 10,
  },

  summaryText: {

    fontSize: 16,

    fontWeight: "700",

    color: "#334155",

    marginBottom: 10,
  },
});