import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Text,
  Button,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { WebUserDto } from "@/types/dtos/WebUserDto";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { IMAGE_DOMAIN } from "@/constants/env";
import MyText from "../Elements/MyText";
import { removeDataFromStorage } from "@/utils/asyncStore";

interface SideBarProps {
  user?: WebUserDto;
}

export const ConfirmDialog = ({ visible, onConfirm, onCancel }: any) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.dialogText}>
            Are you sure you want to log out?
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onCancel} color="gray" />
            <Button title="Logout" onPress={onConfirm} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function SideBar({ user }: SideBarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const offset = useSharedValue(-300);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    offset.value = open ? -300 : 0;
  };

  const handleLogout = () => {
    removeDataFromStorage("userToken");
    removeDataFromStorage("userData");
    router.replace("/login");
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(offset.value) }],
  }));

  const confirmLogout = () =>
    Alert.alert("Çıkış yap", "Oturumunuz Kapatılsın mı ?", [
      {
        text: "Vazgeç",
        style: "cancel",
      },
      {
        text: "Çıkış yap",
        onPress: () => {
          handleLogout();
        },
      },
    ]);

  return (
    <>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <SimpleLineIcons name="menu" size={24} color="white" />
      </TouchableOpacity>

      <Animated.View style={[styles.sidebar, animatedStyle]}>
        <View style={styles.sidebarHeader}>
          <Image
            source={{ uri: `${IMAGE_DOMAIN}${user?.image}` }}
            style={{ width: 42, height: 42, borderRadius: 500 }}
            resizeMode="contain"
          />
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={32}
            color="white"
          />
          <AntDesign
            name="logout"
            size={32}
            color="white"
            onPress={confirmLogout}
          />
        </View>

        <View style={styles.divider}></View>
        <MyText style={styles.content}>{user?.nameSurname}</MyText>
        <MyText style={styles.content}>{user?.corpName}</MyText>
      </Animated.View>

      {open && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 18,
    left: 20,
    borderRadius: 5,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 300,
    height: "100%",
    backgroundColor: "#333",
    zIndex: 99,
    borderRadius: 8,
  },
  sidebarHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#444",
  },
  content: {
    padding: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 98,
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
