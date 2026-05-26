import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  useState,
} from "react";

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  createAnimal,
} from "../../services/animalsService";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import {
  useAnimals,
} from "../../context/AnimalsContext";

export default function CreateAnimalScreen({
  navigation,
}: any) {

  const [animalName, setAnimalName] =
    useState("");

  const [animalType, setAnimalType] =
    useState("");

  const [animalBreed, setAnimalBreed] =
    useState("");

  const [animalStatus, setAnimalStatus] =
    useState("");

  const [birthDate, setBirthDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // 🔥 IMPORTANTE
  const { loadAnimals } =
    useAnimals();

  const handleCreate = async () => {

    if (
      !animalName ||
      !animalType ||
      !animalBreed ||
      !animalStatus ||
      !birthDate
    ) {

      Alert.alert(
        "Error",
        "Completa todos los campos"
      );

      return;
    }

    try {

      setLoading(true);

      const profileId =
        await AsyncStorage.getItem(
          "profileId"
        );

      await createAnimal({

        ownerId: profileId,

        animalName,
        animalType,
        animalBreed,
        animalStatus,
        birthDate,
      });

      // 🔥 ACTUALIZAR CONTEXTO
      await loadAnimals();

      Alert.alert(
        "Éxito",
        "Animal registrado correctamente",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );

      // LIMPIAR INPUTS

      setAnimalName("");
      setAnimalType("");
      setAnimalBreed("");
      setAnimalStatus("");
      setBirthDate("");

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo crear el animal"
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

        <View style={{ flex: 1 }}>

          <Text style={styles.headerSubtitle}>
            Nuevo registro
          </Text>

          <Text style={styles.headerTitle}>
            Crear Animal
          </Text>

        </View>

        <View style={styles.headerIcon}>

          <Ionicons
            name="paw"
            size={30}
            color="#fff"
          />

        </View>

      </View>

      {/* FORM */}

      <View style={styles.form}>

        <Text style={styles.label}>
          Nombre del animal
        </Text>

        <TextInput
          placeholder="Ej: Lola"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={animalName}
          onChangeText={setAnimalName}
        />

        <Text style={styles.label}>
          Tipo
        </Text>

        <TextInput
          placeholder="Ej: Vaca"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={animalType}
          onChangeText={setAnimalType}
        />

        <Text style={styles.label}>
          Raza
        </Text>

        <TextInput
          placeholder="Ej: Holstein"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={animalBreed}
          onChangeText={setAnimalBreed}
        />

        <Text style={styles.label}>
          Estado
        </Text>

        <TextInput
          placeholder="Ej: Producción"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={animalStatus}
          onChangeText={setAnimalStatus}
        />

        <Text style={styles.label}>
          Fecha nacimiento
        </Text>

        <TextInput
          placeholder="2020-05-10"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={birthDate}
          onChangeText={setBirthDate}
        />

        {/* BUTTON */}

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreate}
          disabled={loading}
        >

          {loading ? (

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >

              <ActivityIndicator
                color="#fff"
              />

              <Text
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  fontWeight: "700",
                }}
              >
                Registrando...
              </Text>

            </View>

          ) : (

            <>
              <Ionicons
                name="add"
                size={22}
                color="#fff"
              />

              <Text style={styles.buttonText}>
                Registrar Animal
              </Text>
            </>
          )}

        </TouchableOpacity>

      </View>

      <View style={{ height: 60 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {

    backgroundColor: "#f59e0b",

    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 34,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {

    width: 50,
    height: 50,

    borderRadius: 18,

    backgroundColor:
      "rgba(255,255,255,0.92)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  headerSubtitle: {
    color: "#fef3c7",
    fontSize: 14,
    fontWeight: "600",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 4,
  },

  headerIcon: {

    width: 62,
    height: 62,

    borderRadius: 20,

    backgroundColor:
      "rgba(255,255,255,0.18)",

    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    padding: 24,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 10,
    marginTop: 10,
  },

  input: {

    backgroundColor: "#fff",

    borderRadius: 20,

    padding: 18,

    fontSize: 16,

    marginBottom: 12,

    borderWidth: 1,
    borderColor: "#e2e8f0",

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,

    elevation: 2,
  },

  button: {

    backgroundColor: "#f59e0b",

    paddingVertical: 20,

    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    shadowColor: "#f59e0b",
    shadowOpacity: 0.25,
    shadowRadius: 12,

    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 8,
  },
});