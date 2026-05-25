import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  status: "Pendiente" | "En curso" | "Completada";
};

export default function TaskCard({ title, status }: Props) {
  const getColor = () => {
    if (status === "Pendiente") return colors.pending;
    if (status === "En curso") return colors.inProgress;
    return colors.done;
  };

  const getIcon = () => {
    if (status === "Pendiente") return "time-outline";
    if (status === "En curso") return "sync-outline";
    return "checkmark-circle-outline";
  };

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* Icono */}
      <View
        style={{
          backgroundColor: getColor() + "20",
          padding: 10,
          borderRadius: 12,
          marginRight: 12,
        }}
      >
        <Ionicons name={getIcon()} size={22} color={getColor()} />
      </View>

      {/* Texto */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "600", color: colors.text }}>
          {title}
        </Text>
        <Text style={{ color: getColor(), fontSize: 13 }}>
          {status}
        </Text>
      </View>
    </View>
  );
}