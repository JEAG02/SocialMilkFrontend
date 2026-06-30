import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";

import { useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useAuth } from "../../context/AuthContext";

import { getMyProfile } from "../../services/authProfileService";

import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

import { uploadPostMedia, getPostMedia } from "../../services/PostMediaService";
import {
  getFeed,
  createPost,
  deletePost,
  updatePost,
  likePost,
  dislikePost,
} from "../../services/postService";

export default function SocialScreen({ navigation }: any) {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [posts, setPosts] = useState<any[]>([]);

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const [editingContent, setEditingContent] = useState("");

  const [myProfile, setMyProfile] = useState<any>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // =========================
  // LOAD POSTS
  // =========================

  const loadMyProfile = async () => {
    try {
      const profile = await getMyProfile();

      setMyProfile(profile);
    } catch (error) {
      console.log(error);
    }
  };
  const loadPosts = async () => {
    try {
      const data = await getFeed();

      for (const post of data) {
        const media = await getPostMedia(post.id);

        post.media = media;
      }

      console.log("POSTS:", data);

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  // =========================
  // CREATE POST
  // =========================

  const handleCreatePost = async () => {
    try {
      if (!content.trim()) {
        Alert.alert("Error", "Escribe algo");

        return;
      }

      setLoading(true);

      const postCreated = await createPost(content);

      if (selectedImage && postCreated?.id) {
        await uploadPostMedia(postCreated.id, selectedImage);
      }

      setSelectedImage(null);

      setContent("");

      await loadPosts();
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo crear el post");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE POST
  // =========================

  const handleUpdatePost = async () => {
    try {
      if (!editingContent.trim()) {
        Alert.alert("Error", "El contenido está vacío");

        return;
      }

      await updatePost(editingPostId!, editingContent);

      setEditingPostId(null);

      setEditingContent("");

      await loadPosts();
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo actualizar");
    }
  };

  // =========================
  // DELETE POST
  // =========================

  const handleDeletePost = async (postId: string) => {
    Alert.alert("Eliminar publicación", "¿Deseas eliminar esta publicación?", [
      {
        text: "Cancelar",
        style: "cancel",
      },

      {
        text: "Eliminar",

        style: "destructive",

        onPress: async () => {
          try {
            await deletePost(postId);

            await loadPosts();
          } catch (error) {
            console.log(error);

            Alert.alert("Error", "No se pudo eliminar");
          }
        },
      },
    ]);
  };

  // =========================
  // LIKE POST
  // =========================

  const handleLikePost = async (postId: string) => {
    try {
      console.log("LIKE A:", postId);

      const response = await likePost(postId);

      console.log("LIKE RESPONSE:", response);

      await loadPosts();
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo dar like");
    }
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      loadPosts();
      loadMyProfile();
    }
  }, [authLoading, isAuthenticated]);

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

            <Text style={styles.title}>Red Social</Text>
          </View>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="people" size={28} color="#fff" />
        </View>
      </View>

      {/* CREATE POST */}

      <View style={styles.createPostCard}>
        <View style={styles.createRow}>
          <View style={styles.avatar}>
            {myProfile?.profilePictureUrl ? (
              <Image
                source={{
                  uri: myProfile.profilePictureUrl,
                }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 18,
                }}
              />
            ) : (
              <Ionicons name="person" size={26} color="#9333ea" />
            )}
          </View>

          <TextInput
            placeholder="Comparte algo con la comunidad..."
            placeholderTextColor="#94a3b8"
            value={content}
            onChangeText={setContent}
            multiline
            style={styles.postInput}
          />
        </View>

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Ionicons name="image" size={22} color="#3b82f6" />

          <Text>Seleccionar imagen</Text>
        </TouchableOpacity>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        )}

        <TouchableOpacity
          style={styles.postButton}
          onPress={handleCreatePost}
          disabled={loading}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />

          <Text style={styles.postButtonText}>
            {loading ? "Publicando..." : "Crear publicación"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* POSTS */}

      <View style={styles.content}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.postCard}
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("PostDetail", {
                postId: post.id,
              })
            }
          >
            {/* TOP */}

            <View style={styles.postHeader}>
              <View style={styles.avatarLarge}>
                {post.ownerProfilePictureUrl ? (
                  <Image
                    source={{
                      uri: post.ownerProfilePictureUrl,
                    }}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="person" size={28} color="#9333ea" />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("UserProfile", {
                      profileId: post.ownerId,
                    })
                  }
                >
                  <Text style={styles.user}>{post.ownerFullName}</Text>
                </TouchableOpacity>

                <Text style={styles.location}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Text>
              </View>

              {myProfile?.id === post.ownerId && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setEditingPostId(post.id);

                      setEditingContent(post.content);
                    }}
                  >
                    <Ionicons name="create-outline" size={22} color="#3b82f6" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDeletePost(post.id)}>
                    <Ionicons name="trash-outline" size={22} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* CONTENT */}

            {editingPostId === post.id ? (
              <View>
                <TextInput
                  value={editingContent}
                  onChangeText={setEditingContent}
                  multiline
                  style={styles.editInput}
                />

                <TouchableOpacity
                  style={styles.saveEditButton}
                  onPress={handleUpdatePost}
                >
                  <Ionicons name="save-outline" size={18} color="#fff" />

                  <Text style={styles.saveEditText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.postText}>{post.content}</Text>

                {post.media?.length > 0 && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate("ImageViewer", {
                        imageUrl: post.media[0].mediaUrl,
                      })
                    }
                  >
                    <Image
                      source={{
                        uri: post.media[0].mediaUrl,
                      }}
                      style={{
                        width: "100%",
                        height: 250,
                        borderRadius: 18,
                        marginBottom: 18,
                      }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* ACTIONS */}

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLikePost(post.id)}
              >
                <Ionicons name="heart-outline" size={20} color="#ef4444" />

                <Text style={styles.actionText}>{post.likesCount || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={20} color="#3b82f6" />

                <Text style={styles.actionText}>{post.commentsCount || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color="#16a34a"
                />

                <Text style={styles.actionText}>Compartir</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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

    backgroundColor: "rgba(255,255,255,0.92)",

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

    backgroundColor: "rgba(255,255,255,0.18)",

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

  postInput: {
    flex: 1,

    color: "#111827",

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

  editInput: {
    backgroundColor: "#f8fafc",

    borderRadius: 18,

    padding: 16,

    color: "#111827",

    fontSize: 16,

    borderWidth: 1,
    borderColor: "#e2e8f0",

    marginBottom: 14,
  },

  saveEditButton: {
    backgroundColor: "#3b82f6",

    borderRadius: 16,

    paddingVertical: 14,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 18,
  },

  saveEditText: {
    color: "#fff",

    fontWeight: "800",

    marginLeft: 8,
  },
  imageButton: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#eff6ff",

    paddingVertical: 12,

    borderRadius: 14,

    gap: 8,

    marginBottom: 14,
  },

  previewImage: {
    width: "100%",

    height: 220,

    borderRadius: 16,

    marginBottom: 16,
  },
  avatarImage: {
    width: 58,
    height: 58,
    borderRadius: 20,
  },
});
