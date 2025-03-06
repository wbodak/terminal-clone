import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Text as DefaultText } from "react-native-paper";

const MyText: React.FC<React.ComponentProps<typeof DefaultText>> = (props) => {
  const styles = StyleSheet.create({
    text: {
      color: "white",
      fontFamily: "Inter",
    },
  });

  return <DefaultText {...props} style={[styles.text, props.style]} />;
};

export default MyText;
