import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useState, useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { getHealthEvents } from "../../services/animalHealthService";

export default function EventHistoryScreen({ route, navigation }: any) {
  const { animalId } = route.params;

  const [events, setEvents] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const completedEvents = events.filter((e) => e.status === "Completado");

  const loadEvents = async () => {
    try {
      const data = await getHealthEvents(animalId);

      setEvents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadEvents();
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
          <Ionicons name="checkmark-done-circle" size={34} color="#fff" />

          <Text style={styles.headerTitle}>Historial de Eventos</Text>

          <Text style={styles.headerSubtitle}>Eventos completados</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      {/* CONTENIDO */}

      <View style={styles.section}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedEvents.length}</Text>

            <Text style={styles.statLabel}>Completados</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {events.filter((e) => e.status === "Pendiente").length}
            </Text>

            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Eventos Completados</Text>

        {completedEvents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-circle" size={48} color="#d1d5db" />

            <Text style={styles.emptyText}>No hay eventos completados</Text>
          </View>
        ) : (
          completedEvents.map((event) => (
            <TouchableOpacity
              key={event.healthEventId}
              style={styles.eventCard}
              onPress={() =>
                navigation.navigate("EventDetail", {
                  event,
                  animalId,
                })
              }
            >
              <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{event.eventType}</Text>

                <Text style={styles.eventDate}>
                  {new Date(event.scheduledDate).toLocaleDateString()}
                </Text>

                {event.description && (
                  <Text style={styles.eventDescription} numberOfLines={2}>
                    {event.description}
                  </Text>
                )}
              </View>

              <Ionicons name="chevron-forward" size={24} color="#cbd5e1" />
            </TouchableOpacity>
          ))
        )}
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
    backgroundColor: "#16a34a",
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
    fontSize: 26,
    fontWeight: "900",
    marginTop: 10,
  },

  headerSubtitle: {
    color: "#dcfce7",
    marginTop: 6,
    fontSize: 14,
  },

  section: {
    marginTop: 24,
    marginHorizontal: 20,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    elevation: 2,
  },

  statNumber: {
    fontSize: 32,
    fontWeight: "900",
    color: "#16a34a",
  },

  statLabel: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 16,
  },

  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#f0fdf4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  eventDate: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },

  eventDescription: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 6,
  },

  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    elevation: 2,
  },

  emptyText: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 16,
    textAlign: "center",
  },
});
