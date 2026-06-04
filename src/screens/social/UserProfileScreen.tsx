import {
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
  getPostsByProfile,
} from "../../services/postService";

export default function ProfileScreen({
  route,
  navigation,
}: any) {

  const {
    profileId,
  } = route.params;

  const [posts, setPosts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD POSTS
  // =========================

  const loadPosts =
    async () => {

    try {

      const data =
        await getPostsByProfile(
          profileId
        );

      setPosts(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

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

        <View style={styles.avatar}>

          <Ionicons
            name="person"
            size={42}
            color="#9333ea"
          />

        </View>

        <Text style={styles.name}>
          Usuario
        </Text>

        <Text style={styles.subtitle}>
          Perfil ganadero
        </Text>

        <View style={styles.statsContainer}>

          <View style={styles.statBox}>

            <Text style={styles.statNumber}>
              {posts.length}
            </Text>

            <Text style={styles.statLabel}>
              Posts
            </Text>

          </View>

        </View>

      </View>

      {/* POSTS */}

      <View style={styles.content}>

        {posts.map((post) => (

          <View
            key={post.id}
            style={styles.postCard}
          >

            <Text style={styles.postDate}>

              {
                new Date(
                  post.createdAt
                ).toLocaleDateString()
              }

            </Text>

            <Text style={styles.postContent}>
              {post.content}
            </Text>

          </View>
        ))}

      </View>

      <View style={{ height: 40 }} />

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
    paddingBottom: 40,

    alignItems: "center",

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  backButton: {

    position: "absolute",

    top: 70,
    left: 24,

    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor:
      "rgba(255,255,255,0.92)",

    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {

    width: 110,
    height: 110,

    borderRadius: 40,

    backgroundColor: "#f3e8ff",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  name: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    color: "#f3e8ff",
    marginTop: 8,
    fontSize: 16,
  },

  statsContainer: {

    flexDirection: "row",

    marginTop: 28,
  },

  statBox: {

    backgroundColor:
      "rgba(255,255,255,0.15)",

    paddingVertical: 14,
    paddingHorizontal: 28,

    borderRadius: 20,

    alignItems: "center",
  },

  statNumber: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },

  statLabel: {
    color: "#f3e8ff",
    marginTop: 4,
    fontWeight: "700",
  },

  content: {
    padding: 22,
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

  postDate: {
    color: "#94a3b8",
    fontWeight: "700",
    marginBottom: 12,
  },

  postContent: {
    fontSize: 16,
    lineHeight: 26,
    color: "#1e293b",
  },
});