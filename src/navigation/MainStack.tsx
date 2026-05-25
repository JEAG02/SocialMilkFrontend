import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import AnimalsScreen from "../screens/animals/AnimalsScreen";
import ProductionScreen from "../screens/production/ProductionScreen";
import SalesScreen from "../screens/sales/SalesScreen";
import SocialScreen from "../screens/social/SocialScreen";
import ChatScreen from "../screens/social/ChatScreen";
import AIScreen from "../screens/ai/AIScreen";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import TasksScreen from "../screens/tasks/TasksScreen";
import AnimalDetailsScreen from "../screens/animals/AnimalDetailsScreen";
import CreateAnimalScreen from "../screens/animals/CreateAnimalScreen";
import EditAnimalScreen from "../screens/animals/EditAnimalScreen";
import createTaskScreen from "../screens/tasks/CreateTaskScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Production" component={ProductionScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
      <Stack.Screen name="AnimalsDetails" component={AnimalsScreen} />
      <Stack.Screen name="SocialDetails" component={SocialScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="AIChat" component={AIScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="CreateTask" component={createTaskScreen} />
      <Stack.Screen name="AnimalDetails" component={AnimalDetailsScreen} />
      <Stack.Screen name="CreateAnimal" component={CreateAnimalScreen} />
      <Stack.Screen name="EditAnimal" component={EditAnimalScreen} />
    </Stack.Navigator>
  );
}