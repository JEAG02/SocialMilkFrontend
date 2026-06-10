import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";

import {
  useState,
  useCallback,
} from "react";

import {
  useFocusEffect,
} from "@react-navigation/native";

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  getHealthEvents,
  createHealthEvent,
  updateHealthEvent,
} from "../../services/animalHealthService";

export default function AnimalHealthEventsScreen({
  route,
  navigation,
}: any) {

  const { animalId } = route.params;

  const [events, setEvents] =
    useState<any[]>([]);

  const [eventType, setEventType] =
    useState("");

  const [scheduledDate, setScheduledDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const loadEvents = async () => {

    try {

      const data =
        await getHealthEvents(
          animalId
        );

      setEvents(data);

    } catch (error) {

      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {

      loadEvents();

    }, [])
  );

  // ==========================
  // CREAR EVENTO
  // ==========================

  const handleCreateEvent =
    async () => {

      try {

        if (
          !eventType.trim() ||
          !scheduledDate.trim()
        ) {

          Alert.alert(
            "Campos requeridos",
            "Completa toda la información."
          );

          return;
        }

        setLoading(true);

        await createHealthEvent(
          animalId,
          {
            eventType,
            scheduledDate,
            status: "Pendiente",
          }
        );

        setEventType("");
        setScheduledDate("");

        await loadEvents();

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "No se pudo crear el evento."
        );

      } finally {

        setLoading(false);
      }
    };

  // ==========================
  // COMPLETAR EVENTO
  // ==========================

  const handleCompleteEvent =
    async (event: any) => {

      try {

        await updateHealthEvent(
          animalId,
          event.healthEventId,
          {
            eventType:
              event.eventType,

            scheduledDate:
              event.scheduledDate,

            status:
              "Completado",
          }
        );

        await loadEvents();

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "No se pudo actualizar."
        );
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

        <View style={styles.headerContent}>

          <Ionicons
            name="calendar"
            size={34}
            color="#fff"
          />

          <Text style={styles.headerTitle}>
            Calendario Médico
          </Text>

          <Text style={styles.headerSubtitle}>
            Próximos eventos sanitarios
          </Text>

        </View>

        <View style={styles.headerSpacer} />

      </View>

      {/* FORM */}

      <View style={styles.formCard}>

        <Text style={styles.label}>
          Tipo de evento
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Vacuna, cirugía..."
          value={eventType}
          onChangeText={setEventType}
        />

        <Text style={styles.label}>
          Fecha programada
        </Text>

        <TextInput
          style={styles.input}
          placeholder="2026-06-30"
          value={scheduledDate}
          onChangeText={setScheduledDate}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreateEvent}
          disabled={loading}
        >

          <Ionicons
            name="add-circle"
            size={22}
            color="#fff"
          />

          <Text style={styles.addButtonText}>
            Programar Evento
          </Text>

        </TouchableOpacity>

      </View>

      {/* EVENTOS */}

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          Eventos Programados
        </Text>

        {
          events.length === 0 && (

            <View style={styles.emptyCard}>

              <Text
                style={styles.emptyText}
              >
                No hay eventos programados.
              </Text>

            </View>
          )
        }

        {
          events.map((event) => (

            <View
              key={event.healthEventId}
              style={styles.eventCard}
            >

              <View
                style={styles.iconContainer}
              >

                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color="#3b82f6"
                />

              </View>

              <View
                style={{ flex: 1 }}
              >

                <Text
                  style={styles.eventTitle}
                >
                  {event.eventType}
                </Text>

                <Text
                  style={styles.eventDate}
                >
                  {
                    new Date(
                      event.scheduledDate
                    ).toLocaleDateString()
                  }
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    color:
                      event.status ===
                      "Completado"
                        ? "#16a34a"
                        : "#f59e0b",
                    fontWeight: "700",
                  }}
                >
                  {event.status}
                </Text>

              </View>

              {
                event.status !==
                  "Completado" && (

                  <TouchableOpacity
                    onPress={() =>
                      handleCompleteEvent(
                        event
                      )
                    }
                  >

                    <Ionicons
                      name="checkmark-circle"
                      size={28}
                      color="#16a34a"
                    />

                  </TouchableOpacity>
                )
              }

            </View>
          ))
        }

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

    backgroundColor: "#8b5cf6",

    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 36,

    flexDirection: "row",
    alignItems: "center",

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backButton: {

    width: 50,
    height: 50,

    borderRadius: 18,

    backgroundColor:
      "rgba(255,255,255,0.9)",

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

    fontSize: 28,

    fontWeight: "900",

    marginTop: 10,
  },

  headerSubtitle: {

    color: "#ede9fe",

    marginTop: 6,
  },

  formCard: {

    backgroundColor: "#fff",

    margin: 20,

    borderRadius: 24,

    padding: 20,
  },

  label: {

    fontWeight: "700",

    marginBottom: 10,

    marginTop: 10,
  },

  input: {

    backgroundColor: "#f8fafc",

    borderRadius: 18,

    padding: 16,

    borderWidth: 1,

    borderColor: "#e5e7eb",
  },

  addButton: {

    backgroundColor: "#8b5cf6",

    marginTop: 20,

    borderRadius: 20,

    paddingVertical: 16,

    alignItems: "center",

    justifyContent: "center",

    flexDirection: "row",
  },

  addButtonText: {

    color: "#fff",

    fontWeight: "800",

    marginLeft: 8,
  },

  section: {
    marginHorizontal: 20,
  },

  sectionTitle: {

    fontSize: 22,

    fontWeight: "900",

    marginBottom: 14,
  },

  eventCard: {

    backgroundColor: "#fff",

    borderRadius: 20,

    padding: 18,

    marginBottom: 14,

    flexDirection: "row",

    alignItems: "center",
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

  eventTitle: {

    fontWeight: "800",

    fontSize: 16,
  },

  eventDate: {
    color: "#64748b",
    marginTop: 4,
  },

  emptyCard: {

    backgroundColor: "#fff",

    borderRadius: 20,

    padding: 20,
  },

  emptyText: {

    textAlign: "center",

    color: "#64748b",
  },
});