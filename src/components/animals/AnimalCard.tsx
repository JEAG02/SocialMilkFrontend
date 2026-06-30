import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

type Props = {
  name: string;
  id: string;
  breed: string;
  age: string;
  production: string;
  status: "Produciendo" | "Gestación" | "Seca";
};

export default function AnimalCard({
  name,
  id,
  breed,
  age,
  production,
  status,
}: Props) {
  const isProducing = status === "Produciendo";

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 16,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      {/* HEADER */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* ICON */}
        <View
          style={{
            backgroundColor: isProducing ? "#3B82F6" : colors.primary,
            padding: 12,
            borderRadius: 12,
            marginRight: 12,
          }}
        >
          <Ionicons name="paw-outline" size={22} color="#fff" />
        </View>

        {/* INFO */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
          <Text style={{ color: colors.gray }}>ID: {id}</Text>
        </View>

        {/* STATUS */}
        <View
          style={{
            backgroundColor: isProducing
              ? colors.success + "20"
              : colors.warning + "20",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: isProducing ? colors.success : colors.warning,
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {status}
          </Text>
        </View>
      </View>

      {/* BODY */}
      <View style={{ marginTop: 12 }}>
        <Text>🧬 {breed}</Text>
        <Text>📅 {age}</Text>
        <Text>🥛 {production}</Text>
      </View>
    </View>
  );
}
