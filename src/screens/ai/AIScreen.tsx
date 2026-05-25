import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import { useState } from "react";

import Ionicons
from "@expo/vector-icons/Ionicons";

export default function AIScreen({
  navigation,
}: any) {

  const [message, setMessage]
    = useState("");

  const messages = [
    {
      id: 1,
      type: "ai",
      text:
        "Hola 👋 Soy tu asistente virtual ganadero. ¿En qué puedo ayudarte hoy?",
    },
    {
      id: 2,
      type: "user",
      text:
        "¿Cómo puedo mejorar la producción lechera?",
    },
    {
      id: 3,
      type: "ai",
      text:
        "Puedes mejorar la alimentación, controlar la hidratación y mantener un monitoreo constante del ganado.",
    },
  ];

  return (
    <View style={styles.container}>

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

          <View>

            <Text style={styles.subtitle}>
              Inteligencia Artificial
            </Text>

            <Text style={styles.title}>
              Asistente IA
            </Text>

          </View>

        </View>

        <View style={styles.headerIcon}>

          <Ionicons
            name="sparkles"
            size={28}
            color="#fff"
          />

        </View>

      </View>

      {/* QUICK ACTIONS */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickContainer}
      >

        <TouchableOpacity
          style={styles.quickButton}
        >
          <Text style={styles.quickText}>
            Producción
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
        >
          <Text style={styles.quickText}>
            Alimentación
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
        >
          <Text style={styles.quickText}>
            Vacunas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
        >
          <Text style={styles.quickText}>
            Enfermedades
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* CHAT */}

      <ScrollView
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      >

        {messages.map((msg) => (

          <View
            key={msg.id}
            style={[
              styles.messageRow,

              msg.type === "user"
                ? styles.userRow
                : styles.aiRow,
            ]}
          >

            {msg.type === "ai" && (

              <View style={styles.aiAvatar}>

                <Ionicons
                  name="sparkles"
                  size={22}
                  color="#06b6d4"
                />

              </View>
            )}

            <View
              style={[
                styles.messageBubble,

                msg.type === "user"
                  ? styles.userBubble
                  : styles.aiBubble,
              ]}
            >

              <Text
                style={[
                  styles.messageText,

                  msg.type === "user"
                    ? styles.userText
                    : styles.aiText,
                ]}
              >
                {msg.text}
              </Text>

            </View>

          </View>
        ))}

        <View style={{ height: 120 }} />

      </ScrollView>

      {/* INPUT */}

      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Escribe tu pregunta..."
          placeholderTextColor="#94a3b8"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendButton}
        >

          <Ionicons
            name="send"
            size={22}
            color="#fff"
          />

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  header: {

    backgroundColor: "#06b6d4",

    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 34,

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
    color: "#cffafe",
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

  quickContainer: {
    paddingLeft: 22,
    marginTop: 20,
    maxHeight: 60,
  },

  quickButton: {

    backgroundColor: "#fff",

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 18,

    marginRight: 12,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
  },

  quickText: {
    color: "#0f172a",
    fontWeight: "700",
  },

  chatContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
  },

  messageRow: {
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "flex-end",
  },

  aiRow: {
    justifyContent: "flex-start",
  },

  userRow: {
    justifyContent: "flex-end",
  },

  aiAvatar: {

    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: "#ecfeff",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  messageBubble: {

    maxWidth: "78%",

    borderRadius: 24,

    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  aiBubble: {
    backgroundColor: "#fff",
  },

  userBubble: {
    backgroundColor: "#06b6d4",
  },

  messageText: {
    fontSize: 15,
    lineHeight: 24,
  },

  aiText: {
    color: "#0f172a",
  },

  userText: {
    color: "#fff",
  },

  inputContainer: {

    position: "absolute",

    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: "#fff",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 16,

    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },

  input: {

    flex: 1,

    backgroundColor: "#f8fafc",

    borderRadius: 18,

    paddingHorizontal: 18,
    paddingVertical: 16,

    fontSize: 15,

    marginRight: 14,
  },

  sendButton: {

    width: 56,
    height: 56,

    borderRadius: 18,

    backgroundColor: "#06b6d4",

    justifyContent: "center",
    alignItems: "center",
  },
});