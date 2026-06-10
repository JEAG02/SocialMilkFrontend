import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import Ionicons
from "@expo/vector-icons/Ionicons";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import {
  deleteSale,
} from "../../services/salesService";

import { API_CONFIG } from "../../config/api";

const API_URL =
  `${API_CONFIG.BASE_URL}${API_CONFIG.SALES}`;

export default function
SaleDetailScreen({
  route,
  navigation,
}: any) {

  const {
    saleId,
  } = route.params;

  const [sale, setSale]
    = useState<any>(null);

  const [loading, setLoading]
    = useState(true);

  // =========================
  // LOAD DETAIL
  // =========================

  const loadSale =
    async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          `${API_URL}/${saleId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {

        throw new Error(
          "Error cargando venta"
        );
      }

      const data =
        await response.json();

      setSale(data);

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo cargar"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    loadSale();

  }, []);

  // =========================
  // DELETE
  // =========================

const handleDelete =
  async () => {

  Alert.alert(
    "Eliminar",
    "¿Deseas eliminar esta venta?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },

      {
        text: "Eliminar",

        style: "destructive",

        onPress: async () => {

          try {

            await deleteSale(
              saleId
            );

            Alert.alert(
              "Éxito",
              "Venta eliminada"
            );

            navigation.goBack();

          } catch (error) {

            console.log(error);

            Alert.alert(
              "Error",
              "No se pudo eliminar"
            );
          }
        },
      },
    ]
  );
};

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#16a34a"
        />

      </View>
    );
  }

  return (

    <ScrollView style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.goBack()
          }
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color="#111827"
          />

        </TouchableOpacity>

        <Text style={styles.title}>
          Detalle Venta
        </Text>

      </View>

      {/* CARD */}

      <View style={styles.card}>

        <View style={styles.iconContainer}>

          <Ionicons
            name="cash-outline"
            size={34}
            color="#16a34a"
          />

        </View>

        <Text style={styles.amount}>
          ${sale.totalAmount}
        </Text>

        <Text style={styles.client}>
          {sale.buyerName}
        </Text>

        <View style={styles.infoBox}>

          <Text style={styles.label}>
            Litros vendidos
          </Text>

          <Text style={styles.value}>
            {sale.totalLitersSold} L
          </Text>

        </View>

        <View style={styles.infoBox}>

          <Text style={styles.label}>
            Fecha
          </Text>

          <Text style={styles.value}>
            {
              new Date(
                sale.saleDate
              ).toLocaleDateString()
            }
          </Text>

        </View>

      </View>

      {/* ACTIONS */}

      <TouchableOpacity
        style={styles.updateButton}
        onPress={() =>
          navigation.navigate(
            "UpdateSale",
            {
              saleId:
                sale.saleId,
            }
          )
        }
      >

        <Ionicons
          name="create-outline"
          size={20}
          color="#fff"
        />

        <Text style={styles.buttonText}>
          Actualizar
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >

        <Ionicons
          name="trash-outline"
          size={20}
          color="#fff"
        />

        <Text style={styles.buttonText}>
          Eliminar
        </Text>

      </TouchableOpacity>

      <View style={{ height: 50 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  loader: {

    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  header: {

    backgroundColor: "#16a34a",

    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 24,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  backButton: {

    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor: "#fff",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  title: {

    color: "#fff",

    fontSize: 34,

    fontWeight: "900",
  },

  card: {

    backgroundColor: "#fff",

    margin: 24,
    padding: 28,

    borderRadius: 28,

    alignItems: "center",
  },

  iconContainer: {

    width: 90,
    height: 90,

    borderRadius: 30,

    backgroundColor: "#dcfce7",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  amount: {

    fontSize: 34,

    fontWeight: "900",

    color: "#111827",
  },

  client: {

    marginTop: 10,

    fontSize: 18,

    fontWeight: "700",

    color: "#475569",

    marginBottom: 30,
  },

  infoBox: {

    width: "100%",

    backgroundColor: "#f8fafc",

    borderRadius: 18,

    padding: 18,

    marginBottom: 16,
  },

  label: {

    color: "#64748b",

    marginBottom: 6,
  },

  value: {

    fontSize: 18,

    fontWeight: "800",

    color: "#111827",
  },

  updateButton: {

    backgroundColor: "#16a34a",

    marginHorizontal: 24,

    paddingVertical: 18,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 14,
  },

  deleteButton: {

    backgroundColor: "#ef4444",

    marginHorizontal: 24,

    paddingVertical: 18,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
  },

  buttonText: {

    color: "#fff",

    fontWeight: "800",

    marginLeft: 10,
  },
});