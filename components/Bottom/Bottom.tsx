import React from "react";
import { View, StyleSheet } from "react-native";
import BottomButton from "./BottomButton";
import { MyButtonProps } from "../Elements/MyButton";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import MyText from "../Elements/MyText";
import { colors } from "@/constants/Colors";

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
    <View
      style={isApproved ? styles.approvedContainer : styles.actionContainer}
    >
      {!isApproved ? (
        <View style={styles.buttonsRow}>
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
            <BottomButton text="Geçmiş" icon="history-blue" {...historyProps} />
          )}
          {approveProps && (
            <BottomButton text="Onayla" icon="approve-blue" {...approveProps} />
          )}
        </View>
      ) : (
        <View style={styles.approvedContent}>
          {!!approveCancelProps ? (
            <BottomButton
              text="Onayı iptal et"
              icon="clear-circle-white"
              {...approveCancelProps}
            />
          ) : (
            <View style={styles.approvedTextContainer}>
              <MyText style={styles.approvedText}>Onaylı</MyText>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    backgroundColor: colors.cardBackground,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#2A2D36",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // position: "absolute",
    bottom: 0,
    marginTop: 8,
  },
  approvedContainer: {
    backgroundColor: colors.cardBackground,
    paddingVertical: 6,
    minHeight: 48,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "absolute",
    bottom: 0,
  },
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  approvedContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  approvedTextContainer: {
    backgroundColor: "#00550E",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  approvedText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default Bottom;
