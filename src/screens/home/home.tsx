import React, { ReactElement, useEffect, useState } from "react";
import { View, Button, Image, TouchableOpacity } from "react-native";
import style from "./home.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorPrams } from "../navigator";
import { Text } from "../../components";
import useSounds from "../../components/tools/useSound";
import styles from "./home.styles";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorPrams, "Home">;
};

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export default function Home({ navigation }: HomeProps): ReactElement {
  const playSound = useSounds();
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([] as CartItemType[]);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const [showDesc, setShowDesc] = useState(0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((json) => setInventory(json));
  }, []);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

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
        <Text title bold style={{ fontSize: 35, color: "#423E37" }}>
          TypeScript & React Native Cart
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#423E37",
            padding: 5,
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate("Cart", { cartData: cartItems });
          }}
        >
          <Text title style={{ color: "white" }}>
            Cart
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.shopContainer}>
        {inventory.map((i, k) => {
          return (
            <View style={styles.shopItem} key={k}>
              <Text title style={{ margin: 5 }}>
                {i.title}
              </Text>

              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: i.image }}
                  style={{
                    flex: 1,
                    height: 150,
                    width: 150,
                    resizeMode: "contain",
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "black",
                  paddingHorizontal: 5,
                  paddingTop: 5,
                }}
              >
                <Text style={{ color: "white" }}>{i.category}</Text>

                <TouchableOpacity
                  onPress={() => {
                    playSound("pop");
                    if (showDesc === i.id) {
                      setShowDesc(0);
                    } else {
                      setShowDesc(i.id);
                    }
                  }}
                >
                  <Entypo
                    name="book"
                    size={24}
                    color={showDesc === i.id ? "tomato" : "white"}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleAddToCart(i)}
                  style={{
                    backgroundColor: "#7EB47E",
                    padding: 5,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    title
                    style={{
                      fontSize: 15,
                    }}
                  >
                    Add to Cart
                  </Text>
                </TouchableOpacity>

                <Text title style={{ color: "white" }}>
                  ${i.price}
                </Text>
              </View>

              {showDesc === i.id ? (
                <Text style={{ margin: 5 }}>{i.description}</Text>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}
