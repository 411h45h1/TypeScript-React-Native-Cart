import React, { ReactElement } from "react";
import { View, Text, Button } from "react-native";
import style from "./cart.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorPrams } from "../navigator";

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorPrams, "Cart">;
};

export default function Cart({ navigation }: HomeProps): ReactElement {
  return (
    <View style={style.container}>
      <Text>Cart</Text>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}
