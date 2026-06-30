import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";

import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useFocusEffect } from "@react-navigation/native";

import { getAnimals } from "../../services/animalsService";

export default function AnimalsScreen({ navigation }: any) {
  const [animals, setAnimals] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD ANIMALS
  // =========================

  const loadAnimals = async () => {
    try {
      setLoading(true);

      const data = await getAnimals();

      console.log(data);

      setAnimals(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REFRESH ON SCREEN FOCUS
  // =========================

  useFocusEffect(
    React.useCallback(() => {
      loadAnimals();
    }, []),
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}

      <View style={styles.header}>
        {/* LEFT */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          {/* BACK */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          {/* TEXT */}

          <View>
            <Text style={styles.subtitle}>Gestión ganadera</Text>

            <Text style={styles.title}>Mis Animales</Text>
          </View>
        </View>

        {/* ICON */}

        <View style={styles.headerIcon}>
          <Ionicons name="paw" size={30} color="#fff" />
        </View>
      </View>

      {/* ADD BUTTON */}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateAnimal")}
      >
        <Ionicons name="add" size={24} color="#fff" />

        <Text style={styles.addButtonText}>Agregar animal</Text>
      </TouchableOpacity>

      {/* LOADING */}

      {loading && (
        <ActivityIndicator
          size="large"
          color="#f59e0b"
          style={{
            marginTop: 40,
          }}
        />
      )}

      {/* EMPTY */}

      {!loading && animals.length === 0 && (
        <View style={styles.emptyCard}>
          <Ionicons name="paw-outline" size={60} color="#cbd5e1" />

          <Text style={styles.emptyTitle}>No hay animales</Text>

          <Text style={styles.emptyText}>
            Registra tu primer animal para comenzar.
          </Text>
        </View>
      )}

      {/* LIST */}

      <View style={styles.content}>
        {animals.map((animal) => (
          <View key={animal.animalId} style={styles.card}>
            {/* TOP */}

            <View style={styles.cardTop}>
              <View style={styles.iconContainer}>
                <Ionicons name="paw" size={28} color="#f59e0b" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.animalName}>{animal.animalName}</Text>

                <Text style={styles.animalBreed}>{animal.animalBreed}</Text>
              </View>
            </View>

            {/* INFO */}

            <View style={styles.infoRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{animal.animalType}</Text>
              </View>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: "#ffedd5",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color: "#f59e0b",
                    },
                  ]}
                >
                  {animal.animalStatus}
                </Text>
              </View>
            </View>

            {/* BUTTON */}

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate("AnimalDetails", {
                  animalId: animal.animalId,
                })
              }
            >
              <Ionicons name="eye" size={18} color="#fff" />

              <Text style={styles.detailsButtonText}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
        ))}
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

  header: {
    backgroundColor: "#f59e0b",

    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 40,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor: "rgba(255,255,255,0.95)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  subtitle: {
    color: "#ffedd5",
    fontSize: 15,
    fontWeight: "600",
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 4,
  },

  headerIcon: {
    width: 64,
    height: 64,

    borderRadius: 22,

    backgroundColor: "rgba(255,255,255,0.2)",

    justifyContent: "center",
    alignItems: "center",
  },

  addButton: {
    backgroundColor: "#f59e0b",

    marginHorizontal: 22,
    marginTop: 24,

    borderRadius: 22,

    paddingVertical: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#f59e0b",
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 5,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 10,
  },

  content: {
    padding: 22,
  },

  card: {
    backgroundColor: "#fff",

    borderRadius: 28,

    padding: 22,

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,

    elevation: 4,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  iconContainer: {
    width: 62,
    height: 62,

    borderRadius: 18,

    backgroundColor: "#fff7ed",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  animalName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },

  animalBreed: {
    marginTop: 4,
    fontSize: 15,
    color: "#6b7280",
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 22,
  },

  badge: {
    backgroundColor: "#e2e8f0",

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 14,

    marginRight: 10,
  },

  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },

  detailsButton: {
    backgroundColor: "#f59e0b",

    paddingVertical: 16,

    borderRadius: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  detailsButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    marginLeft: 8,
  },

  emptyCard: {
    backgroundColor: "#fff",

    margin: 22,

    borderRadius: 28,

    padding: 40,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,

    elevation: 4,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginTop: 18,
  },

  emptyText: {
    marginTop: 10,
    textAlign: "center",
    color: "#64748b",
    lineHeight: 22,
  },
});
