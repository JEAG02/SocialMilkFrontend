import { View, Text } from "react-native";

import { TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";

import { useTasks } from "../../context/TasksContext";

export default function HomeTasksPanel() {
  const navigation: any = useNavigation();

  const { tasks } = useTasks();

  // =========================
  // CONTADORES
  // =========================

  const pending = tasks.filter((t) => t.status === 0).length;

  const inProgress = tasks.filter((t) => t.status === 1).length;

  const completed = tasks.filter((t) => t.status === 2).length;

  return (
    <View
      style={{
        backgroundColor: "#16a34a",
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}
    >
      {/* HEADER */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 34,
            fontWeight: "800",
          }}
        >
          Mi Producción
        </Text>

        <Ionicons name="grid-outline" size={34} color="white" />
      </View>

      {/* CARD PENDIENTES */}

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 22,
          padding: 20,
          marginBottom: 16,

          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,

          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              backgroundColor: "#ef4444",

              justifyContent: "center",
              alignItems: "center",

              marginRight: 18,
            }}
          >
            <Ionicons name="clipboard-outline" size={28} color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 13,
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 4,
              }}
            >
              Tareas pendientes
            </Text>

            <Text
              style={{
                fontSize: 42,
                fontWeight: "900",
                color: "#0f172a",
                lineHeight: 44,
              }}
            >
              {pending}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 18,
            backgroundColor: "#ffefef",
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("Tasks", {
              status: "PENDING",
            })
          }
        >
          <Text
            style={{
              color: "#ef4444",
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            Ver detalles
          </Text>
        </TouchableOpacity>
      </View>

      {/* CARD EN CURSO */}

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 22,
          padding: 20,
          marginBottom: 16,

          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,

          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              backgroundColor: "#F59E0B",

              justifyContent: "center",
              alignItems: "center",

              marginRight: 18,
            }}
          >
            <Ionicons name="reload-circle-outline" size={30} color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 13,
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 4,
              }}
            >
              Tareas en curso
            </Text>

            <Text
              style={{
                fontSize: 42,
                fontWeight: "900",
                color: "#0f172a",
                lineHeight: 44,
              }}
            >
              {inProgress}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 18,
            backgroundColor: "#fff7ed",
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("Tasks", {
              status: "IN_PROGRESS",
            })
          }
        >
          <Text
            style={{
              color: "#ea580c",
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            Ver detalles
          </Text>
        </TouchableOpacity>
      </View>

      {/* CARD COMPLETADAS */}

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 22,
          padding: 20,

          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,

          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              backgroundColor: "#22C55E",

              justifyContent: "center",
              alignItems: "center",

              marginRight: 18,
            }}
          >
            <Ionicons
              name="checkmark-done-circle-outline"
              size={30}
              color="white"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 13,
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 4,
              }}
            >
              Tareas completadas
            </Text>

            <Text
              style={{
                fontSize: 42,
                fontWeight: "900",
                color: "#0f172a",
                lineHeight: 44,
              }}
            >
              {completed}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 18,
            backgroundColor: "#f0fdf4",
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("Tasks", {
              status: "COMPLETED",
            })
          }
        >
          <Text
            style={{
              color: "#16a34a",
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            Ver detalles
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
