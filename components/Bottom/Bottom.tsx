import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomButton from "./BottomButton";
import { MyButtonProps } from "../Elements/MyButton";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import MyText from "../Elements/MyText";
import { useRouter } from "expo-router";

export type BottomProps = {
  isApproved?: boolean;
  saveProps?: MyButtonProps;
  clearProps?: MyButtonProps;
  deleteProps?: MyButtonProps;
  approveProps?: MyButtonProps;
  approveCancelProps?: MyButtonProps;
  historyProps?: MyButtonProps;
};

const Bottom = ({
  isApproved,
  saveProps,
  clearProps,
  deleteProps,
  approveProps,
  approveCancelProps,
  historyProps,
}: BottomProps) => {
  const { showDialog } = useGlobalContext();
  return (
    <>
      {!isApproved ? (
        <LinearGradient
          colors={["#0A4A84", "#16171A"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {saveProps && (
              <BottomButton text="Kaydet" icon="save-blue" {...saveProps} />
            )}
            {deleteProps && (
              <BottomButton
                text="Sil"
                icon="delete-blue"
                {...deleteProps}
                onPress={() => {
                  showDialog({
                    type: "danger",
                    title: "Emin misiniz?",
                    callback: deleteProps.onPress,
                    message: "Bu kaydı silmek istediğinizden emin misiniz?",
                  });
                }}
              />
            )}
            {clearProps && (
              <BottomButton text="Temizle" icon="clear-blue" {...clearProps} />
            )}
            {historyProps && (
              <BottomButton
                text="Geçmiş"
                icon="history-blue"
                {...historyProps}
              />
            )}
            {approveProps && (
              <BottomButton
                text="Onayla"
                icon="approve-blue"
                {...approveProps}
              />
            )}
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={["#006716", "#16171A"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            paddingVertical: 12,
            minHeight: 48,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {!!approveCancelProps ? (
              <BottomButton
                text="Onayı iptal et"
                icon="clear-circle-white"
                {...approveCancelProps}
              />
            ) : (
              <MyText>Onaylı</MyText>
            )}
          </View>
        </LinearGradient>
      )}
    </>
  );
};

export default Bottom;
