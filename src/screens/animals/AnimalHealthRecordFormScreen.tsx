import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { createHealthRecord } from "../../services/animalHealthService";

export default function AnimalHealthRecordFormScreen({
  route,
  navigation,
}: any) {
  const { animalId } = route.params;

  const [recordType, setRecordType] = useState("");

  const [description, setDescription] = useState("");

  const handleSave = async () => {
    try {
      if (!recordType.trim() || !description.trim()) {
        Alert.alert("Campos requeridos", "Completa toda la información.");

        return;
      }

      await createHealthRecord(animalId, {
        recordType,
        description,
      });

      Alert.alert("Éxito", "Registro médico guardado.", [
        {
          text: "OK",

          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo guardar el registro.");
    }
  };

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
              <View style={styles.headerSide}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={24} color="#111827" />
                </TouchableOpacity>
              </View>

              <View style={styles.headerCenter}>
                <Ionicons name="medkit" size={34} color="#fff" />

                <Text style={styles.headerTitle}>Nuevo Registro</Text>

                <Text style={styles.headerSubtitle}>
                  Historial médico del animal
                </Text>
              </View>

              <View style={styles.headerSide} />
            </View>

            {/* FORM */}

            <View style={styles.form}>
              <Text style={styles.label}>Tipo de registro</Text>

              <TextInput
                style={styles.input}
                placeholder="Vacunación, consulta, cirugía..."
                value={recordType}
                onChangeText={setRecordType}
              />

              <Text style={styles.label}>Descripción</Text>

              <TextInput
                style={styles.textArea}
                placeholder="Describe el procedimiento realizado..."
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Ionicons name="save-outline" size={20} color="#fff" />

                <Text style={styles.buttonText}>Guardar Registro</Text>
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
    backgroundColor: "#f8fafc",
  },

  header: {
    backgroundColor: "#16a34a",

    paddingTop: 60,
    paddingBottom: 36,
    paddingHorizontal: 24,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    flexDirection: "row",
  },

  headerSide: {
    width: 60,

    justifyContent: "center",
  },

  headerCenter: {
    flex: 1,

    alignItems: "center",
  },

  backButton: {
    width: 50,
    height: 50,

    borderRadius: 18,

    backgroundColor: "rgba(255,255,255,0.9)",

    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",

    fontSize: 30,
    fontWeight: "900",

    marginTop: 10,
  },

  headerSubtitle: {
    color: "#dcfce7",

    marginTop: 6,

    fontSize: 14,
  },

  form: {
    padding: 24,
  },

  label: {
    fontSize: 15,

    fontWeight: "700",

    color: "#374151",

    marginBottom: 10,

    marginTop: 16,
  },

  input: {
    backgroundColor: "#fff",

    borderRadius: 18,

    padding: 18,

    fontSize: 16,

    borderWidth: 1,
    borderColor: "#e5e7eb",

    elevation: 2,
  },

  textArea: {
    backgroundColor: "#fff",

    borderRadius: 18,

    padding: 18,

    height: 140,

    fontSize: 16,

    textAlignVertical: "top",

    borderWidth: 1,
    borderColor: "#e5e7eb",

    elevation: 2,
  },

  button: {
    backgroundColor: "#16a34a",

    marginTop: 30,

    paddingVertical: 18,

    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    elevation: 4,
  },

  buttonText: {
    color: "#fff",

    fontSize: 16,

    fontWeight: "800",

    marginLeft: 10,
  },
});
