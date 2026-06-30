import { View, Image, TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function ImageViewerScreen({ route, navigation }: any) {
  const { imageUrl } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 60,
          left: 20,
          zIndex: 10,
        }}
      >
        <Ionicons name="close" size={36} color="#fff" />
      </TouchableOpacity>

      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          flex: 1,
          width: "100%",
        }}
        resizeMode="contain"
      />
    </View>
  );
}
