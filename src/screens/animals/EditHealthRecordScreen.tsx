import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { updateHealthRecord } from "../../services/animalHealthService";

export default function EditHealthRecordScreen({ route, navigation }: any) {
  const { animalId, record } = route.params;

  const [recordType, setRecordType] = useState(record.recordType);

  const [description, setDescription] = useState(record.description);

  const handleUpdate = async () => {
    try {
      if (!recordType.trim() || !description.trim()) {
        Alert.alert("Campos requeridos", "Completa toda la información.");

        return;
      }

      await updateHealthRecord(animalId, record.healthRecordId, {
        recordType,
        description,
      });

      Alert.alert("Éxito", "Registro actualizado correctamente.", [
        {
          text: "OK",

          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo actualizar.");
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
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#111827" />
              </TouchableOpacity>

              <View style={styles.headerContent}>
                <Ionicons name="create" size={34} color="#fff" />

                <Text style={styles.headerTitle}>Editar Registro</Text>

                <Text style={styles.headerSubtitle}>
                  Modifica la información médica
                </Text>
              </View>

              <View style={styles.headerSpacer} />
            </View>

            {/* FORM */}

            <View style={styles.form}>
              <Text style={styles.label}>Tipo de registro</Text>

              <TextInput
                style={styles.input}
                value={recordType}
                onChangeText={setRecordType}
                placeholder="Vacunación"
              />

              <Text style={styles.label}>Descripción</Text>

              <TextInput
                style={styles.textArea}
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Ionicons name="save-outline" size={20} color="#fff" />

                <Text style={styles.buttonText}>Guardar Cambios</Text>
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
    backgroundColor: "#3b82f6",

    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 36,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    flexDirection: "row",
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

  headerContent: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  headerSpacer: {
    width: 50,
  },

  headerTitle: {
    color: "#fff",

    fontSize: 28,
    fontWeight: "900",

    marginTop: 10,
  },

  headerSubtitle: {
    color: "#dbeafe",

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
    backgroundColor: "#3b82f6",

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
