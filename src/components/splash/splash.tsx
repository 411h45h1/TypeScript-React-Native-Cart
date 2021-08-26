import React, { ReactElement, ReactNode } from "react";

import {
  useFonts,
  BungeeShade_400Regular,
} from "@expo-google-fonts/bungee-shade";
import { Bungee_400Regular } from "@expo-google-fonts/bungee";
import { Handlee_400Regular } from "@expo-google-fonts/handlee";

import AppLoading from "expo-app-loading";

type SplashProps = {
  children: ReactNode;
};
export default function Splash({ children }: SplashProps): ReactElement {
  const [fontLoaded] = useFonts({
    Bungee_400Regular,
    BungeeShade_400Regular,
    Handlee_400Regular,
  });

  return fontLoaded ? <>{children}</> : <AppLoading />;
}
