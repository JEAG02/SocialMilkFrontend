import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
    Modal,
} from "react-native";

import { Calendar } from "react-native-calendars";

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
  deleteHealthEvent,
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

  const [selectedDate, setSelectedDate] =
  useState("");

  const [showModal, setShowModal] =
  useState(false);

  const [loading, setLoading] =
    useState(false);

    const [editingEventId, setEditingEventId] =
  useState<string | null>(null);

  // Crear objeto de eventos marcados para el calendario
  const markedEvents: any = {};
  
  events.forEach((event: any) => {
    const date = event.scheduledDate;
    if (date) {
      markedEvents[date] = {
        marked: true,
        dotColor: event.status === "Completado" ? "#16a34a" : "#3b82f6",
      };
    }
  });

  const selectedDayEvents =
  events.filter(
    (e) =>
      e.scheduledDate?.split("T")[0] ===
      selectedDate
  );

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
  // EDITAR EVENTO
  // ==========================
  // EDITAR EVENTO
  // ==========================

  const handleEditEvent =
    (event: any) => {

      setEditingEventId(
        event.healthEventId
      );

      setEventType(
        event.eventType
      );

      setSelectedDate(
        event.scheduledDate
          .split("T")[0]
      );

      setShowModal(true);
    };

  // ==========================
  // ELIMINAR EVENTO
  // ==========================

  const handleDeleteEvent =
    async (event: any) => {

      Alert.alert(
        "Eliminar evento",
        "¿Estás seguro?",
        [
          {
            text: "Cancelar",
            onPress: () => {},
          },
          {
            text: "Eliminar",
            onPress: async () => {

              try {

                await deleteHealthEvent(
                  animalId,
                  event.healthEventId
                );

                await loadEvents();

              } catch (error) {

                console.log(error);

                Alert.alert(
                  "Error",
                  "No se pudo eliminar."
                );
              }
            },
            style: "destructive",
          },
        ]
      );
    };
  // ==========================
  // CREAR EVENTO
  // ==========================

  const handleSaveEvent =
  async () => {

    try {

      if (editingEventId) {

        await updateHealthEvent(
          animalId,
          editingEventId,
          {
            eventType,
            scheduledDate:
              selectedDate,
            status:
              "Pendiente",
          }
        );

      } else {

        await createHealthEvent(
          animalId,
          {
            eventType,
            scheduledDate:
              selectedDate,
            status:
              "Pendiente",
          }
        );
      }

      setEditingEventId(null);

      setEventType("");

      setSelectedDate("");

      setShowModal(false);

      await loadEvents();

    } catch (error) {

      console.log(error);
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

    <>

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
    Selecciona una fecha
  </Text>

  <View style={styles.calendarContainer}>

    <Calendar
    minDate={new Date().toISOString().split("T")[0]}
      onDayPress={(day) => {

  setSelectedDate(
    day.dateString
  );

  setShowModal(true);
}}
      markedDates={{
        ...markedEvents,

        [selectedDate]: {
          ...(markedEvents[selectedDate] || {}),
          selected: true,
          selectedColor: "#8b5cf6",
        },
      }}
      theme={{
        calendarBackground: "#fff",

        textSectionTitleColor: "#94a3b8",

        selectedDayBackgroundColor:
          "#8b5cf6",

        selectedDayTextColor: "#fff",

        todayTextColor: "#8b5cf6",

        dayTextColor: "#111827",

        monthTextColor: "#111827",

        arrowColor: "#8b5cf6",

        textMonthFontSize: 20,

        textMonthFontWeight: "900",

        textDayFontSize: 16,

        textDayHeaderFontSize: 14,
      }}
    />

  </View>

  {
    selectedDate !== "" && (

      <View
        style={
          styles.dayEventsContainer
        }
      >

        <Text
          style={
            styles.dayEventsTitle
          }
        >
          Eventos del día
        </Text>

        {
          selectedDayEvents.length === 0
          ? (
            <Text
              style={
                styles.noEventsText
              }
            >
              No hay eventos
            </Text>
          )
          : selectedDayEvents.map(
              event => (

            <View
              key={
                event.healthEventId
              }
              style={
                styles.dayEventCard
              }
            >

              <Text
                style={
                  styles.dayEventTitle
                }
              >
                {event.eventType}
              </Text>

              <Text
                style={
                  styles.dayEventDescription
                }
              >
                {
                  event.description
                }
              </Text>

            </View>

          ))
        }

      </View>

    )
  }

</View>

      {/* EVENTOS */}

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          Eventos Programados
        </Text>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() =>
            navigation.navigate(
              "EventHistory",
              {
                animalId,
              }
            )
          }
        >

          <Ionicons
            name="checkmark-done-circle"
            size={20}
            color="#fff"
          />

          <Text
            style={styles.historyButtonText}
          >
            Ver Historial
          </Text>

        </TouchableOpacity>

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

            <TouchableOpacity
              key={event.healthEventId}
              style={styles.eventCard}
              onPress={() =>
                navigation.navigate(
                  "EventDetail",
                  {
                    event,
                    animalId,
                  }
                )
              }
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

              <View
                style={styles.eventActions}
              >

                <TouchableOpacity
                  onPress={() =>
                    handleEditEvent(event)
                  }
                >

                  <Ionicons
                    name="create-outline"
                    size={26}
                    color="#3b82f6"
                  />

                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleDeleteEvent(event)
                  }
                >

                  <Ionicons
                    name="trash-outline"
                    size={26}
                    color="#ef4444"
                  />

                </TouchableOpacity>

              </View>

              {
                event.status !==
                  "Completado" && (

                  <TouchableOpacity
                    style={{
                      marginLeft: 16,
                    }}
                    onPress={() =>
                      handleCompleteEvent(
                        event
                      )
                    }
                  >

                    <Ionicons
                      name="checkmark-circle"
                      size={32}
                      color="#16a34a"
                    />

                  </TouchableOpacity>
                )
              }

            </TouchableOpacity>
          ))
        }

      </View>

      <View style={{ height: 50 }} />

    </ScrollView>

    <Modal
      visible={showModal}
      transparent
      animationType="slide"
    >

      <View style={styles.modalOverlay}>

        <View style={styles.modalContainer}>

          <View style={styles.modalHeader}>

            <Ionicons
              name="calendar"
              size={26}
              color="#8b5cf6"
            />

            <Text style={styles.modalTitle}>
              Nuevo Evento
            </Text>

          </View>

          <Text style={styles.modalDate}>
            {selectedDate}
          </Text>

          <TextInput
            style={styles.modalInput}
            placeholder="Vacuna, cirugía, control..."
            value={eventType}
            onChangeText={setEventType}
          />

          <TouchableOpacity
            style={styles.modalSaveButton}
            onPress={handleSaveEvent}
          >

            <Text
              style={styles.modalSaveText}
            >
              {
                editingEventId
                  ? "Actualizar Evento"
                  : "Guardar Evento"
              }
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() =>
              setShowModal(false)
            }
          >

            <Text
              style={styles.modalCancelText}
            >
              Cancelar
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </Modal>

    </>
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
  calendarContainer: {

  marginTop: 10,

  backgroundColor: "#fff",

  borderRadius: 30,

  overflow: "hidden",

  shadowColor: "#000",

  shadowOpacity: 0.08,

  shadowRadius: 12,

  elevation: 5,
},

