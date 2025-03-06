import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

export type MyButtonOnPress = (event: GestureResponderEvent) => void;

export interface MyButtonProps {
  children?: React.ReactNode;
  ref?: any;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: MyButtonOnPress;
}

const MyButton = ({
  style,
  children,
  disabled,
  onPress,
  containerStyle,
}: MyButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={containerStyle}>
      <View style={[styles.button, style]}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyButton;
