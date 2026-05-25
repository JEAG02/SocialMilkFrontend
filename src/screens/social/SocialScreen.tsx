import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons
from "@expo/vector-icons/Ionicons";

export default function SocialScreen({
  navigation,
}: any) {

  const posts = [
    {
      id: 1,
      user: "Carlos Gómez",
      location: "Manizales",
      text:
        "Hoy aumentamos la producción en 12%. Excelente jornada 🚜",
      likes: 24,
      comments: 8,
      time: "Hace 2h",
    },
    {
      id: 2,
      user: "María López",
      location: "Pereira",
      text:
        "¿Qué alimento recomiendan para mejorar la producción lechera?",
      likes: 18,
      comments: 15,
      time: "Hace 4h",
    },
    {
      id: 3,
      user: "Finca El Descanso",
      location: "Armenia",
      text:
        "Vendemos concentrado premium para ganado. Excelente calidad.",
      likes: 41,
      comments: 12,
      time: "Hace 7h",
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
              Comunidad ganadera
            </Text>

            <Text style={styles.title}>
              Red Social
            </Text>

          </View>

        </View>

        <View style={styles.headerIcon}>

          <Ionicons
            name="people"
            size={28}
            color="#fff"
          />

        </View>

      </View>

      {/* CREATE POST */}

      <View style={styles.createPostCard}>

        <View style={styles.createRow}>

          <View style={styles.avatar}>

            <Ionicons
              name="person"
              size={26}
              color="#9333ea"
            />

          </View>

          <Text style={styles.placeholder}>
            Comparte algo con la comunidad...
          </Text>

        </View>

        <TouchableOpacity
          style={styles.postButton}
        >

          <Ionicons
            name="add-circle-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.postButtonText}>
            Crear publicación
          </Text>

        </TouchableOpacity>

      </View>

      {/* POSTS */}

      <View style={styles.content}>

        {posts.map((post) => (

          <View
            key={post.id}
            style={styles.postCard}
          >

            {/* TOP */}

            <View style={styles.postHeader}>

              <View style={styles.avatarLarge}>

                <Ionicons
                  name="person"
                  size={28}
                  color="#9333ea"
                />

              </View>

              <View style={{ flex: 1 }}>

                <Text style={styles.user}>
                  {post.user}
                </Text>

                <Text style={styles.location}>
                  {post.location}
                </Text>

              </View>

              <Text style={styles.time}>
                {post.time}
              </Text>

            </View>

            {/* CONTENT */}

            <Text style={styles.postText}>
              {post.text}
            </Text>

            {/* ACTIONS */}

            <View style={styles.actions}>

              <TouchableOpacity
                style={styles.actionButton}
              >

                <Ionicons
                  name="heart-outline"
                  size={20}
                  color="#ef4444"
                />

                <Text style={styles.actionText}>
                  {post.likes}
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
              >

                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color="#3b82f6"
                />

                <Text style={styles.actionText}>
                  {post.comments}
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
              >

                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color="#16a34a"
                />

                <Text style={styles.actionText}>
                  Compartir
                </Text>

              </TouchableOpacity>

            </View>

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

    backgroundColor: "#9333ea",

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
    color: "#f3e8ff",
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

  createPostCard: {

    backgroundColor: "#fff",

    margin: 22,
    padding: 22,

    borderRadius: 28,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,

    elevation: 4,
  },

  createRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {

    width: 52,
    height: 52,

    borderRadius: 18,

    backgroundColor: "#f3e8ff",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  placeholder: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "600",
  },

  postButton: {

    backgroundColor: "#9333ea",

    paddingVertical: 16,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
  },

  postButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    marginLeft: 8,
  },

  content: {
    paddingHorizontal: 22,
  },

  postCard: {

    backgroundColor: "#fff",

    borderRadius: 28,

    padding: 22,

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,

    elevation: 4,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  avatarLarge: {

    width: 58,
    height: 58,

    borderRadius: 20,

    backgroundColor: "#f3e8ff",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  user: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  location: {
    marginTop: 4,
    color: "#64748b",
    fontWeight: "600",
  },

  time: {
    color: "#94a3b8",
    fontWeight: "700",
  },

  postText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#1e293b",
    marginBottom: 22,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionButton: {

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#f8fafc",

    paddingVertical: 12,
    paddingHorizontal: 18,

    borderRadius: 16,
  },

  actionText: {
    marginLeft: 8,
    fontWeight: "700",
    color: "#475569",
  },
});