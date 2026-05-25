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

export default function SalesScreen({
  navigation,
}: any) {

  const [client, setClient]
    = useState("");

  const [amount, setAmount]
    = useState("");

  const [liters, setLiters]
    = useState("");

  const [notes, setNotes]
    = useState("");

  const sales = [
    {
      id: 1,
      client: "Lácteos del Norte",
      amount: "$450.000",
      liters: "420 L",
      date: "Hoy",
    },
    {
      id: 2,
      client: "Cooperativa Milk",
      amount: "$320.000",
      liters: "300 L",
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
              Registro comercial
            </Text>

            <Text style={styles.title}>
              Ventas
            </Text>

          </View>

        </View>

        <View style={styles.headerIcon}>

          <Ionicons
            name="cash-outline"
            size={28}
            color="#fff"
          />

        </View>

      </View>

      {/* FORM */}

      <View style={styles.formCard}>

        <Text style={styles.sectionTitle}>
          Nueva Venta
        </Text>

        {/* CLIENTE */}

        <Text style={styles.label}>
          Cliente
        </Text>

        <TextInput
          placeholder="Nombre del cliente"
          placeholderTextColor="#94a3b8"
          value={client}
          onChangeText={setClient}
          style={styles.input}
        />

        {/* MONTO */}

        <Text style={styles.label}>
          Valor de venta
        </Text>

        <TextInput
          placeholder="Ej: 450000"
          placeholderTextColor="#94a3b8"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* LITROS */}

        <Text style={styles.label}>
          Litros vendidos
        </Text>

        <TextInput
          placeholder="Ej: 420"
          placeholderTextColor="#94a3b8"
          value={liters}
          onChangeText={setLiters}
          keyboardType="numeric"
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
            Guardar venta
          </Text>

        </TouchableOpacity>

      </View>

      {/* HISTORIAL */}

      <View style={styles.historyContainer}>

        <Text style={styles.historyTitle}>
          Ventas recientes
        </Text>

        {sales.map((item) => (

          <View
            key={item.id}
            style={styles.saleCard}
          >

            <View style={styles.saleIcon}>

              <Ionicons
                name="wallet-outline"
                size={26}
                color="#16a34a"
              />

            </View>

            <View style={{ flex: 1 }}>

              <Text style={styles.saleAmount}>
                {item.amount}
              </Text>

              <Text style={styles.saleClient}>
                {item.client}
              </Text>

              <Text style={styles.saleLiters}>
                {item.liters}
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

    backgroundColor: "#16a34a",

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

    backgroundColor:
      "rgba(255,255,255,0.92)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  subtitle: {
    color: "#dcfce7",
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

    backgroundColor: "#16a34a",

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

  saleCard: {

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

  saleIcon: {

    width: 58,
    height: 58,

    borderRadius: 18,

    backgroundColor: "#dcfce7",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  saleAmount: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },

  saleClient: {
    marginTop: 4,
    color: "#475569",
    fontWeight: "700",
  },

  saleLiters: {
    marginTop: 2,
    color: "#16a34a",
    fontWeight: "700",
  },

  date: {
    color: "#16a34a",
    fontWeight: "700",
  },
});