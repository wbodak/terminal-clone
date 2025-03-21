import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Keyboard,
  StyleProp,
  ViewStyle,
} from "react-native";
import MyText from "./MyText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "@/constants/Colors";

interface Props extends Omit<TextInputProps, "value"> {
  value: number | string | undefined;
  label: string;
  theme?: "dark" | "light";
  containerStyle?: StyleProp<ViewStyle>;
  icons?: React.JSX.Element;
}

const MyInput = forwardRef<TextInput, Props>(
  (
    {
      label = "",
      theme = "dark",
      keyboardType = "default",
      icons,
      readOnly,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const borderColor = useSharedValue("#333");

    const animatedStyle = useAnimatedStyle(() => ({
      borderColor: borderColor.value,
      backgroundColor: theme === "dark" ? "#2A2A32" : "#F5F5F5",
    }));

    return (
      <Animated.View
        style={[styles.wrapper, props.containerStyle, animatedStyle]}
      >
        <MyText
          style={[
            styles.label,
            readOnly ? styles.readOnlyLabel : {},
            isFocused ? styles.focusedLabel : {},
          ]}
        >
          {label}
        </MyText>

        <TextInput
          {...props}
          editable={!readOnly}
          showSoftInputOnFocus={!readOnly}
          onPress={readOnly ? Keyboard.dismiss : undefined}
          value={
            typeof props.value === "number"
              ? props.value.toString()
              : props.value
          }
          selection={readOnly ? { start: 0 } : undefined}
          keyboardType={keyboardType}
          ref={ref}
          style={[
            styles.input,
            props.style,
            readOnly ? styles.readOnlyInput : {},
            props.multiline ? { textAlignVertical: "top" } : {},
          ]}
          placeholderTextColor={styles.placeholder.color}
          cursorColor={colors.accent}
          onFocus={(e) => {
            setIsFocused(true);
            borderColor.value = withTiming(colors.accent, { duration: 200 });
            props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            borderColor.value = withTiming("#333", { duration: 200 });
            props.onBlur && props.onBlur(e);
          }}
        />
        {icons && <View style={styles.iconContainer}>{icons}</View>}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    minHeight: 56,
  },
  label: {
    position: "absolute",
    top: 8,
    left: 16,
    fontSize: 12,
    fontWeight: "500",
    color: "#9AA2B0",
    zIndex: 1,
  },
  focusedLabel: {
    color: colors.accent,
  },
  readOnlyLabel: {
    color: "#666",
  },
  input: {
    height: 56,
    maxHeight: 200,
    color: "#FFFFFF",
    fontFamily: "Inter",
    fontSize: 14,
    paddingBottom: 8,
    paddingTop: 28,
    paddingHorizontal: 16,
    flex: 1,
  },
  readOnlyInput: {
    color: "#888",
  },
  placeholder: {
    color: "#666",
  },
  iconContainer: {
    // position: "absolute",
    // right: 16,
    // top: "50%",
    // transform: [{ translateY: -12 }],
    // backgroundColor: "white",
  },
});

export default MyInput;
