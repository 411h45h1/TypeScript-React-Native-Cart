import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Cart } from "./index";
import { CartItemType } from "./home/home";

export type StackNavigatorPrams = {
  Home: undefined;
  Cart: {
    cartData: CartItemType[];
  };
};

const Stack = createStackNavigator<StackNavigatorPrams>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
