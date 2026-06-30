import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useState } from "react";

import {
  deleteHealthEvent,
  updateHealthEvent,
} from "../../services/animalHealthService";

export default function EventDetailScreen({ route, navigation }: any) {
  const { event, animalId } = route.params;

  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    try {
      setLoading(true);

      await updateHealthEvent(animalId, event.healthEventId, {
        eventType: event.eventType,
        scheduledDate: event.scheduledDate,
        status: "Completado",
      });

      Alert.alert("Éxito", "Evento marcado como completado");

      navigation.goBack();
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo actualizar");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert("Eliminar evento", "¿Estás seguro?", [
      {
        text: "Cancelar",
        onPress: () => {},
      },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            setLoading(true);

            await deleteHealthEvent(animalId, event.healthEventId);

            Alert.alert("Éxito", "Evento eliminado");

            navigation.goBack();
          } catch (error) {
            console.log(error);

            Alert.alert("Error", "No se pudo eliminar");
          } finally {
            setLoading(false);
          }
        },
        style: "destructive",
      },
    ]);
  };

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
          <Ionicons name="calendar-outline" size={34} color="#fff" />

          <Text style={styles.headerTitle}>Detalles del Evento</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      {/* CONTENIDO */}

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.label}>Tipo de Evento</Text>

            <Text style={styles.value}>{event.eventType}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.label}>Fecha Programada</Text>

            <Text style={styles.value}>
              {new Date(event.scheduledDate).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.label}>Estado</Text>

            <View
              style={{
                marginTop: 12,
              }}
            >
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      event.status === "Completado" ? "#d1fae5" : "#fef3c7",
                  },
                ]}
              >
                <Ionicons
                  name={
                    event.status === "Completado" ? "checkmark-circle" : "time"
                  }
                  size={18}
                  color={event.status === "Completado" ? "#059669" : "#d97706"}
                />

                <Text
                  style={{
                    marginLeft: 8,
                    fontWeight: "700",
                    color:
                      event.status === "Completado" ? "#059669" : "#d97706",
                  }}
                >
                  {event.status}
                </Text>
              </View>
            </View>
          </View>

          {event.description && (
            <>
              <View style={styles.divider} />

              <View style={styles.section}>
                <Text style={styles.label}>Notas</Text>

                <Text style={styles.value}>{event.description}</Text>
              </View>
            </>
          )}

          {event.createdAt && (
            <>
              <View style={styles.divider} />

              <View style={styles.section}>
                <Text style={styles.label}>Creado</Text>

                <Text style={styles.value}>
                  {new Date(event.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* BOTONES DE ACCIÓN */}

        {event.status !== "Completado" && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
            disabled={loading}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />

            <Text style={styles.completeButtonText}>
              Marcar como Completado
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          disabled={loading}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />

          <Text style={styles.deleteButtonText}>Eliminar Evento</Text>
        </TouchableOpacity>
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
  },

  headerSpacer: {
    width: 50,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 10,
  },

  content: {
    marginTop: 24,
    marginHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 24,
    elevation: 2,
  },

  section: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  value: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginTop: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 16,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignSelf: "flex-start",
  },

  completeButton: {
    backgroundColor: "#16a34a",
    borderRadius: 20,
    paddingVertical: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  completeButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 10,
  },

  deleteButton: {
    backgroundColor: "#ef4444",
    borderRadius: 20,
    paddingVertical: 16,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 10,
  },
});
