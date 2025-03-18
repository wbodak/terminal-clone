import { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyText from "../Elements/MyText";

interface ColumnDefinition {
  dataField: string;
  caption: string;
}

interface CustomModalInterface {
  isOpen: boolean;
  handleClose: () => void;
  selectedTableItem: any;
  detailColumns?: ColumnDefinition[];
}

const CustomModal = ({
  isOpen,
  handleClose,
  selectedTableItem,
  detailColumns,
}: CustomModalInterface) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={isOpen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerContainer}>
                <View style={styles.headerSpacer} />
                <MyText style={styles.modalTitle}>Detay Bilgileri</MyText>
                <Pressable onPress={handleClose} style={styles.closeButton}>
                  <Ionicons name="close" size={32} color="white" />
                </Pressable>
              </View>

              <ScrollView style={styles.contentScrollView}>
                {detailColumns && selectedTableItem ? (
                  <View style={styles.detailContainer}>
                    {detailColumns.map((column, index) => (
                      <View key={index} style={styles.detailRow}>
                        <MyText style={styles.detailLabel}>
                          {column.caption}
                        </MyText>
                        <MyText style={styles.detailValue}>
                          {selectedTableItem[column.dataField] !== undefined &&
                          selectedTableItem[column.dataField] !== null
                            ? selectedTableItem[column.dataField].toString()
                            : "-"}
                        </MyText>
                      </View>
                    ))}
                  </View>
                ) : (
                  <MyText style={styles.noDataText}>Bilgi bulunamadı</MyText>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  headerSpacer: {
    width: 32,
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    padding: 5,
  },
  modalView: {
    width: "100%",
    height: "90%",
    backgroundColor: "#121212",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  contentScrollView: {
    width: "100%",
    flex: 1,
  },
  detailContainer: {
    width: "100%",
    paddingBottom: 20,
  },
  detailRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: "100%",
  },
  detailLabel: {
    color: "#8E8E93",
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    color: "white",
    fontSize: 16,
  },
  noDataText: {
    color: "#8E8E93",
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    marginTop: 20,
    minWidth: 150,
  },
  buttonClose: {
    backgroundColor: "#3366FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#E0E0E0",
  },
});

export default CustomModal;
