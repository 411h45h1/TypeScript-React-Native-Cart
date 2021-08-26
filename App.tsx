import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { Splash, Text } from "./src/components";

export default function App() {
  return (
    <Splash>
      <View style={styles.container}>
        <Text>The Quick Brown Fox Jumps Over the lazy dog</Text>
        <Text title>The Quick Brown Fox Jumps Over the lazy dog</Text>
        <Text title bold>
          The Quick Brown Fox Jumps Over the lazy dog
        </Text>
      </View>
    </Splash>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
