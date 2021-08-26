import React, { ReactElement, useEffect, useState } from "react";
import { View, Button, Image } from "react-native";
import style from "./home.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorPrams } from "../navigator";
import { Text } from "../../components";
import useSounds from "../../components/tools/useSound";
import styles from "./home.styles";

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
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setCartItems(json));
  }, []);
  console.log(cartItems);

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
        title={"Cart"}
        onPress={() => {
          navigation.navigate("Cart");
        }}
      />
      <View style={styles.shopContainer}>
        {cartItems.map((i, k) => {
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
                    height: 300,
                    width: 300,
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
                }}
              >
                <Text style={{ color: "white" }}>{i.category}</Text>
                <Text title style={{ color: "white" }}>
                  {i.price}
                </Text>
              </View>
              <Text style={{ margin: 5 }}>{i.description}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
