import { View, ScrollView, Text } from "react-native";

import HomeTasksPanel from "../../components/home/HomeTasksPanel";
import MenuCard from "../../components/common/MenuCard";

export default function HomeScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f8fafc",
      }}
    >
      <ScrollView>
        
        {/* HEADER + TAREAS */}
        <HomeTasksPanel />

        {/* MENÚ */}
        <View
          style={{
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              marginBottom: 20,
              color: "#0f172a",
            }}
          >
            Menú Principal
          </Text>

          <MenuCard
  title="Registro de Producción"
  icon="clipboard"
  color="#3b82f6"
  onPress={() => navigation.navigate("Production")}
/>

<MenuCard
  title="Registro de Ventas"
  icon="cart"
  color="#22c55e"
  onPress={() => navigation.navigate("Sales")}
/>

<MenuCard
  title="Lista de Animales"
  icon="paw"
  color="#f59e0b"
  onPress={() => navigation.navigate("AnimalsDetails")}
/>

<MenuCard
  title="Red Social"
  icon="people"
  color="#a855f7"
  onPress={() => navigation.navigate("SocialDetails")}
/>

<MenuCard
  title="Chat con Productores"
  icon="chatbubble"
  color="#0d9488"
  onPress={() => navigation.navigate("Chat")}
/>

<MenuCard
  title="Asistente Virtual"
  icon="hardware-chip"
  color="#6366f1"
  onPress={() => navigation.navigate("AIChat")}
/>

<MenuCard
  title="Dashboard Avanzado"
  icon="stats-chart"
  color="#14b8a6"
  onPress={() => navigation.navigate("Dashboard")}
/>
<MenuCard
  title="Mi Perfil"
  icon="person"
  color="#0f172a"
  onPress={() =>
    navigation.navigate("Profile")
  }
/>
        </View>
      </ScrollView>
    </View>
  );
}