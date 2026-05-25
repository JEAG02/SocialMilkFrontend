import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();

function SocialScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Red social 📱</Text>
    </View>
  );
}

export default function SocialStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SocialMain" component={SocialScreen} />
    </Stack.Navigator>
  );
}