import {
  View,
 Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import Ionicons
from "@expo/vector-icons/Ionicons";

import {
  getPostById,
} from "../../services/postService";

export default function PostDetailScreen({
  route,
  navigation,
}: any) {

  const { postId } = route.params;

  const [post, setPost] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD POST
  // =========================

  const loadPost =
    async () => {

    try {

      const data =
        await getPostById(postId);

      console.log(
        "POST DETAIL:",
        data
      );

      setPost(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color="#9333ea"
        />

      </View>
    );
  }

  // =========================
  // NO POST
  // =========================

  if (!post) {

    return (

      <View style={styles.loadingContainer}>

        <Text>
          Publicación no encontrada
        </Text>

      </View>
    );
  }

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

        <Text style={styles.title}>
          Publicación
        </Text>

      </View>

      {/* POST */}

      <View style={styles.card}>

        {/* TOP */}

        <View style={styles.top}>

          <View style={styles.avatar}>

            <Ionicons
              name="person"
              size={28}
              color="#9333ea"
            />

          </View>

          <View style={{ flex: 1 }}>

            <Text style={styles.user}>
              Usuario
            </Text>

            <Text style={styles.date}>
              {
                new Date(
                  post.createdAt
                ).toLocaleString()
              }
            </Text>

          </View>

        </View>

        {/* CONTENT */}

        <Text style={styles.content}>
          {post.content}
        </Text>

        {/* STATS */}

        <View style={styles.stats}>

          <View style={styles.statItem}>

            <Ionicons
              name="heart"
              size={18}
              color="#ef4444"
            />

            <Text style={styles.statText}>
              {post.likesCount || 0}
            </Text>

          </View>

          <View style={styles.statItem}>

            <Ionicons
              name="chatbubble"
              size={18}
              color="#3b82f6"
            />

            <Text style={styles.statText}>
              {post.commentsCount || 0}
            </Text>

          </View>

        </View>

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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {

    backgroundColor: "#9333ea",

    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 30,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {

    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor:
      "rgba(255,255,255,0.9)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
  },

  card: {

    backgroundColor: "#fff",

    margin: 22,
    padding: 24,

    borderRadius: 28,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,

    elevation: 4,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  avatar: {

    width: 60,
    height: 60,

    borderRadius: 20,

    backgroundColor: "#f3e8ff",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  user: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  date: {
    marginTop: 6,
    color: "#64748b",
    fontWeight: "600",
  },

  content: {
    fontSize: 18,
    lineHeight: 30,
    color: "#1e293b",
  },

  stats: {

    flexDirection: "row",

    marginTop: 28,
  },

  statItem: {

    flexDirection: "row",
    alignItems: "center",

    marginRight: 24,
  },

  statText: {

    marginLeft: 8,

    fontWeight: "800",

    color: "#475569",
  },
});