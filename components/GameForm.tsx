import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";

interface GameFormProps {
  setShowForm: Dispatch<SetStateAction<boolean>>
  game: Game | null
  refresh: boolean | null
  setRefresh: Dispatch<SetStateAction<boolean>> | null
}

export default function GameForm({ setShowForm, game, refresh, setRefresh }: GameFormProps) {
  const [errorTxt, setErrorTxt] = useState<string>("");

  const titleRef = useRef<string>(game ? game.title : "");
  const releaseDateRef = useRef<string>(game ? game.releaseDate : "");
  const genreRef = useRef<string>(game ? game.genre : "");

  const handleError = (err: any): void => {
    const message = err.response ? err.response.data.error : err.message;
    setErrorTxt(message);
  }

  const handleSubmit = async () => {
    const gameInfo = {
      title: titleRef.current,
      releaseDate: releaseDateRef.current,
      genre: genreRef.current
    }

    // Checks if any inputs are empty
    if (!gameInfo.title || !gameInfo.releaseDate || !gameInfo.genre) {
      setErrorTxt("Inputs must not be empty!");
      return;
    }

    if (!game) {
      // Creates game
      try {
        await axios.post("https://gamelist-dwa-production.up.railway.app/api/v1/games", gameInfo);
        setRefresh!(!refresh);
        setShowForm(false);
      } catch (err: any) {
        handleError(err);
      }
    } else {
      // Updates games
      try {
        await axios.put(`https://gamelist-dwa-production.up.railway.app/api/v1/games/${game._id}`, gameInfo)
  
        game.title = gameInfo.title;
        game.releaseDate = gameInfo.releaseDate;
        game.genre = gameInfo.genre;

        setShowForm(false);
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
      {errorTxt ? <Text style={styles.error}>{errorTxt}</Text> : null}
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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
