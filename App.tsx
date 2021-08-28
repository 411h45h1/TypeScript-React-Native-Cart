import React from "react";
import "react-native-gesture-handler";
import { Splash, Text } from "./src/components";
import Navigator from "./src/screens/navigator";

export default function App() {
  return (
    <Splash>
      <Navigator />
    </Splash>
  );
}
