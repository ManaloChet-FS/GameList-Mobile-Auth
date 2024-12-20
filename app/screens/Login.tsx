import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { onLogin } = useAuth();

  const navigation = useNavigation();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Text style={styles.createAccount} onPress={() => navigation.navigate('SignUp' as never)}>Create Account</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    paddingTop: 48,
    height: "100%",
  },
  header: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f4f4f4",
    marginBottom: 16
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 16,
    width: "70%",
    marginHorizontal: "auto",
  },
  input: {
    width: "100%",
    backgroundColor: "#f4f4f4",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 16,
    borderRadius: 5
  },
  buttonText: {
    color: "#f4f4f4",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  footerText: {
    textAlign: "center",
    color: "#f4f4f4",
  },
  createAccount: {
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 4,
    fontSize: 16,
    color: "blue"
  },
})