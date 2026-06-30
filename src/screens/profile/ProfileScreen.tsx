import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useAuth } from "../../context/AuthContext";

import { useEffect, useState } from "react";

import {
  getMyProfile,
  updateMyProfile,
} from "../../services/authProfileService";

import { getProductions } from "../../services/productionService";

import { getAnimals } from "../../services/animalsService";

import { useAnimals } from "../../context/AnimalsContext";

import { getSales } from "../../services/salesService";

import { pickAndUploadImage } from "../../services/cloudinaryService";
import { Image } from "react-native";

import { updateProfileImage } from "../../services/profileImageService";

import { deleteProfileAvatar } from "../../services/authProfileService";

export default function ProfileScreen({ navigation }: any) {
  const { logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { animals } = useAnimals();

  const [animalsCount, setAnimalsCount] = useState(0);

  const [productionsCount, setProductionsCount] = useState(0);

  const [salesCount, setSalesCount] = useState(0);
  useEffect(() => {
    loadProfile();
    loadStats();
  }, []);

  const handleChangePhoto = async () => {
    try {
      const imageUrl = await pickAndUploadImage();

      console.log("URL RECIBIDA:", imageUrl);

      if (!imageUrl) return;

      await updateMyProfile({
        email: profile.email,
        phone: profile.phone,
        fullName: profile.fullName,
        locationName: profile.locationName,
        profilePictureUrl: imageUrl,
      });

      console.log("PROFILE UPDATED");

      await loadProfile();
    } catch (error) {
      console.log("ERROR UPDATE PROFILE:");

      console.log(error);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      await deleteProfileAvatar();

      setProfileImage(null);

      setProfile((prev: any) => ({
        ...prev,
        profilePictureUrl: null,
      }));

      // Opcional: vuelve a consultar al servidor
      await loadProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();

      console.log("PROFILE:");
      console.log(data);

      setProfile(data);

      if (data.profilePictureUrl) {
        setProfileImage(data.profilePictureUrl ?? null);
      }
      console.log("FOTO PERFIL:", data.profilePictureUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const loadStats = async () => {
    try {
      const animals = await getAnimals();

      const productions = await getProductions();

      const sales = await getSales();

      setAnimalsCount(Array.isArray(animals) ? animals.length : 0);

      setProductionsCount(Array.isArray(productions) ? productions.length : 0);

      setSalesCount(Array.isArray(sales) ? sales.length : 0);
    } catch (error) {
      console.log("Error cargando stats");

      console.log(error);
    }
  };
  console.log("RENDER FOTO:", profileImage);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>

      {/* PROFILE CARD */}

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          {profileImage ? (
            <TouchableOpacity
              style={styles.avatarTouchable}
              onPress={() =>
                navigation.navigate("ImageViewer", {
                  imageUrl: profileImage,
                })
              }
            >
              <Image
                source={{ uri: profileImage }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <Ionicons name="person" size={60} color="#fff" />
          )}
        </View>
        <TouchableOpacity onPress={handleChangePhoto}>
          <Ionicons name="camera" size={24} color="#f59e0b" />
        </TouchableOpacity>
        {profileImage && (
          <TouchableOpacity
            onPress={handleDeletePhoto}
            style={{
              marginTop: 10,
            }}
          >
            <Ionicons name="trash" size={24} color="#ef4444" />
          </TouchableOpacity>
        )}
        <Text style={styles.name}>{profile?.fullName ?? "Usuario"}</Text>

        <Text style={styles.role}>
          {profile?.roleId === 1
            ? "Productor Ganadero"
            : profile?.roleId === 2
              ? "Administrador"
              : "Usuario"}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location" size={18} color="#64748b" />

          <Text style={styles.location}>
            {profile?.locationName ?? "Ubicación no registrada"}
          </Text>
        </View>
      </View>

      {/* INFO */}

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Información Personal</Text>

        {/* EMAIL */}

        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="mail" size={22} color="#3b82f6" />
          </View>

          <View>
            <Text style={styles.infoLabel}>Correo electrónico</Text>

            <Text style={styles.infoValue}>
              {profile?.email ?? "Sin correo"}
            </Text>
          </View>
        </View>

        {/* PHONE */}

        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="call" size={22} color="#16a34a" />
          </View>

          <View>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>
              {profile?.phone ?? "Sin teléfono"}
            </Text>
          </View>
        </View>
      </View>

      {/* STATS */}

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{animalsCount}</Text>

          <Text style={styles.statLabel}>Animales</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{productionsCount}</Text>

          <Text style={styles.statLabel}>Producción</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{salesCount}</Text>

          <Text style={styles.statLabel}>Ventas</Text>
        </View>
      </View>

      {/* LOGOUT */}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out" size={22} color="#fff" />

        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

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
    flexDirection: "row",
    alignItems: "center",

    paddingTop: 70,
    paddingHorizontal: 22,
    marginBottom: 20,
  },

  backButton: {
    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor: "#fff",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#111827",
  },

  profileCard: {
    backgroundColor: "#fff",

    marginHorizontal: 22,

    borderRadius: 30,

    padding: 28,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#16a34a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },

  name: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },

  role: {
    color: "#16a34a",
    fontWeight: "700",
    marginTop: 6,
    fontSize: 16,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 14,
  },

  location: {
    marginLeft: 6,
    color: "#64748b",
    fontWeight: "600",
  },

  infoCard: {
    backgroundColor: "#fff",

    marginHorizontal: 22,
    marginTop: 18,

    borderRadius: 30,

    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 24,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 24,
  },

  infoIcon: {
    width: 54,
    height: 54,

    borderRadius: 18,

    backgroundColor: "#f8fafc",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  infoLabel: {
    color: "#64748b",
    fontSize: 14,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: 22,
    marginTop: 18,
  },

  statCard: {
    width: "31%",

    backgroundColor: "#fff",

    borderRadius: 24,

    paddingVertical: 24,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  statValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },

  statLabel: {
    marginTop: 8,
    color: "#64748b",
    fontWeight: "700",
  },

  settingsCard: {
    backgroundColor: "#fff",

    marginHorizontal: 22,
    marginTop: 18,

    borderRadius: 30,

    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  optionItem: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 16,
  },

  optionText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  logoutButton: {
    backgroundColor: "#ef4444",

    marginHorizontal: 22,
    marginTop: 24,

    borderRadius: 24,

    paddingVertical: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 10,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarTouchable: {
    width: "100%",
    height: "100%",
  },
});
