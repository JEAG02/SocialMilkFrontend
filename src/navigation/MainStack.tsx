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
import productionDetailScreen from "../screens/production/ProductionDetailScreen";
import UpdateProductionScreen from "../screens/production/UpdateProductionScreen";
import salesDetailScreen from "../screens/sales/SaleDetailScreen";
import updateSaleScreen from "../screens/sales/UpdateSaleScreen";
import userProfileScreen from "../screens/social/UserProfileScreen";
import postDetailScreen from "../screens/social/PostDetailScreen";
import AnimalHealthRecordsScreen from "../screens/animals/AnimalHealthRecordsScreen";
import AnimalHealthRecordFormScreen from "../screens/animals/AnimalHealthRecordFormScreen";
import CreateHealthRecord from "../screens/animals/AnimalHealthRecordFormScreen";
import EditHealthRecordScreen from "../screens/animals/EditHealthRecordScreen";
import AnimalHealtEventsScreen from "../screens/animals/AnimalHealthEventsScreen";
import EventDetailScreen from "../screens/animals/EventDetailScreen";
import EventHistoryScreen from "../screens/animals/EventHistoryScreen";
import MilkInventoryScreen from "../screens/dashboard/MilkInventoryScreen";
import ImageViewerScreen from "../screens/social/ImageViewerScreen";

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
      <Stack.Screen
        name="ProductionDetail"
        component={productionDetailScreen}
      />
      <Stack.Screen
        name="UpdateProduction"
        component={UpdateProductionScreen}
      />
      <Stack.Screen name="SaleDetail" component={salesDetailScreen} />
      <Stack.Screen name="UpdateSale" component={updateSaleScreen} />
      <Stack.Screen name="UserProfile" component={userProfileScreen} />
      <Stack.Screen name="PostDetail" component={postDetailScreen} />
      <Stack.Screen
        name="AnimalHealthRecords"
        component={AnimalHealthRecordsScreen}
      />
      <Stack.Screen
        name="AnimalHealthRecordForm"
        component={AnimalHealthRecordFormScreen}
      />
      <Stack.Screen name="CreateHealthRecord" component={CreateHealthRecord} />
      <Stack.Screen
        name="EditHealthRecord"
        component={EditHealthRecordScreen}
      />
      <Stack.Screen
        name="AnimalHealthEvent"
        component={AnimalHealtEventsScreen}
      />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="EventHistory" component={EventHistoryScreen} />
      <Stack.Screen name="MilkInventory" component={MilkInventoryScreen} />
      <Stack.Screen
        name="ImageViewer"
        component={ImageViewerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
