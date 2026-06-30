import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { updateSale } from "../../services/salesService";

import { API_CONFIG } from "../../config/api";

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.SALES}`;

export default function UpdateSaleScreen({ route, navigation }: any) {
  const { saleId } = route.params;

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [sale, setSale] = useState<any>(null);

  const [buyerName, setBuyerName] = useState("");

  const [totalAmount, setTotalAmount] = useState("");

  const [totalLitersSold, setTotalLitersSold] = useState("");

  // =========================
  // LOAD DETAIL
  // =========================

  const loadSale = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API_URL}/${saleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error cargando venta");
      }

      const data = await response.json();

      setSale(data);

      setBuyerName(data.buyerName);

      setTotalAmount(String(data.totalAmount));

      setTotalLitersSold(String(data.totalLitersSold));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSale();
  }, []);

  // =========================
  // UPDATE
  // =========================

  const handleUpdate = async () => {
    try {
      if (!buyerName || !totalAmount || !totalLitersSold) {
        Alert.alert("Error", "Completa todos los campos");

        return;
      }

      setSaving(true);

      await updateSale(saleId, {
        saleDate: sale.saleDate,

        buyerName,

        totalAmount: Number(totalAmount),

        totalLitersSold: Number(totalLitersSold),
      });

      Alert.alert("Éxito", "Venta actualizada");

      navigation.navigate("Sales", {
        refresh: true,
      });
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo actualizar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={[{ id: "page" }]}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={() => null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <>
            {/* HEADER */}

            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#111827" />
              </TouchableOpacity>

              <Text style={styles.title}>Editar Venta</Text>
            </View>

            {/* FORM */}

            <View style={styles.form}>
              <Text style={styles.label}>Cliente</Text>

              <TextInput
                value={buyerName}
                onChangeText={setBuyerName}
                style={styles.input}
              />

              <Text style={styles.label}>Valor total</Text>

              <TextInput
                value={totalAmount}
                onChangeText={setTotalAmount}
                keyboardType="numeric"
                style={styles.input}
              />

              <Text style={styles.label}>Litros vendidos</Text>

              <TextInput
                value={totalLitersSold}
                onChangeText={setTotalLitersSold}
                keyboardType="numeric"
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleUpdate}
                disabled={saving}
              >
                <Ionicons name="save-outline" size={20} color="#fff" />

                <Text style={styles.buttonText}>
                  {saving ? "Guardando..." : "Actualizar"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 50 }} />
          </>
        }
      />
    </KeyboardAvoidingView>
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
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 30,

    backgroundColor: "#16a34a",

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
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
    fontSize: 32,

    fontWeight: "900",

    color: "#fff",
  },

  form: {
    padding: 24,
  },

  label: {
    fontSize: 15,

    fontWeight: "700",

    color: "#374151",

    marginBottom: 10,
  },

  input: {
    backgroundColor: "#fff",

    borderRadius: 18,

    padding: 18,

    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  button: {
    backgroundColor: "#16a34a",

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
