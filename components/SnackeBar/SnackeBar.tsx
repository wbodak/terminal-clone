import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Icon, Snackbar } from "react-native-paper";
import data from "./data.json";
import { StyleSheet, View } from "react-native";
import MyText from "../Elements/MyText";
import { colors } from "@/constants/Colors";

export type CustomAlertProps = {
  message?: string;
  title?: string;
  dialogName: string;
  accept?: () => void;
  cancel?: () => void;
};

type AlertModel = {
  type: "success" | "error" | "question";
  name: string;
  language: string;
  title: string;
  message: string;
};

const SnackeBar = (props: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [text, setText] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  useImperativeHandle(
    ref,
    () => ({
      showSnackeBar: ({ dialogName, message = "" }: CustomAlertProps) => {
        const selectedAlert = data.find(
          (alert) => alert.name === dialogName
        ) as AlertModel | undefined;
        setVisible(true);
        setText(message || selectedAlert?.message || "");
        setIsSuccess(selectedAlert?.type === "success");
      },
    }),
    []
  );

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      duration={3000}
      icon={"check"}
    >
      <View style={styles.container}>
        <MyText style={styles.text}>{text}</MyText>
        <Icon
          size={28}
          source={isSuccess ? "check" : "close"}
          color={isSuccess ? "green" : "red"}
        />
      </View>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: colors.white,
  },
});

export default forwardRef(SnackeBar);
