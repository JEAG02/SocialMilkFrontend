import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, {
  useState,
} from "react";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  useAnimals,
} from "../../context/AnimalsContext";

import {
  useFocusEffect,
} from "@react-navigation/native";

const API_URL =
  "http://192.168.38.77:5264/api/v1/production";

export default function ProductionScreen({
  navigation,
}: any) {

  const [liters, setLiters]
    = useState("");

  const [shift, setShift]
    = useState("");

  const [
    selectedAnimal,
    setSelectedAnimal,
  ] = useState("");

  const { animals } =
    useAnimals();

  const [
    productions,
    setProductions,
  ] = useState<any[]>([]);

  const [summary, setSummary] =
    useState<any>(null);

  const [
    summaryPeriod,
    setSummaryPeriod,
  ] = useState("daily");

  const [loading, setLoading]
    = useState(false);

  // =========================
  // LOAD PRODUCTIONS
  // =========================

  const loadProductions =
    async () => {

    try {

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
          "Error cargando producción"
        );
      }

      const data =
        await response.json();

      setProductions(data);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // LOAD SUMMARY
  // =========================

  const loadSummary =
    async (
      animalId: string,
      period: string
    ) => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      const response =
        await fetch(
`${API_URL}/summary?animalId=${animalId}&period=${period}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {

        throw new Error(
          "Error cargando summary"
        );
      }

      const data =
        await response.json();

      setSummary(data);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // REFRESH SCREEN
  // =========================

  useFocusEffect(

    React.useCallback(() => {

      loadProductions();

    }, [])
  );

  // =========================
  // CREATE PRODUCTION
  // =========================

  const handleCreate =
    async () => {

    try {

      if (
        !liters ||
        !shift.trim() ||
        !selectedAnimal
      ) {

        Alert.alert(
          "Error",
          "Completa todos los campos."
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

              animalId:
                selectedAnimal,

              productionDate:
                new Date().toISOString(),

              milkVolumeLiters:
                Number(liters),

              shift,
            }),
          }
        );

      if (!response.ok) {

        const error =
          await response.text();

        console.log(error);

        throw new Error(
          "Error creando producción"
        );
      }

      Alert.alert(
        "Éxito",
        "Producción registrada."
      );

      setLiters("");
      setShift("");
      setSelectedAnimal("");

      await loadProductions();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo registrar."
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
              Registro diario
            </Text>

            <Text style={styles.title}>
              Producción
            </Text>

          </View>

        </View>

        <View style={styles.headerIcon}>

          <Ionicons
            name="water"
            size={28}
            color="#fff"
          />

        </View>

      </View>

      {/* FORM */}

      <View style={styles.formCard}>

        <Text style={styles.sectionTitle}>
          Nueva Producción
        </Text>

        {/* LITROS */}

        <Text style={styles.label}>
          Litros producidos
        </Text>

        <TextInput
          placeholder="Ej: 450"
          placeholderTextColor="#94a3b8"
          value={liters}
          onChangeText={setLiters}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* ANIMALES */}

        <Text style={styles.label}>
          Selecciona animal
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >

          {animals.map((animal: any) => (

            <TouchableOpacity
              key={animal.animalId}
              style={[
                styles.animalCard,

                selectedAnimal ===
                  animal.animalId && {
                    backgroundColor:
                      "#3b82f6",

                    borderColor:
                      "#3b82f6",
                  },
              ]}
              onPress={() => {

                setSelectedAnimal(
                  animal.animalId
                );

                loadSummary(
                  animal.animalId,
                  summaryPeriod
                );
              }}
            >

              <Ionicons
                name="paw"
                size={24}
                color={
                  selectedAnimal ===
                  animal.animalId
                    ? "#fff"
                    : "#3b82f6"
                }
              />

              <Text
                style={[
                  styles.animalText,

                  selectedAnimal ===
                    animal.animalId && {
                      color: "#fff",
                    },
                ]}
              >
                {animal.animalName}
              </Text>

            </TouchableOpacity>
          ))}

        </ScrollView>

        {/* TURNO */}

        <Text style={styles.label}>
          Turno
        </Text>

        <TextInput
          placeholder="Mañana / Tarde"
          placeholderTextColor="#94a3b8"
          value={shift}
          onChangeText={setShift}
          style={styles.input}
        />

        {/* BUTTON */}

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
                : "Guardar producción"
            }
          </Text>

        </TouchableOpacity>

      </View>

      {/* SUMMARY */}

      {!!selectedAnimal && (

        <View style={styles.summaryCard}>

          <Text style={styles.summaryTitle}>
            Resumen producción
          </Text>

          {/* PERIODOS */}

          <View style={styles.periodContainer}>

            {[
              "daily",
              "weekly",
              "monthly",
            ].map((period) => (

              <TouchableOpacity
                key={period}
                style={[

                  styles.periodButton,

                  summaryPeriod ===
                    period && {
                      backgroundColor:
                        "#3b82f6",
                    },
                ]}
                onPress={() => {

                  setSummaryPeriod(
                    period
                  );

                  loadSummary(
                    selectedAnimal,
                    period
                  );
                }}
              >

                <Text
                  style={[

                    styles.periodText,

                    summaryPeriod ===
                      period && {
                        color: "#fff",
                      },
                  ]}
                >
                  {
                    period === "daily"
                      ? "Diario"
                      : period ===
                        "weekly"
                      ? "Semanal"
                      : "Mensual"
                  }
                </Text>

              </TouchableOpacity>
            ))}

          </View>

          {/* DATA */}

          {summary && (

            <View
              style={styles.summaryData}
            >

              <Text
                style={styles.summaryValue}
              >
                {
                  summary.totalMilkVolume
                } L
              </Text>

              <Text
                style={styles.summaryLabel}
              >
                Producción total
              </Text>

            </View>
          )}

        </View>
      )}

      {/* HISTORIAL */}

      <View style={styles.historyContainer}>

        <Text style={styles.historyTitle}>
          Historial reciente
        </Text>

        {productions.map((item) => {

          const animal =
            animals.find(
              (a: any) =>
                a.animalId ===
                item.animalId
            );

          return (

            <TouchableOpacity
              key={item.productionId}
              style={styles.productionCard}
              onPress={() =>
                navigation.navigate(
                  "ProductionDetail",
                  {
                    productionId:
                      item.productionId,
                  }
                )
              }
            >

              <View
                style={styles.productionIcon}
              >

                <Ionicons
                  name="water-outline"
                  size={26}
                  color="#3b82f6"
                />

              </View>

              <View style={{ flex: 1 }}>

                <Text
                  style={
                    styles.productionLiters
                  }
                >
                  {
                    item.milkVolumeLiters
                  } L
                </Text>

                <Text
                  style={
                    styles.productionAnimal
                  }
                >
                  🐄 {
                    animal?.animalName ||
                    "Animal desconocido"
                  }
                </Text>

                <Text
                  style={
                    styles.productionInfo
                  }
                >
                  Turno {item.shift}
                </Text>

                <Text
                  style={
                    styles.productionDate
                  }
                >
                  {
                    new Date(
                      item.productionDate
                    ).toLocaleDateString()
                  }
                </Text>

              </View>

            </TouchableOpacity>
          );
        })}

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

    backgroundColor: "#3b82f6",

    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 40,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subtitle: {
    color: "#dbeafe",
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

  animalCard: {

    backgroundColor: "#fff",

    borderWidth: 2,
    borderColor: "#dbeafe",

    borderRadius: 18,

    paddingVertical: 14,
    paddingHorizontal: 18,

    alignItems: "center",

    marginRight: 14,
  },

  animalText: {

    marginTop: 8,

    color: "#1e3a8a",

    fontWeight: "700",
  },

  saveButton: {

    backgroundColor: "#3b82f6",

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

  productionCard: {

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

  productionIcon: {

    width: 58,
    height: 58,

    borderRadius: 18,

    backgroundColor: "#dbeafe",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  productionLiters: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },

  productionAnimal: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
  },

  productionDate: {
    marginTop: 4,
    color: "#94a3b8",
    fontSize: 13,
  },

  productionInfo: {
    marginTop: 4,
    color: "#64748b",
    fontWeight: "600",
  },

  summaryCard: {

    backgroundColor: "#fff",

    marginHorizontal: 22,
    marginBottom: 22,

    borderRadius: 24,

    padding: 20,
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 18,
  },

  periodContainer: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 20,
  },

  periodButton: {

    flex: 1,

    paddingVertical: 12,

    borderRadius: 14,

    backgroundColor: "#eff6ff",

    marginHorizontal: 4,

    alignItems: "center",
  },

  periodText: {

    color: "#3b82f6",

    fontWeight: "700",
  },

  summaryData: {
    alignItems: "center",
  },

  summaryValue: {

    fontSize: 42,

    fontWeight: "900",

    color: "#3b82f6",
  },

  summaryLabel: {

    marginTop: 6,

    color: "#64748b",

    fontWeight: "600",
  },
});