selectedDateCard: {

  marginTop: 16,

  backgroundColor: "#f3f4f6",

  borderRadius: 18,

  padding: 14,

  flexDirection: "row",

  alignItems: "center",

  justifyContent: "center",
},

selectedDateText: {

  marginLeft: 10,

  fontWeight: "800",

  color: "#111827",

  fontSize: 15,
},
modalOverlay: {

  flex: 1,

  backgroundColor:
    "rgba(0,0,0,0.45)",

  justifyContent: "center",

  padding: 24,
},

modalContainer: {

  backgroundColor: "#fff",

  borderRadius: 30,

  padding: 24,
},

modalHeader: {

  flexDirection: "row",

  alignItems: "center",

  justifyContent: "center",
},

modalTitle: {

  fontSize: 22,

  fontWeight: "900",

  color: "#111827",

  marginLeft: 10,
},

modalDate: {

  textAlign: "center",

  marginTop: 16,

  color: "#64748b",

  fontWeight: "700",
},

modalInput: {

  backgroundColor: "#f8fafc",

  marginTop: 20,

  borderRadius: 18,

  padding: 18,

  borderWidth: 1,

  borderColor: "#e5e7eb",
},

modalSaveButton: {

  backgroundColor: "#8b5cf6",

  marginTop: 20,

  borderRadius: 20,

  paddingVertical: 16,

  alignItems: "center",
},

modalSaveText: {

  color: "#fff",

  fontWeight: "900",

  fontSize: 16,
},

modalCancelButton: {

  marginTop: 10,

  paddingVertical: 14,

  alignItems: "center",
},

modalCancelText: {

  color: "#64748b",

  fontWeight: "700",
},

  eventActions: {
    flexDirection: "row",
    gap: 20,
  },

  dayEventsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },

  dayEventsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  noEventsText: {
    color: "#64748b",
    textAlign: "center",
    paddingVertical: 20,
  },

  dayEventCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },

  dayEventTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  dayEventDescription: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  historyButton: {
    backgroundColor: "#16a34a",
    borderRadius: 18,
    paddingVertical: 14,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  historyButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 8,
  },
});
