import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  useState,
} from "react";

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  updateAnimal,
} from "../../services/animalsService";

export default function EditAnimalScreen({
  route,
  navigation,
}: any) {

  const { animal } = route.params;

  const [
    animalName,
    setAnimalName,
  ] = useState(
    animal.animalName
  );

  const [
    animalType,
    setAnimalType,
  ] = useState(
    animal.animalType
  );

  const [
    animalBreed,
    setAnimalBreed,
  ] = useState(
    animal.animalBreed
  );

  const [
    animalStatus,
    setAnimalStatus,
  ] = useState(
    animal.animalStatus
  );

  const [
    birthDate,
    setBirthDate,
  ] = useState(
    animal.birthDate
      .split("T")[0]
  );

  const [loading, setLoading] =
    useState(false);

  // =========================
  // UPDATE
  // =========================

  const handleUpdate =
    async () => {

    try {

      setLoading(true);

      await updateAnimal(
        animal.animalId,
        {

          ownerId:
            animal.ownerId,

          animalName,
          animalType,
          animalBreed,
          animalStatus,
          birthDate,
        }
      );

      Alert.alert(
        "Éxito",
        "Animal actualizado correctamente",
        [
          {
            text: "OK",

            onPress: () =>
              navigation.goBack(),
          },
        ]
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo actualizar"
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

        <View>

          <Text style={styles.subtitle}>
            Gestión animal
          </Text>

          <Text style={styles.title}>
            Editar Animal
          </Text>

        </View>

      </View>

      {/* FORM */}

      <View style={styles.form}>

        {/* NAME */}

        <Text style={styles.label}>
          Nombre
        </Text>

        <TextInput
          style={styles.input}
          value={animalName}
          onChangeText={
            setAnimalName
          }
          placeholder="Nombre"
        />

        {/* TYPE */}

        <Text style={styles.label}>
          Tipo
        </Text>

        <TextInput
          style={styles.input}
          value={animalType}
          onChangeText={
            setAnimalType
          }
          placeholder="Tipo"
        />

        {/* BREED */}

        <Text style={styles.label}>
          Raza
        </Text>

        <TextInput
          style={styles.input}
          value={animalBreed}
          onChangeText={
            setAnimalBreed
          }
          placeholder="Raza"
        />

        {/* STATUS */}

        <Text style={styles.label}>
          Estado
        </Text>

        <TextInput
          style={styles.input}
          value={animalStatus}
          onChangeText={
            setAnimalStatus
          }
          placeholder="Estado"
        />

        {/* DATE */}

        <Text style={styles.label}>
          Fecha nacimiento
        </Text>

        <TextInput
          style={styles.input}
          value={birthDate}
          onChangeText={
            setBirthDate
          }
          placeholder="2020-01-01"
        />

        {/* BUTTON */}

        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}
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
                Guardando...
              </Text>

            </View>

          ) : (

            <>
              <Ionicons
                name="save-outline"
                size={20}
                color="#fff"
              />

              <Text
                style={styles.buttonText}
              >
                Guardar cambios
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
    paddingBottom: 36,

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
      "rgba(255,255,255,0.9)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 18,
  },

  subtitle: {
    color: "#fef3c7",
    fontSize: 15,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 6,
  },

  form: {
    padding: 24,
  },

  label: {

    fontSize: 15,

    fontWeight: "700",

    color: "#374151",

    marginBottom: 10,

    marginTop: 14,
  },

  input: {

    backgroundColor: "#fff",

    borderRadius: 18,

    padding: 18,

    fontSize: 16,

    borderWidth: 1,
    borderColor: "#e5e7eb",

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,

    elevation: 2,
  },

  button: {

    backgroundColor: "#f59e0b",

    marginTop: 34,

    paddingVertical: 20,

    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    shadowColor: "#f59e0b",
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 5,
  },

  buttonText: {

    color: "#fff",

    fontSize: 16,

    fontWeight: "800",

    marginLeft: 10,
  },
});