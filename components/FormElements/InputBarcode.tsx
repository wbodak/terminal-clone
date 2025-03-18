import React, { forwardRef } from "react";
import MyInput from "../Elements/MyInput";
import { icons } from "@/assets/icons";
import { IconButton } from "react-native-paper";

type Props = {
  value?: string;
  onChangeText: (text: string) => void;
  onClearButton: () => void;
  onSearchButton: () => void;
  label?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
};

const InputBarcode = forwardRef<any, Props>(
  (
    {
      value,
      onChangeText,
      onClearButton,
      onSearchButton,
      label = "Barkod Okutunuz",
      readOnly,
      autoFocus = true,
    },
    ref
  ) => {
    return (
      <MyInput
        ref={ref}
        label={label}
        returnKeyType="done"
        autoFocus={autoFocus}
        placeholder="186..."
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        readOnly={readOnly}
        value={value}
        onSubmitEditing={onSearchButton}
        icons={
          <>
            <IconButton
              icon={icons.cross}
              size={16}
              style={{ margin: 0, marginRight: 2 }}
              iconColor="gray"
              onPress={onClearButton}
            />
            <IconButton
              icon={icons["search-blue"]}
              size={16}
              style={{ margin: 0, marginRight: 8 }}
              iconColor="#4875FF"
              onPress={onSearchButton}
            />
          </>
        }
      />
    );
  }
);
export default InputBarcode;
