import React from "react";
import { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import GameForm from "@/components/GameForm";
import gamesService from "@/services/games.service";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function Directory() {
  const [games, setGames] = useState<Game[]>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList, "Directory">>();

  useEffect(() => {
    (async function getGames() {
      try {
        gamesService.getAllPrivateGames().then(
          res => {
            setGames(res.data)
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Button onPress={() => setShowForm(true)} title="+ Add Game" />
      <FlatList
        data={games}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.title}</Text>
            <TouchableOpacity style={styles.button} onPress={() => item._id && navigation.navigate("GamePage", { id: item._id })}>
              <Text style={styles.buttonText}>Go to game page</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.gamesContainer}
      />
      {showForm ? (
        <GameForm
          setShowForm={setShowForm}
          game={null}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    minHeight: "100%"
  },
  gamesContainer: {
    gap: 16,
    padding: 16,
  },
  card: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 10,
    maxWidth: 400,
    boxShadow: "0px 0px 5px rgba(0,0,0,0.5)"
  },
  text: {
    color: "#f4f4f4",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#111",
    paddingVertical: 8,
    borderRadius: 5
  },
  buttonText: {
    color: "#f4f4f4",
    textAlign: "center",
    fontWeight: "bold"
  }
})