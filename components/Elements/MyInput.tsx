import React, { forwardRef } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  StyleProp,
  Keyboard,
} from "react-native";
import MyText from "./MyText";

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
    return (
      <View style={[styles.wrapper, props.containerStyle]}>
        <MyText style={[styles.label, readOnly ? styles.readOnlyLabel : {}]}>
          {label}:
        </MyText>
        <TextInput
          {...props}
          editable={!readOnly}
          showSoftInputOnFocus={!readOnly}
          onPress={readOnly ? Keyboard.dismiss : undefined}
          value={
            typeof props.value == "number"
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
          cursorColor={styles.cursorColor.color}
        />
        {icons}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262B30",
    borderRadius: 4,
    height: 50,
  },
  label: {
    position: "absolute",
    top: 8,
    left: 16,
    zIndex: 1,
    fontSize: 10,
    letterSpacing: 0.5,
    fontWeight: "700",
    color: "white",
  },
  readOnlyLabel: { color: "#99A0A3" },
  input: {
    height: 48,
    maxHeight: 200,
    color: "white",
    fontFamily: "Inter",
    fontSize: 14,
    borderWidth: 0,
    paddingBottom: 4,
    paddingTop: 20,
    paddingHorizontal: 16,
    flex: 1,
  },
  readOnlyInput: { color: "#99A0A3" },
  placeholder: {
    color: "#99A0A3",
  },
  cursorColor: {
    color: "white",
  },
});

export default MyInput;
