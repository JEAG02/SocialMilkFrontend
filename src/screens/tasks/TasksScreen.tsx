import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useTasks } from "../../context/TasksContext";

export default function TasksScreen({ route, navigation }: any) {
  const { status } = route.params;

  const {
    tasks,
    moveToInProgress,
    moveToCompleted,
    moveToPending,
    deleteTask,
  } = useTasks();

  // =========================
  // MAP STATUS NUMBER
  // =========================

  const statusMap: any = {
    PENDING: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
  };

  const filtered = tasks.filter((t) => t.status === statusMap[status]);

  const titleMap: any = {
    PENDING: "Pendientes",
    IN_PROGRESS: "En Curso",
    COMPLETED: "Completadas",
  };

  const colorMap: any = {
    PENDING: "#ef4444",
    IN_PROGRESS: "#f59e0b",
    COMPLETED: "#22c55e",
  };

  const iconMap: any = {
    PENDING: "alert-circle-outline",

    IN_PROGRESS: "reload-circle-outline",

    COMPLETED: "checkmark-done-circle-outline",
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colorMap[status] + "12",
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View
        style={[
          styles.header,
          {
            backgroundColor: colorMap[status],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.headerSubtitle}>Gestión de tareas</Text>

          <Text style={styles.headerTitle}>{titleMap[status]}</Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name={iconMap[status]} size={30} color="#fff" />
        </View>
      </View>

      {/* BOTÓN CREAR */}

      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: colorMap[status],

            shadowColor: colorMap[status],
          },
        ]}
        onPress={() => navigation.navigate("CreateTask")}
      >
        <Ionicons name="add" size={22} color="#fff" />

        <Text style={styles.addButtonText}>Nueva tarea</Text>
      </TouchableOpacity>

      {/* TASKS */}

      <View style={styles.content}>
        {filtered.length === 0 && (
          <View
            style={[
              styles.emptyCard,
              {
                borderColor: colorMap[status],
              },
            ]}
          >
            <Ionicons name="document-text-outline" size={54} color="#cbd5e1" />

            <Text style={styles.emptyTitle}>No hay tareas</Text>

            <Text style={styles.emptyText}>
              Aquí aparecerán las tareas correspondientes.
            </Text>
          </View>
        )}

        {filtered.map((task) => (
          <View
            key={task.taskId}
            style={[
              styles.card,
              {
                borderColor: colorMap[status],
              },
            ]}
          >
            {/* TOP */}

            <View style={styles.cardTop}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: colorMap[status] + "15",
                  },
                ]}
              >
                <Ionicons
                  name={iconMap[status]}
                  size={26}
                  color={colorMap[status]}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{task.taskTitle}</Text>

                {!!task.taskDescription && (
                  <Text style={styles.description}>{task.taskDescription}</Text>
                )}

                <Text
                  style={[
                    styles.taskStatus,
                    {
                      color: colorMap[status],
                    },
                  ]}
                >
                  {titleMap[status]}
                </Text>
              </View>
            </View>

            {/* ACTIONS */}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 14,
              }}
            >
              {/* ELIMINAR */}

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(task.taskId)}
              >
                <Ionicons name="trash-outline" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* PENDING */}

            {status === "PENDING" && (
              <TouchableOpacity
                style={styles.redButton}
                onPress={() => moveToInProgress(task.taskId)}
              >
                <Ionicons name="play" size={18} color="#fff" />

                <Text style={styles.buttonText}>Realizar tarea</Text>
              </TouchableOpacity>
            )}

            {/* IN PROGRESS */}

            {status === "IN_PROGRESS" && (
              <>
                <TouchableOpacity
                  style={styles.orangeButton}
                  onPress={() => moveToCompleted(task.taskId)}
                >
                  <Ionicons name="checkmark" size={18} color="#fff" />

                  <Text style={styles.buttonText}>Finalizar tarea</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.grayButton}
                  onPress={() => moveToPending(task.taskId)}
                >
                  <Ionicons name="arrow-undo" size={18} color="#fff" />

                  <Text style={styles.buttonText}>Devolver</Text>
                </TouchableOpacity>
              </>
            )}

            {/* COMPLETED */}

            {status === "COMPLETED" && (
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => moveToInProgress(task.taskId)}
              >
                <Ionicons name="refresh" size={18} color="#fff" />

                <Text style={styles.buttonText}>Reabrir tarea</Text>
              </TouchableOpacity>
            )}
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
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 34,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor: "rgba(255,255,255,0.95)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  headerSubtitle: {
    color: "#f8fafc",
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

    backgroundColor: "rgba(255,255,255,0.18)",

    justifyContent: "center",
    alignItems: "center",
  },

  addButton: {
    marginHorizontal: 22,
    marginTop: 24,

    borderRadius: 22,

    paddingVertical: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 5,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 10,
  },

  content: {
    padding: 22,
  },

  card: {
    backgroundColor: "#fff",

    borderWidth: 2,

    borderRadius: 28,

    padding: 22,

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,

    elevation: 4,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  iconContainer: {
    width: 58,
    height: 58,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },

  description: {
    marginTop: 6,
    color: "#64748b",
    fontSize: 14,
    lineHeight: 20,
  },

  taskStatus: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "700",
  },

  editButton: {
    width: 50,
    height: 50,

    borderRadius: 16,

    backgroundColor: "#3b82f6",

    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    width: 50,
    height: 50,

    borderRadius: 16,

    backgroundColor: "#ef4444",

    justifyContent: "center",
    alignItems: "center",
  },

  redButton: {
    backgroundColor: "#ef4444",

    paddingVertical: 16,

    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },

  orangeButton: {
    backgroundColor: "#f59e0b",

    paddingVertical: 16,

    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",

    marginBottom: 12,
  },

  greenButton: {
    backgroundColor: "#22c55e",

    paddingVertical: 16,

    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },

  grayButton: {
    backgroundColor: "#64748b",

    paddingVertical: 16,

    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    marginLeft: 8,
  },

  emptyCard: {
    backgroundColor: "#fff",

    borderWidth: 2,

    borderRadius: 28,

    padding: 40,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,

    elevation: 4,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 18,
    color: "#111827",
  },

  emptyText: {
    marginTop: 8,
    textAlign: "center",
    color: "#64748b",
    lineHeight: 22,
  },
});
