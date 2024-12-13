import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from "react";

export default function RootLayout() {
  return <>
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#222",
        },
        headerTintColor: "#f4f4f4",
        headerTitleStyle: {
          fontWeight: "bold"
        },
        title: "GameList",
        contentStyle: {
          backgroundColor: "#16161b",
        }
      }}
    />;
    <StatusBar style="auto" />
  </>
}
