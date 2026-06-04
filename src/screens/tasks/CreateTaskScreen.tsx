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

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  useTasks,
} from "../../context/TasksContext";

export default function CreateTaskScreen({
  navigation,
}: any) {

  const {
    createTask,
  } = useTasks();

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleCreate =
    async () => {

    try {

      if (!title.trim()) {

        Alert.alert(
          "Error",
          "El título es obligatorio."
        );

        return;
      }

      setLoading(true);

      await createTask({

        taskTitle: title,

        taskDescription:
          description,

        priority: 1,
      });

      Alert.alert(
        "Éxito",
        "Tarea creada correctamente."
      );

      setTitle("");
      setDescription("");

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo crear la tarea."
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
            Gestión de tareas
          </Text>

          <Text style={styles.title}>
            Nueva tarea
          </Text>

        </View>

      </View>

      {/* FORM */}

      <View style={styles.form}>

        <Text style={styles.label}>
          Título
        </Text>

        <TextInput
          placeholder="Ej: Vacunar ganado"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>
          Descripción
        </Text>

        <TextInput
          placeholder="Describe la tarea..."
          placeholderTextColor="#94a3b8"
          style={[
            styles.input,
            styles.textArea,
          ]}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={description}
          onChangeText={
            setDescription
          }
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreate}
          disabled={loading}
        >

          <Ionicons
            name="add-circle"
            size={22}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Crear tarea
          </Text>

        </TouchableOpacity>

      </View>

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
      "rgba(255,255,255,0.95)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  subtitle: {
    color: "#dbeafe",
    fontSize: 14,
    fontWeight: "600",
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 4,
  },

  form: {
    padding: 24,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 12,
  },

  input: {

    backgroundColor: "#fff",

    borderRadius: 20,

    padding: 18,

    fontSize: 16,

    color: "#111827",

    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,

    elevation: 3,
  },

  textArea: {
    height: 140,
  },

  button: {

    backgroundColor: "#3b82f6",

    paddingVertical: 18,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginTop: 24,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 10,
  },
});