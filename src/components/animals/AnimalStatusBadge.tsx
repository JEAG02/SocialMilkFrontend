import { View, Text } from "react-native";

export default function AnimalStatusBadge({ status }: any) {
  const getColor = () => {
    switch (status) {
      case "Produciendo":
        return "#DCFCE7";

      case "Gestación":
        return "#FEF3C7";

      case "Seca":
        return "#E5E7EB";

      default:
        return "#DBEAFE";
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "Produciendo":
        return "#15803D";

      case "Gestación":
        return "#B45309";

      case "Seca":
        return "#374151";

      default:
        return "#1D4ED8";
    }
  };

  return (
    <View
      style={{
        backgroundColor: getColor(),
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
      }}
    >
      <Text
        style={{
          color: getTextColor(),
          fontSize: 12,
          fontWeight: "700",
        }}
      >
        {status}
      </Text>
    </View>
  );
}
