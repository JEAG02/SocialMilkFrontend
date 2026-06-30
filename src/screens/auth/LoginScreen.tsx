import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { login as loginService } from "../../services/authService";

export default function LoginScreen({ navigation }: any) {
  const [identifier, setIdentifier] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await loginService(identifier, password);

      console.log("LOGIN RES:", res);

      await login(res);
    } catch (error: any) {
      Alert.alert(
        "Error",
        JSON.stringify(error?.response?.data || error?.message || error),
      );

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>SocialMilk</Text>

        <Text style={styles.subtitle}>Gestión inteligente ganadera</Text>
      </View>

      {/* FORM */}

      <View style={styles.form}>
        <Text style={styles.welcome}>Bienvenido</Text>

        <Text style={styles.description}>Inicia sesión para continuar</Text>

        <Text style={styles.label}>Correo electrónico o teléfono</Text>

        <TextInput
          placeholder="ejemplo@gmail.com o 3001234567"
          placeholderTextColor="#9ca3af"
          style={styles.input}
          value={identifier}
          onChangeText={setIdentifier}
        />

        <Text style={styles.label}>Contraseña</Text>

        <TextInput
          placeholder="********"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Ingresar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  header: {
    backgroundColor: "#16a34a",

    paddingTop: 90,
    paddingBottom: 60,
    paddingHorizontal: 28,

    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },

  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "900",
  },

  subtitle: {
    color: "#dcfce7",
    marginTop: 10,
    fontSize: 17,
  },

  form: {
    flex: 1,
    padding: 28,
    marginTop: 10,
  },

  welcome: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
  },

  description: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 8,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#fff",

    borderRadius: 18,

    padding: 18,

    marginBottom: 18,

    fontSize: 16,

    borderWidth: 1,
    borderColor: "#e5e7eb",

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,

    elevation: 2,
  },

  button: {
    backgroundColor: "#16a34a",

    paddingVertical: 20,

    borderRadius: 18,

    alignItems: "center",

    marginTop: 10,

    shadowColor: "#16a34a",
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },

  registerText: {
    textAlign: "center",

    marginTop: 28,

    color: "#16a34a",

    fontWeight: "700",

    fontSize: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    marginLeft: 4,
  },
});
