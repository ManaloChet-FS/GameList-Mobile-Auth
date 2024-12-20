import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import gamesService from "@/services/games.service";

interface GameFormProps {
  setShowForm: Dispatch<SetStateAction<boolean>>
  game: Game | null
  refresh: boolean | null
  setRefresh: Dispatch<SetStateAction<boolean>> | null
}

export default function GameForm({ setShowForm, game, refresh, setRefresh }: GameFormProps) {
  const titleRef = useRef<string>(game ? game.title : "");
  const releaseDateRef = useRef<string>(game ? game.releaseDate : "");
  const genreRef = useRef<string>(game ? game.genre : "");

  const handleError = (err: any): void => {
    const message = err.response ? err.response.data.error : err.message;
    const invalidInputs = err.response.data.invalidInputs ? err.response.data.invalidInputs.join(", ") : "";
    alert(message + " " + invalidInputs);
  }

  const handleSubmit = async () => {
    const gameInfo = {
      title: titleRef.current,
      releaseDate: releaseDateRef.current,
      genre: genreRef.current
    }

    // Checks if any inputs are empty
    if (!gameInfo.title || !gameInfo.releaseDate || !gameInfo.genre) {
      alert("Inputs must not be empty!");
      return;
    }

    if (!game) {
      // Creates game
      try {
        gamesService.createPrivateGame(gameInfo).then(
          () => {
            setRefresh!(!refresh);
            setShowForm(false);
          },
          (err) => {
            handleError(err);
          }
        );
      } catch (err: any) {
        handleError(err);
      }
    } else {
      // Updates games
      try {
        gamesService.updatePrivateGame(game._id!, gameInfo).then(
          () => {
            game.title = gameInfo.title;
            game.releaseDate = gameInfo.releaseDate;
            game.genre = gameInfo.genre;
            setShowForm(false);
          },
          (err) => {
            handleError(err);
          }
        );
      } catch (err) {
        handleError(err);
      }
    }
  }

  return (
    <View style={styles.formContainer}>
      <View>
        <Text style={styles.label}>Title (Max 25 char.)</Text>
        <TextInput style={styles.input} onChangeText={(text) => titleRef.current = text} defaultValue={game ? game.title : ""} />
      </View>
      <View>
        <Text style={styles.label}>Release Date (mm/dd/yy)</Text>
        <TextInput style={styles.input} onChangeText={(text) => releaseDateRef.current = text} defaultValue={game ? game.releaseDate : ""} />
      </View>
      <View>
        <Text style={styles.label}>Genre</Text>
        <RNPickerSelect
          value={game ? game.genre : null}
          style={{ ...pickerSelectStyles }}
          onValueChange={(value) => genreRef.current = value}
          placeholder={{ label: 'Select a genre...', value: "" }}
          items={[
            { label: 'Action', value: 'Action' },
            { label: 'MMO', value: 'MMO' },
            { label: 'FPS', value: 'FPS' },
            { label: 'Puzzle', value: 'Puzzle' },
            { label: 'Platformer', value: 'Platformer' },
          ]}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>{game ? "Update" : "Create"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowForm(false)} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -25%)",
    backgroundColor: "#16161b",
    padding: 24,
    width: "100%",
    maxWidth: 300,
    gap: 16
  },
  label: {
    color: "#f4f4f4",
    marginBottom: 4
  },
  input: {
    backgroundColor: "#f4f4f4"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    marginTop: 12
  },
  button: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#111",
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#f4f4f4",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center"
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: 'black',
    backgroundColor: "#f4f4f4"
  },
  inputAndroid: {
    fontSize: 16,
    color: 'black',
    backgroundColor: "#f4f4f4"
  },
});
