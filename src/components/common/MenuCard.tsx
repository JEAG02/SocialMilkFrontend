import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

export default function MenuCard({
  title,
  icon,
  color,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={30} color="#fff" />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Ionicons
        name="chevron-forward"
        size={24}
        color="#9ca3af"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,

    elevation: 5,
  },

  iconContainer: {
    width: 62,
    height: 62,
    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 18,
  },

  title: {
    flex: 1,

    fontSize: 21,
    fontWeight: "700",

    color: "#0f172a",
    lineHeight: 30,
  },
});