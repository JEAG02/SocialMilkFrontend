import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";
import { register } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen({ navigation }: any) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    fullName: "",
    locationName: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const res = await register(
        form.email,
        form.password,
        form.phone,
        form.fullName,
        form.locationName,
      );

      console.log(res);

      // LOGIN AUTOMÁTICO
      await login(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Crear Cuenta</Text>

        <Text style={styles.subtitle}>Únete a SocialMilk</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Correo electrónico</Text>

        <TextInput
          placeholder="ejemplo@gmail.com"
          placeholderTextColor="#9ca3af"
          style={styles.input}
          value={form.email}
          onChangeText={(v) => handleChange("email", v)}
        />

        <Text style={styles.label}>Contraseña</Text>

        <TextInput
          placeholder="********"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          style={styles.input}
          value={form.password}
          onChangeText={(v) => handleChange("password", v)}
        />
        <Text style={styles.label}>Teléfono</Text>

        <TextInput
          placeholder="3001234567"
          placeholderTextColor="#9ca3af"
          keyboardType="phone-pad"
          style={styles.input}
          value={form.phone}
          onChangeText={(v) => handleChange("phone", v)}
        />

        <Text style={styles.label}>Nombre completo</Text>

        <TextInput
          placeholder="Pepito Pérez"
          placeholderTextColor="#9ca3af"
          style={styles.input}
          value={form.fullName}
          onChangeText={(v) => handleChange("fullName", v)}
        />

        <Text style={styles.label}>Ubicación</Text>

        <TextInput
          placeholder="Manizales"
          placeholderTextColor="#9ca3af"
          style={styles.input}
          value={form.locationName}
          onChangeText={(v) => handleChange("locationName", v)}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  header: {
    backgroundColor: "#16a34a",
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
  },

  subtitle: {
    color: "#dcfce7",
    marginTop: 8,
    fontSize: 16,
  },

  form: {
    padding: 24,
    paddingBottom: 80,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  button: {
    backgroundColor: "#16a34a",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 17,
  },

  loginText: {
    textAlign: "center",
    marginTop: 24,
    color: "#16a34a",
    fontWeight: "600",
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    marginLeft: 4,
  },
});
