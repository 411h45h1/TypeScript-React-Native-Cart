import React, { ReactElement, useState } from "react";
import { View, Button, FlatList, TouchableOpacity } from "react-native";
import style from "./cart.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorPrams } from "../navigator";
import { CartItemType } from "../home/home";
import { Text } from "../../components";
import { useEffect } from "react";
import useSounds from "../../components/tools/useSound";
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
  const playSound = useSounds();

  useEffect(() => {
    setInCartItems(cartData);
  }, []);

  const handleRemoveFromCart = (id: number) => {
    playSound("beep");
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

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <View style={style.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 50,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text title bold style={{ fontSize: 35, color: "#423E37" }}>
            Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#423E37",
            padding: 5,
            borderRadius: 5,
          }}
          onPress={() => [setInCartItems([]), navigation.goBack()]}
        >
          <Text title style={{ color: "white" }}>
            Home
          </Text>
        </TouchableOpacity>
      </View>
      <View>
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
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ alignSelf: "flex-end" }}>${item.price}</Text>

                <TouchableOpacity
                  onPress={() => handleRemoveFromCart(item.id)}
                  style={{
                    backgroundColor: "tomato",
                    borderRadius: 5,
                    padding: 5,
                  }}
                >
                  <Text title style={{ color: "white", fontSize: 20 }}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <Text
          style={{
            alignSelf: "flex-end",
            marginRight: 10,
          }}
          title
        >
          {calculateTotal(inCartItems) === 0
            ? "Your Cart is Empty"
            : `Total: $${calculateTotal(inCartItems).toFixed(2)}`}
        </Text>
      </View>
    </View>
  );
}
