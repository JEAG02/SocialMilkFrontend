import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimalsScreen from "../../screens/animals/AnimalsScreen";

const Stack = createNativeStackNavigator();

export default function AnimalsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AnimalsMain"
        component={AnimalsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
