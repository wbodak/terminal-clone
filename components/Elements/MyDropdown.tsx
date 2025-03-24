import React, { useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Dropdown as DropdownComp } from "react-native-element-dropdown";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "@/constants/Colors";
import MyText from "./MyText";
import { SelectBoxDto } from "@/types/dtos/SelectBoxDto";

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
  const borderColor = useSharedValue(colors.border);

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    backgroundColor: colors.dark,
  }));

  const handleFocus = () => {
    setIsFocused(true);
    borderColor.value = withTiming(colors.accent, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderColor.value = withTiming(colors.border, { duration: 200 });
  };

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
          isFocused && styles.focusedLabel,
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
        onChange={(item) => setValue(item.value)}
        disable={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
    minHeight: 48,
  },
  dropdown: {
    height: 48,
    borderWidth: 0,
    paddingBottom: 6,
    paddingTop: 22,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  disabledContainer: {
    backgroundColor: colors.disabledBackGround,
    borderColor: colors.disabledBorder,
    opacity: 0.9,
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
  disabledLabel: {
    color: colors.readonly,
  },
  placeholderStyle: {
    fontFamily: "Inter",
    fontSize: 12,
    color: colors.placeHolder,
  },
  selectedTextStyle: {
    fontFamily: "Inter",
    fontSize: 12,
    color: colors.white,
    overflow: "hidden",
  },
  disabledText: {
    color: colors.readonly,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: colors.white,
  },
  selectedItem: {
    backgroundColor: colors.accent,
  },
  itemContainer: {
    backgroundColor: colors.dark,
    borderWidth: 0,
    borderRadius: 6,
    marginTop: 4,
  },
  itemTextStyle: {
    fontSize: 12,
    color: colors.white,
    fontFamily: "Inter",
  },
  iconStyle: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  dropdownContainer: {
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: colors.dark,
  },
});

export default MyDropdown;
