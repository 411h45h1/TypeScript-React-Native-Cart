import React, { ReactElement } from "react";
import { View, Button } from "react-native";
import style from "./home.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorPrams } from "../navigator";
import { Text } from "../../components";
import useSounds from "../../components/tools/useSound";

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorPrams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
  const playSound = useSounds();

  return (
    <View style={style.container}>
      <Text
        title
        bold
        onPress={() => playSound("pop")}
        style={{ fontSize: 35 }}
      >
        TypeScript & React Native Cart
      </Text>
      <Button
        title="Cart"
        onPress={() => {
          navigation.navigate("Cart");
        }}
      />
    </View>
  );
}
