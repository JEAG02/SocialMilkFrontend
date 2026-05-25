import { View, Text } from "react-native";
import { colors } from "../../theme/colors";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <View style={{ marginVertical: 12 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.text,
        }}
      >
        {title}
      </Text>
    </View>
  );
}