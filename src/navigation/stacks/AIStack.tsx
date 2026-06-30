import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();

function AIScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Asistente IA 🤖</Text>
    </View>
  );
}

export default function AIStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AIMain" component={AIScreen} />
    </Stack.Navigator>
  );
}
