import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Snackbar } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import data from "./data.json";
import { colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MyText from "../Elements/MyText";
import { View } from "react-native";
export type CustomAlertProps = {
  dialogName: string;
  message?: string;
};

type AlertModel = {
  type: "success" | "error" | "question";
  name: string;
  message: string;
};

const CustomSnackbar = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [text, setText] = useState("");

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(visible ? 0 : -100, { damping: 12 }),
      },
    ],
    opacity: withTiming(visible ? 1 : 0, { duration: 300 }),
  }));

  useImperativeHandle(
    ref,
    () => ({
      showSnackeBar: ({ dialogName, message = "" }: CustomAlertProps) => {
        const selectedAlert = data.find(
          (alert) => alert.name === dialogName
        ) as AlertModel | undefined;

        setText(message || selectedAlert?.message || "");
        setIsSuccess(selectedAlert?.type === "success");
        setVisible(true);

        // Auto-dismiss after 3 seconds
        setTimeout(() => setVisible(false), 3000);
      },
    }),
    []
  );

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 100,
          right: 16,
          width: "90%",
          zIndex: 1000,
        },
        animatedStyle,
      ]}
    >
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{
          backgroundColor: isSuccess ? colors.success : colors.error,
        }}
        action={{
          label: "",
          icon: "close",
          color: colors.white,
          onPress: () => setVisible(false),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {isSuccess ? (
            <AntDesign name="checkcircle" size={24} color="white" />
          ) : (
            <MaterialIcons name="cancel" size={24} color="white" />
          )}
          <MyText>{text}</MyText>
        </View>
      </Snackbar>
    </Animated.View>
  );
});

export default CustomSnackbar;
