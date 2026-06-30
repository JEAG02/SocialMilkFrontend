import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";

import {
  getHealthRecords,
  deleteHealthRecord,
} from "../../services/animalHealthService";

export default function AnimalHealthRecordsScreen({ navigation, route }: any) {
  const { animalId } = route.params;

  const [records, setRecords] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const loadRecords = async () => {
    try {
      const data = await getHealthRecords(animalId);

      setRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (recordId: string) => {
    Alert.alert("Eliminar registro", "¿Deseas eliminar este registro médico?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",

        onPress: async () => {
          try {
            await deleteHealthRecord(animalId, recordId);

            loadRecords();
          } catch (error) {
            console.log(error);

            Alert.alert("Error", "No se pudo eliminar.");
          }
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, []),
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Ionicons name="medkit" size={34} color="#fff" />

          <Text style={styles.headerTitle}>Historial Médico</Text>

          <Text style={styles.headerSubtitle}>
            Registros sanitarios del animal
          </Text>
        </View>

        {/* ESPACIO FANTASMA */}
        <View style={styles.headerSpacer} />
      </View>

      {/* BOTÓN AGREGAR */}

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AnimalHealthRecordForm", {
              animalId,
            })
          }
        >
          <Ionicons name="add-circle" size={28} color="#fff" />

          <Text style={styles.addButtonText}>Agregar Registro</Text>
        </TouchableOpacity>
      </View>

      {/* HISTORIAL */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial Médico</Text>
        {records.length === 0 && (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No existen registros médicos
            </Text>
          </View>
        )}

        {records.map((record) => (
          <View key={record.healthRecordId} style={styles.recordCard}>
            <View style={styles.iconContainer}>
              <Ionicons name="medical" size={22} color="#16a34a" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.recordTitle}>{record.recordType}</Text>

              <Text style={styles.recordDate}>
                {new Date(record.createdAt).toLocaleDateString()}
              </Text>

              <Text
                style={{
                  marginTop: 6,
                  color: "#64748b",
                }}
              >
                {record.description}
              </Text>
            </View>
            <View style={styles.actionsColumn}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  navigation.navigate("EditHealthRecord", {
                    animalId,
                    record,
                  })
                }
              >
                <Ionicons name="create-outline" size={22} color="#3b82f6" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDelete(record.healthRecordId)}
              >
                <Ionicons name="trash-outline" size={22} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
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
  headerTitle: {
    color: "#fff",

    fontSize: 30,
    fontWeight: "900",

    marginTop: 10,
  },

  headerSubtitle: {
    color: "#dbeafe",

    marginTop: 6,
    fontSize: 14,
  },

  actionsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  addButton: {
    backgroundColor: "#16a34a",

    borderRadius: 22,

    paddingVertical: 18,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
  },

  addButtonText: {
    color: "#fff",

    fontSize: 16,
    fontWeight: "800",

    marginLeft: 10,
  },

  section: {
    marginTop: 24,
    marginHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,

    fontWeight: "900",

    color: "#111827",

    marginBottom: 16,
  },

  recordCard: {
    backgroundColor: "#fff",

    borderRadius: 22,

    padding: 18,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 14,

    elevation: 2,
  },

  iconContainer: {
    width: 50,
    height: 50,

    borderRadius: 16,

    backgroundColor: "#f8fafc",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  recordTitle: {
    fontSize: 16,

    fontWeight: "800",

    color: "#111827",
  },

  recordDate: {
    marginTop: 4,

    color: "#64748b",
  },
  actionsColumn: {
    justifyContent: "center",

    marginLeft: 12,
  },

  actionButton: {
    padding: 8,
  },
  headerSpacer: {
    width: 50,
  },
});
