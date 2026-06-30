import { View, Text } from "react-native";
import { colors } from "../../theme/colors";

export default function HomeHeader() {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 14, color: colors.gray }}>Bienvenido 👋</Text>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: colors.text,
        }}
      >
        Juan Esteban
      </Text>
    </View>
  );
}
