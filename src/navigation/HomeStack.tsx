import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import AnimalsScreen from "../screens/animals/AnimalsScreen";
import ProductionScreen from "../screens/production/ProductionScreen";
import SalesScreen from "../screens/sales/SalesScreen";
import SocialScreen from "../screens/social/SocialScreen";
import ChatScreen from "../screens/social/ChatScreen";
import AIScreen from "../screens/ai/AIScreen";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import AnimalDetailsScreen from "../screens/animals/AnimalDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Production" component={ProductionScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
      <Stack.Screen name="Animals" component={AnimalsScreen} />
      <Stack.Screen name="AnimalDetails" component={AnimalDetailsScreen} />
      <Stack.Screen name="Social" component={SocialScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="AI" component={AIScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
