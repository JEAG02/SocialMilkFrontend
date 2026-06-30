import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChatScreen({ navigation }: any) {
  const chats = [
    {
      id: 1,
      name: "Carlos Gómez",
      message: "¿Cómo va la producción hoy?",
      time: "09:42",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "María López",
      message: "Te envié la información del ganado.",
      time: "08:15",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Finca El Descanso",
      message: "Tenemos nuevo alimento premium.",
      time: "Ayer",
      unread: 4,
      online: true,
    },
    {
      id: 4,
      name: "Juan Herrera",
      message: "La vacuna llegó esta mañana.",
      time: "Ayer",
      unread: 1,
      online: false,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.subtitle}>Comunidad ganadera</Text>

            <Text style={styles.title}>Chats</Text>
          </View>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="chatbubbles" size={28} color="#fff" />
        </View>
      </View>

      {/* SEARCH */}

      <View style={styles.searchCard}>
        <Ionicons name="search" size={22} color="#94a3b8" />

        <Text style={styles.searchText}>Buscar conversación...</Text>
      </View>

      {/* CHATS */}

      <View style={styles.content}>
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatCard}
            activeOpacity={0.9}
          >
            {/* AVATAR */}

            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={30} color="#0d9488" />
              </View>

              {chat.online && <View style={styles.onlineDot} />}
            </View>

            {/* INFO */}

            <View style={styles.chatInfo}>
              <View style={styles.topRow}>
                <Text style={styles.name}>{chat.name}</Text>

                <Text style={styles.time}>{chat.time}</Text>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.message} numberOfLines={1}>
                  {chat.message}
                </Text>

                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* BUTTON */}

      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="create-outline" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  header: {
    backgroundColor: "#0d9488",

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

    backgroundColor: "rgba(255,255,255,0.92)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  subtitle: {
    color: "#ffe4f1",
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

  searchCard: {
    backgroundColor: "#fff",

    marginHorizontal: 22,
    marginTop: 22,

    borderRadius: 20,

    padding: 18,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,

    elevation: 2,
  },

  searchText: {
    marginLeft: 12,
    color: "#94a3b8",
    fontSize: 15,
    fontWeight: "600",
  },

  content: {
    padding: 22,
  },

  chatCard: {
    backgroundColor: "#fff",

    borderRadius: 26,

    padding: 18,

    marginBottom: 16,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,

    elevation: 3,
  },

  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },

  avatar: {
    width: 64,
    height: 64,

    borderRadius: 22,

    backgroundColor: "#fdf2f8",

    justifyContent: "center",
    alignItems: "center",
  },

  onlineDot: {
    width: 16,
    height: 16,

    borderRadius: 8,

    backgroundColor: "#22c55e",

    position: "absolute",

    right: 2,
    bottom: 2,

    borderWidth: 2,
    borderColor: "#fff",
  },

  chatInfo: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 8,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  time: {
    color: "#94a3b8",
    fontWeight: "700",
    fontSize: 13,
  },

  message: {
    color: "#64748b",
    fontSize: 15,
    flex: 1,
    marginRight: 12,
  },

  unreadBadge: {
    backgroundColor: "#0d9488",

    minWidth: 28,
    height: 28,

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 8,
  },

  unreadText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 13,
  },

  floatingButton: {
    width: 68,
    height: 68,

    borderRadius: 34,

    backgroundColor: "#0d9488",

    position: "absolute",

    bottom: 20,
    right: 22,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 6,
  },
});
