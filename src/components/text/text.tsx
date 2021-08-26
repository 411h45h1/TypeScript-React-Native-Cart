import React, { ReactNode, ReactElement } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
  title: Boolean;
  bold: Boolean;
  children: ReactNode;
} & NativeTextProps;

const defaultProps = {
  bold: false,
  title: false,
};

export default function Text({
  children,
  style,
  title,
  bold,
  ...props
}: TextProps): ReactElement {
  let fontFamily;

  if (title) {
    if (bold) {
      fontFamily = "BungeeShade_400Regular";
    } else fontFamily = "Bungee_400Regular";
  } else {
    fontFamily = "Handlee_400Regular";
  }

  return (
    <NativeText {...props} style={[{ fontFamily, fontSize: 23 }, style]}>
      {children}
    </NativeText>
  );
}

Text.defaultProps = defaultProps;
