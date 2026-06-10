import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  getAnimalById,
  deleteAnimal,
} from "../../services/animalsService";

import React from "react";

import {
  useFocusEffect,
} from "@react-navigation/native";

export default function AnimalDetailsScreen({
  route,
  navigation,
}: any) {

  const { animalId } = route.params;

  const [animal, setAnimal] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useFocusEffect(
  React.useCallback(() => {

    loadAnimal();

  }, [])
);

  // =========================
  // LOAD ANIMAL
  // =========================

  const loadAnimal = async () => {

    try {

      const data =
        await getAnimalById(
          animalId
        );

      setAnimal(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = () => {

    Alert.alert(
      "Eliminar animal",
      "¿Deseas eliminar este animal?",
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

              await deleteAnimal(
                animal.animalId
              );

              Alert.alert(
                "Éxito",
                "Animal eliminado correctamente"
              );

              navigation.goBack();

            } catch (error) {

              console.log(error);

              Alert.alert(
                "Error",
                "No se pudo eliminar el animal"
              );
            }
          },
        },
      ]
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color="#f59e0b"
        />

      </View>
    );
  }

  if (!animal) return null;

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.goBack()
          }
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color="#111827"
          />

        </TouchableOpacity>

        <View style={styles.headerContent}>

          <Text style={styles.headerSubtitle}>
            Información animal
          </Text>

          <Text style={styles.headerTitle}>
            {animal.animalName}
          </Text>

        </View>

      </View>

      {/* IMAGE */}

      <View style={styles.imageContainer}>

        <Image
          source={{
            uri:
              "https://cdn-icons-png.flaticon.com/512/1998/1998610.png",
          }}
          style={styles.image}
        />

      </View>

      {/* INFO CARD */}

      <View style={styles.card}>

        {/* TYPE */}

        <View style={styles.row}>

          <Ionicons
            name="paw"
            size={22}
            color="#f59e0b"
          />

          <View style={styles.info}>

            <Text style={styles.label}>
              Tipo
            </Text>

            <Text style={styles.value}>
              {animal.animalType}
            </Text>

          </View>

        </View>

        {/* BREED */}

        <View style={styles.row}>

          <Ionicons
            name="ribbon"
            size={22}
            color="#f59e0b"
          />

          <View style={styles.info}>

            <Text style={styles.label}>
              Raza
            </Text>

            <Text style={styles.value}>
              {animal.animalBreed}
            </Text>

          </View>

        </View>

        {/* STATUS */}

        <View style={styles.row}>

          <Ionicons
            name="pulse"
            size={22}
            color="#f59e0b"
          />

          <View style={styles.info}>

            <Text style={styles.label}>
              Estado
            </Text>

            <Text style={styles.value}>
              {animal.animalStatus}
            </Text>

          </View>

        </View>

        {/* DATE */}

        <View
          style={[
            styles.row,
            {
              marginBottom: 0,
            },
          ]}
        >

          <Ionicons
            name="calendar"
            size={22}
            color="#f59e0b"
          />

          <View style={styles.info}>

            <Text style={styles.label}>
              Fecha nacimiento
            </Text>

            <Text style={styles.value}>
              {animal.birthDate
                .split("T")[0]}
            </Text>

          </View>

        </View>

      </View>
      {/* HEALTH */}

<View style={styles.healthActions}>

  <TouchableOpacity
    style={styles.healthCard}
    onPress={() =>
      navigation.navigate(
        "AnimalHealthRecords",
        { animalId }
      )
    }
  >

    <Ionicons
      name="medkit"
      size={28}
      color="#fff"
    />

    <Text style={styles.healthCardText}>
      Historial Médico
    </Text>

  </TouchableOpacity>

  <TouchableOpacity
    style={styles.calendarCard}
    onPress={() =>
      navigation.navigate(
        "AnimalHealthEvent",
        { animalId }
      )
    }
  >

    <Ionicons
      name="calendar"
      size={28}
      color="#fff"
    />

    <Text style={styles.healthCardText}>
      Calendario Médico
    </Text>

  </TouchableOpacity>

</View>
      {/* ACTIONS */}

      <View style={styles.actions}>
        

        {/* EDIT */}

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate(
              "EditAnimal",
              {
                animal,
              }
            )
          }
        >

          <Ionicons
            name="create-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.actionText}>
            Editar
          </Text>

        </TouchableOpacity>

        {/* DELETE */}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >

          <Ionicons
            name="trash-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.actionText}>
            Eliminar
          </Text>

        </TouchableOpacity>

      </View>

      <View style={{ height: 60 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {

    backgroundColor: "#f59e0b",

    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 36,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {

    width: 50,
    height: 50,

    borderRadius: 18,

    backgroundColor:
      "rgba(255,255,255,0.9)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 18,
  },

  headerContent: {
    flex: 1,
  },

  headerSubtitle: {
    color: "#fef3c7",
    fontSize: 15,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 6,
  },

  imageContainer: {
    alignItems: "center",
    marginTop: -40,
  },

  image: {

    width: 140,
    height: 140,

    borderRadius: 30,

    backgroundColor: "#fff",

    borderWidth: 6,
    borderColor: "#fff",
  },

  card: {

    backgroundColor: "#fff",

    margin: 24,

    borderRadius: 28,

    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,

    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },

  info: {
    marginLeft: 18,
  },

  label: {
    color: "#94a3b8",
    fontSize: 14,
  },

  value: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 3,
  },

  actions: {

    flexDirection: "row",

    marginHorizontal: 24,
  },

  editButton: {

    flex: 1,

    backgroundColor: "#f59e0b",

    paddingVertical: 18,

    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginRight: 10,
  },

  deleteButton: {

    flex: 1,

    backgroundColor: "#ef4444",

    paddingVertical: 18,

    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
  },

  actionText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    marginLeft: 8,
  },
  healthActions: {

  marginHorizontal: 24,
  marginBottom: 20,
},

healthCard: {

  backgroundColor: "#3b82f6",

  borderRadius: 22,

  paddingVertical: 20,

  justifyContent: "center",
  alignItems: "center",

  marginBottom: 12,
},

calendarCard: {

  backgroundColor: "#16a34a",

  borderRadius: 22,

  paddingVertical: 20,

  justifyContent: "center",
  alignItems: "center",
},

healthCardText: {

  color: "#fff",

  fontSize: 16,
  fontWeight: "800",

  marginTop: 8,
},
});