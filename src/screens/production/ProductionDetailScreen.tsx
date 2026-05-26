import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  getProductionById,
} from "../../services/productionService";

import {
  useAnimals,
} from "../../context/AnimalsContext";

import {
  deleteProduction,
} from "../../services/productionService";

export default function ProductionDetailScreen({
  route,
  navigation,
}: any) {

  const { productionId } =
    route.params;

  const { animals } =
    useAnimals();

  const [
    production,
    setProduction,
  ] = useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadProduction();

  }, []);
  const handleDelete =
  async () => {

  Alert.alert(
    "Eliminar",
    "¿Deseas eliminar esta producción?",
    [

      {
        text: "Cancelar",
        style: "cancel",
      },

      {
        text: "Eliminar",

        style: "destructive",

        onPress: async () => {

          try {

            await deleteProduction(
              production.productionId
            );

            Alert.alert(
              "Éxito",
              "Producción eliminada"
            );

            navigation.navigate(
              "Production"
            );

          } catch (error) {

            console.log(error);

            Alert.alert(
              "Error",
              "No se pudo eliminar"
            );
          }
        },
      },
    ]
  );
};

  const loadProduction =
    async () => {

    try {

      const data =
        await getProductionById(
          productionId
        );

      setProduction(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#3b82f6"
        />

      </View>
    );
  }

  const animal =
    animals.find(
      (a: any) =>
        a.animalId ===
        production.animalId
    );

  return (

    <ScrollView
      style={styles.container}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          style={styles.backButton}
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color="#111827"
          />

        </TouchableOpacity>

        <View>

          <Text style={styles.subtitle}>
            Detalle
          </Text>

          <Text style={styles.title}>
            Producción
          </Text>

        </View>

      </View>

      {/* CARD */}

      <View style={styles.card}>

        <Text style={styles.label}>
          Animal
        </Text>

        <Text style={styles.value}>
          {
            animal?.animalName
          }
        </Text>

        <Text style={styles.label}>
          Litros producidos
        </Text>

        <Text style={styles.value}>
          {
            production.milkVolumeLiters
          } L
        </Text>

        <Text style={styles.label}>
          Turno
        </Text>

        <Text style={styles.value}>
          {production.shift}
        </Text>

        <Text style={styles.label}>
          Fecha
        </Text>

        <Text style={styles.value}>
          {
            new Date(
              production.productionDate
            ).toLocaleDateString()
          }
        </Text>

      </View>
          {production && (

  <TouchableOpacity
    style={styles.editButton}
    onPress={() =>
      navigation.navigate(
        "UpdateProduction",
        {
          production,
        }
      )
    }
  >

    <Ionicons
      name="create-outline"
      size={22}
      color="#fff"
    />

    <Text style={styles.editButtonText}>
      Editar producción
    </Text>

  </TouchableOpacity>
)}
<TouchableOpacity
  style={styles.deleteButton}
  onPress={handleDelete}
>

  <Ionicons
    name="trash-outline"
    size={22}
    color="#fff"
  />

  <Text style={styles.deleteButtonText}>
    Eliminar producción
  </Text>

</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {

    backgroundColor: "#3b82f6",

    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 40,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {

    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor:
      "rgba(255,255,255,0.92)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  subtitle: {
    color: "#dbeafe",
    fontSize: 14,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 4,
  },

  card: {

    backgroundColor: "#fff",

    margin: 24,
    padding: 24,

    borderRadius: 24,
  },

  label: {
    color: "#64748b",
    fontWeight: "700",
    marginTop: 18,
  },

  value: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 6,
  },
  editButton: {

  backgroundColor: "#3b82f6",

  paddingVertical: 18,

  borderRadius: 40,

  justifyContent: "center",
  alignItems: "center",

  flexDirection: "row",

  marginTop: 30,
},

editButtonText: {

  color: "#fff",

  fontSize: 16,

  fontWeight: "800",

  marginLeft: 0,
},
deleteButton: {

  backgroundColor: "#ef4444",

  paddingVertical: 18,

  borderRadius: 20,

  justifyContent: "center",
  alignItems: "center",

  flexDirection: "row",

  marginTop: 16,
},

deleteButtonText: {

  color: "#fff",

  fontSize: 16,

  fontWeight: "800",

  marginLeft: 10,
},
});
