import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import Ionicons
from "@expo/vector-icons/Ionicons";

export default function ProductionScreen({
  navigation,
}: any) {

  const [liters, setLiters]
    = useState("");

  const [shift, setShift]
    = useState("");

  const [notes, setNotes]
    = useState("");

  const productions = [
    {
      id: 1,
      liters: "450 L",
      shift: "Mañana",
      date: "Hoy",
    },
    {
      id: 2,
      liters: "390 L",
      shift: "Tarde",
      date: "Ayer",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

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
        Registro diario
      </Text>

      <Text style={styles.title}>
        Producción
      </Text>

    </View>

  </View>

  {/* RIGHT */}

  <View style={styles.headerIcon}>

    <Ionicons
      name="water"
      size={28}
      color="#fff"
    />

  </View>

</View>

      {/* FORM */}

      <View style={styles.formCard}>

        <Text style={styles.sectionTitle}>
          Nueva Producción
        </Text>

        {/* LITROS */}

        <Text style={styles.label}>
          Litros producidos
        </Text>

        <TextInput
          placeholder="Ej: 450"
          placeholderTextColor="#94a3b8"
          value={liters}
          onChangeText={setLiters}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* TURNO */}

        <Text style={styles.label}>
          Turno
        </Text>

        <TextInput
          placeholder="Mañana / Tarde"
          placeholderTextColor="#94a3b8"
          value={shift}
          onChangeText={setShift}
          style={styles.input}
        />

        {/* OBSERVACIONES */}

        <Text style={styles.label}>
          Observaciones
        </Text>

        <TextInput
          placeholder="Escribe observaciones..."
          placeholderTextColor="#94a3b8"
          value={notes}
          onChangeText={setNotes}
          multiline
          style={styles.textArea}
        />

        {/* BUTTON */}

        <TouchableOpacity
          style={styles.saveButton}
        >

          <Ionicons
            name="save-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Guardar producción
          </Text>

        </TouchableOpacity>

      </View>

      {/* HISTORIAL */}

      <View style={styles.historyContainer}>

        <Text style={styles.historyTitle}>
          Historial reciente
        </Text>

        {productions.map((item) => (

          <View
            key={item.id}
            style={styles.productionCard}
          >

            <View
              style={styles.productionIcon}
            >

              <Ionicons
                name="water-outline"
                size={26}
                color="#3b82f6"
              />

            </View>

            <View style={{ flex: 1 }}>

              <Text
                style={styles.productionLiters}
              >
                {item.liters}
              </Text>

              <Text
                style={styles.productionInfo}
              >
                Turno {item.shift}
              </Text>

            </View>

            <Text style={styles.date}>
              {item.date}
            </Text>

          </View>
        ))}

      </View>

      <View style={{ height: 50 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  header: {

    backgroundColor: "#3b82f6",

    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 40,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subtitle: {
    color: "#dbeafe",
    fontSize: 15,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 6,
  },

  headerIcon: {

    width: 60,
    height: 60,

    borderRadius: 20,

    backgroundColor:
      "rgba(255,255,255,0.18)",

    justifyContent: "center",
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

  formCard: {

    backgroundColor: "#fff",

    margin: 22,
    padding: 24,

    borderRadius: 28,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,

    elevation: 4,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 24,
    color: "#111827",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
  },

  input: {

    backgroundColor: "#f8fafc",

    borderRadius: 18,

    paddingHorizontal: 18,
    paddingVertical: 16,

    marginBottom: 20,

    fontSize: 15,

    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  textArea: {

    backgroundColor: "#f8fafc",

    borderRadius: 18,

    paddingHorizontal: 18,
    paddingVertical: 16,

    height: 120,

    textAlignVertical: "top",

    marginBottom: 24,

    fontSize: 15,

    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  saveButton: {

    backgroundColor: "#3b82f6",

    paddingVertical: 18,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 10,
  },

  historyContainer: {
    paddingHorizontal: 22,
  },

  historyTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 18,
    color: "#111827",
  },

  productionCard: {

    backgroundColor: "#fff",

    borderRadius: 24,

    padding: 20,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  productionIcon: {

    width: 58,
    height: 58,

    borderRadius: 18,

    backgroundColor: "#dbeafe",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  productionLiters: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },

  productionInfo: {
    marginTop: 4,
    color: "#64748b",
    fontWeight: "600",
  },

  date: {
    color: "#94a3b8",
    fontWeight: "700",
  },
});