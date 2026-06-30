import React, { useRef, useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Animated,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { createAiInteraction } from "../../services/aiService";
import { useAuth } from "../../context/AuthContext";

export default function AIScreen({ navigation }: any) {
  const { user } = useAuth();

  const [message, setMessage] = useState("");

  const [loadingAI, setLoadingAI] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "ai",
      text: "Hola 👋 Soy tu asistente virtual ganadero. ¿En qué puedo ayudarte hoy?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 120);
  }, [messages]);

  const askQuestion = async (question: string) => {
    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      text: question,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev: any) => [...prev, userMessage]);

    setLoadingAI(true);

    try {
      const response = await createAiInteraction(user.profileId, question);

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text:
          response.responseText ||
          response.answer ||
          response.message ||
          "No se obtuvo respuesta.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev: any) => [...prev, aiMessage]);
    } catch {
      setMessages((prev: any) => [
        ...prev,

        {
          id: (Date.now() + 2).toString(),
          type: "ai",
          text: "Ocurrió un error consultando la IA.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoadingAI(false);
  };

  const sendCustomQuestion = () => {
    if (!message.trim()) return;

    askQuestion(message);

    setMessage("");
  };

  const quickQuestions = [
    "Producción",
    "Ventas",
    "Inventario",
    "Animales",
    "Salud",
    "Posts",
  ];
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
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
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>

            <View>
              <Text style={styles.subtitle}>Inteligencia Artificial</Text>

              <Text style={styles.title}>Asistente IA</Text>
            </View>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="sparkles" size={28} color="#fff" />
          </View>
        </View>

        {/* BOTONES */}

        <View style={styles.quickContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={quickQuestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => askQuestion(item.toLowerCase())}
              >
                <Text style={styles.quickText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* CHAT */}

        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
          }}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item: any) => item.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 10,
            }}
            renderItem={({ item }: any) => (
              <View
                style={[
                  styles.messageRow,
                  item.type === "user" ? styles.userRow : styles.aiRow,
                ]}
              >
                {item.type === "ai" && (
                  <View style={styles.aiAvatar}>
                    <Ionicons name="sparkles" size={20} color="#06b6d4" />
                  </View>
                )}

                <View
                  style={[
                    styles.messageBubble,
                    item.type === "user" ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      item.type === "user" ? styles.userText : styles.aiText,
                    ]}
                  >
                    {item.text}
                  </Text>

                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 11,
                      opacity: 0.6,
                      alignSelf: "flex-end",
                    }}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            )}
          />

          {loadingAI && (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 25,
                marginBottom: 12,
                alignItems: "center",
              }}
            >
              <Ionicons name="sparkles" size={18} color="#06b6d4" />

              <Text
                style={{
                  marginLeft: 10,
                  color: "#64748b",
                  fontStyle: "italic",
                }}
              >
                La IA está escribiendo...
              </Text>
            </View>
          )}
        </Animated.View>

        {/* INPUT */}

        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Escribe una pregunta..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendCustomQuestion}
          >
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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

    backgroundColor: "rgba(255,255,255,0.92)",

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

    backgroundColor: "rgba(255,255,255,0.18)",

    justifyContent: "center",
    alignItems: "center",
  },

  quickContainer: {
    paddingVertical: 16,
    paddingLeft: 20,
    backgroundColor: "#f1f5f9",
  },

  quickButton: {
    backgroundColor: "#fff",

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 18,

    marginRight: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  quickText: {
    color: "#0f172a",
    fontWeight: "700",
  },

  messageRow: {
    flexDirection: "row",
    marginBottom: 18,
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

    borderRadius: 21,

    backgroundColor: "#ecfeff",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  messageBubble: {
    maxWidth: "78%",

    borderRadius: 22,

    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  aiBubble: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,

    elevation: 2,
  },

  userBubble: {
    backgroundColor: "#06b6d4",
    borderTopRightRadius: 8,
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
    flexDirection: "row",
    alignItems: "flex-end",

    backgroundColor: "#fff",

    paddingHorizontal: 16,
    paddingVertical: 12,

    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  input: {
    flex: 1,

    backgroundColor: "#f8fafc",

    borderRadius: 20,

    paddingHorizontal: 18,
    paddingVertical: 14,

    fontSize: 15,

    maxHeight: 120,

    marginRight: 12,
  },

  sendButton: {
    width: 54,
    height: 54,

    borderRadius: 18,

    backgroundColor: "#06b6d4",

    justifyContent: "center",
    alignItems: "center",
  },
  chatWrapper: {
    flex: 1,
  },
});
