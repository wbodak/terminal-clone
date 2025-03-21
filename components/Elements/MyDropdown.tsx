import { SelectBoxDto } from "@/types/dtos/SelectBoxDto";
import React, { useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Dropdown as DropdownComp } from "react-native-element-dropdown";
import MyText from "./MyText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "@/constants/Colors";

type Props = {
  value: number | SelectBoxDto | boolean;
  setValue: (value: any) => void;
  label: string;
  placeholder: string;
  data: SelectBoxDto[];
  theme?: "dark" | "light";
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const MyDropdown = ({
  placeholder,
  label,
  value,
  setValue,
  data,
  theme = "dark",
  containerStyle,
  disabled = false,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useSharedValue("#444");

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    backgroundColor: theme === "dark" ? "#2A2A32" : "#F5F5F5",
  }));

  return (
    <Animated.View
      style={[
        styles.wrapper,
        containerStyle,
        animatedStyle,
        disabled && styles.disabledContainer,
      ]}
    >
      <MyText
        style={[
          styles.label,
          isFocused ? styles.focusedLabel : {},
          disabled && styles.disabledLabel,
        ]}
      >
        {label}
      </MyText>

      <DropdownComp
        selectedTextProps={{ numberOfLines: 1 }}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        selectedTextStyle={[
          styles.selectedTextStyle,
          disabled && styles.disabledText,
        ]}
        containerStyle={styles.dropdownContainer}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemTextStyle}
        renderItem={(item) => (
          <MyText
            style={[styles.item, value === item.value && styles.selectedItem]}
          >
            {item.text}
          </MyText>
        )}
        placeholder={placeholder}
        data={data}
        labelField="text"
        valueField="value"
        value={data.find((x) => x.value === value)}
        onChange={(item) => {
          setValue(item.value);
        }}
        disable={disabled}
        onFocus={() => {
          setIsFocused(true);
          borderColor.value = withTiming(colors.accent, { duration: 200 });
        }}
        onBlur={() => {
          setIsFocused(false);
          borderColor.value = withTiming("#444", { duration: 200 });
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    minHeight: 56,
  },
  dropdown: {
    height: 56,
    borderWidth: 0,
    paddingBottom: 8,
    paddingTop: 28,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  disabledContainer: {
    backgroundColor: "#222228",
    borderColor: "#3A3A42",
    opacity: 0.9,
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
  disabledLabel: {
    color: "#666",
  },
  placeholderStyle: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "#666",
  },
  selectedTextStyle: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "#FFFFFF",
    overflow: "hidden",
  },
  disabledText: {
    color: "#777",
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: "white",
  },
  selectedItem: {
    backgroundColor: colors.accent,
  },
  itemContainer: {
    backgroundColor: "#2A2A32",
    borderWidth: 0,
    borderRadius: 8,
    marginTop: 4,
  },
  itemTextStyle: {
    fontSize: 14,
    color: "white",
    fontFamily: "Inter",
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  dropdownContainer: {
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: "#2A2A32",
  },
});

export default MyDropdown;
