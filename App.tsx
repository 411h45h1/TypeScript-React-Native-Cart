import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { Splash, Text } from "./src/components";
import useSounds from "./src/components/tools/useSound";

export default function App() {
  const playSound = useSounds();
  return (
    <Splash>
      <View style={styles.container}>
        <Text>The Quick Brown Fox Jumps Over the lazy dog</Text>
        <Text title onPress={() => playSound("beep")}>
          The Quick Brown Fox Jumps Over the lazy dog
        </Text>
        <Text title bold onPress={() => playSound("pop")}>
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
