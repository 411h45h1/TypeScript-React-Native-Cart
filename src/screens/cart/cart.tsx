import React, { ReactElement, useState } from "react";
import { View, Button, FlatList, TouchableOpacity } from "react-native";
import style from "./cart.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorPrams } from "../navigator";
import { CartItemType } from "../home/home";
import { Text } from "../../components";
import { useEffect } from "react";

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorPrams, "Cart">;
  route: {
    params: {
      cartData: CartItemType[];
    };
  };
};

export default function Cart({ navigation, route }: HomeProps): ReactElement {
  const { cartData } = route.params;
  const [inCartItems, setInCartItems] = useState([] as CartItemType[]);

  useEffect(() => {
    setInCartItems(cartData);
  }, []);

  const handleRemoveFromCart = (id: number) => {
    setInCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };
  return (
    <View style={style.container}>
      <Text>Cart</Text>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <FlatList
        data={inCartItems}
        contentContainerStyle={{
          marginTop: 20,
          backgroundColor: "silver",
          width: "100vw",
        }}
        renderItem={({ item }) => (
          <View style={style.cartItem}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text title style={{ width: "75%" }}>
                {item.title}
              </Text>

              <Text>Quantity: {item.amount}</Text>
            </View>
            <View
              style={{
                width: "100%",
              }}
            >
              <Text style={{ alignSelf: "flex-end" }}>${item.price}</Text>

              <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
