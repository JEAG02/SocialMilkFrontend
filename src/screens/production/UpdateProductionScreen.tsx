import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useState,
} from "react";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  updateProduction,
} from "../../services/productionService";

import {
  useAnimals,
} from "../../context/AnimalsContext";

export default function
UpdateProductionScreen({
  route,
  navigation,
}: any) {

  // =========================
  // PARAMS
  // =========================

  const {
    production,
  } = route.params;

  // =========================
  // STATES
  // =========================

  const [saving, setSaving]
    = useState(false);

  const [liters, setLiters]
    = useState(
      String(
        production.milkVolumeLiters
      )
    );

  const [shift, setShift]
    = useState(
      production.shift
    );

  const { animals } =
    useAnimals();

  // =========================
  // UPDATE
  // =========================

  const handleUpdate =
    async () => {

    try {

      if (
        !liters ||
        !shift.trim()
      ) {

        Alert.alert(
          "Error",
          "Completa todos los campos"
        );

        return;
      }

      setSaving(true);

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      if (!token) {

        throw new Error(
          "No existe token"
        );
      }

      await updateProduction(
        production.productionId,
        {

          animalId:
            production.animalId,

          productionDate:
            production.productionDate,

          milkVolumeLiters:
            Number(liters),

          shift,
        }
      );

      Alert.alert(
        "Éxito",
        "Producción actualizada"
      );

      navigation.navigate(
        "Production"
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo actualizar"
      );

    } finally {

      setSaving(false);
    }
  };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

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

        <Text style={styles.subtitle}>
          Modificar registro
        </Text>

        <Text style={styles.title}>
          Editar Producción
        </Text>

      </View>

      {/* FORM */}

      <View style={styles.formCard}>

        {/* ANIMAL */}

        <Text style={styles.label}>
          Animal
        </Text>

        <View style={styles.infoBox}>

          <Ionicons
            name="paw"
            size={20}
            color="#3b82f6"
          />

          <Text style={styles.infoText}>

            {
              animals.find(
                (a: any) =>
                  a.animalId ===
                  production.animalId
              )?.animalName
            }

          </Text>

        </View>

        {/* LITROS */}

        <Text style={styles.label}>
          Litros producidos
        </Text>

        <TextInput
          value={liters}
          onChangeText={setLiters}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* TURNO */}

        <Text style={styles.label}>
          Turno
        </Text>

        <TextInput
          value={shift}
          onChangeText={setShift}
          style={styles.input}
        />

        {/* BUTTON */}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleUpdate}
          disabled={saving}
        >

          <Ionicons
            name="save-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            {
              saving
                ? "Actualizando..."
                : "Actualizar producción"
            }
          </Text>

        </TouchableOpacity>

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
  },

  backButton: {

    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor:
      "rgba(255,255,255,0.92)",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
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

  infoBox: {

    backgroundColor: "#eff6ff",

    borderRadius: 18,

    padding: 16,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 24,
  },

  infoText: {

    marginLeft: 10,

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
});