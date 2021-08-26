import React, { ReactElement, useEffect, useState } from "react";
import { View, Button, Image, TouchableOpacity } from "react-native";
import style from "./home.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorPrams } from "../navigator";
import { Text } from "../../components";
import useSounds from "../../components/tools/useSound";
import styles from "./home.styles";
import { Entypo } from "@expo/vector-icons";

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
  const [showDesc, setShowDesc] = useState(0);

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
