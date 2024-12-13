import React from "react";
import { useState, useCallback } from "react";
import { Text, View, Button, StyleSheet, FlatList } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import GameForm from "@/components/GameForm";

export default function Index() {
  const [games, setGames] = useState<Game[]>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  // Gets called whenever screen gets focused
  useFocusEffect(
    useCallback(() => {
      (async function getGames() {
        await fetch("https://gamelist-dwa-production.up.railway.app/api/v1/games")
          .then(data => data.json())
          .then(data => setGames(data))
      })();
    }, [refresh])
  );

  return (
    <>
      <Button onPress={() => setShowForm(true)} title="+ Add Game" />
      <FlatList
        data={games}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.title}</Text>
            <Link style={styles.button}
              href={{
                pathname: "/games/[id]",
                params: { id: item._id },
              }}
            >
              <Text style={styles.buttonText}>Go to game page</Text>
            </Link>
          </View>
        )}
        contentContainerStyle={styles.container}
      />
      {showForm ? (
        <GameForm
          setShowForm={setShowForm}
          game={null}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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