import React, { forwardRef, useState } from "react";

import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Keyboard,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
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

const MyInput = forwardRef<TextInput, Props>((props, ref) => {
  const {
    label = "",
    theme = "dark",
    keyboardType = "default",
    icons,
    readOnly,
    containerStyle,
    style,
    value,
    onFocus,
    onBlur,
    multiline,
    ...restProps
  } = props;
  // States
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useSharedValue("#333");

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    backgroundColor: colors.dark,
  }));
  //Handlers
  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    borderColor.value = withTiming(colors.accent, { duration: 200 });
    onFocus && onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    borderColor.value = withTiming("#333", { duration: 200 });
    onBlur && onBlur(e);
  };

  const formattedValue = typeof value === "number" ? value.toString() : value;

  const labelStyle = [
    styles.label,
    readOnly && styles.readOnlyLabel,
    isFocused && styles.focusedLabel,
  ];
  return (
    <Animated.View style={[styles.wrapper, containerStyle, animatedStyle]}>
      {/* Label component */}
      <MyText style={labelStyle}>{label}</MyText>

      {/* Input component */}
      <TextInput
        {...restProps}
        editable={!readOnly}
        showSoftInputOnFocus={!readOnly}
        onPress={readOnly ? Keyboard.dismiss : undefined}
        value={formattedValue}
        selection={readOnly ? { start: 0 } : undefined}
        keyboardType={keyboardType}
        ref={ref}
        style={[
          styles.input,
          style,
          readOnly && styles.readOnlyInput,
          multiline && { textAlignVertical: "top" },
        ]}
        placeholderTextColor={styles.placeholder.color}
        cursorColor={colors.accent}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {/* Optional icons */}
      {icons && <View>{icons}</View>}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
    minHeight: 48,
  },
  label: {
    position: "absolute",
    top: 6,
    left: 12,
    fontSize: 10,
    fontWeight: "500",
    color: colors.grayText,
    zIndex: 1,
  },
  focusedLabel: {
    color: colors.accent,
  },
  readOnlyLabel: {
    color: colors.readonly,
  },
  input: {
    height: 48,
    maxHeight: 180,
    color: colors.white,
    fontFamily: "Inter",
    fontSize: 12,
    paddingBottom: 6,
    paddingTop: 22,
    paddingHorizontal: 12,
    flex: 1,
  },
  readOnlyInput: {
    color: colors.readonly,
  },
  placeholder: {
    color: colors.placeHolder,
  },
});

export default MyInput;
