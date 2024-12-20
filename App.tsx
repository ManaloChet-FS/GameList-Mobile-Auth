import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Directory from "./app/screens/Directory";
import Login from "./app/screens/Login";
import SignUp from "./app/screens/SignUp";
import GamePage from "./app/screens/GamePage";
import { Button, Text, StyleSheet, View, TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <>
            <Stack.Screen
              name="Directory"
              component={Directory}
              options={{
                header: () => (
                  <View style={styles.header}>
                    <Text style={styles.headerText}>Directory</Text>
                    <Button title="Sign Out" onPress={onLogout} />
                  </View>
                ),
              }}></Stack.Screen>
            <Stack.Screen
              name="GamePage"
              component={GamePage}
              options={{
                header: () => {
                  return (
                  <View style={styles.header}>
                    <View>
                      <Text style={styles.headerText}>Game Details</Text>
                    </View>
                    <Button title="Sign Out" onPress={onLogout} />
                  </View>
                )},
              }}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{
              headerTitle: "GameList Login",
              headerStyle: { backgroundColor: "#222" },
              headerTitleStyle: { color: "#f4f4f4" },
            }}></Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp} options={{
              headerTitle: "GameList Sign Up",
              headerStyle: { backgroundColor: "#222" },
              headerTitleStyle: { color: "#f4f4f4" },
              headerTintColor: "#f4f4f4"
            }}></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 42,
    paddingBottom: 16,
    backgroundColor: "#333"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#f4f4f4"
  }
})