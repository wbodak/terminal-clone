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
  useColorScheme,
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
import { getDataFromStorage, removeDataFromStorage } from "@/utils/asyncStore";
import Feather from "@expo/vector-icons/Feather";
import UserAvatar from "../UserAvatar/UserAvatar";

interface SideBarProps {
  user?: WebUserDto;
}

export default function SideBar({ user }: SideBarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const offset = useSharedValue(-300);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    offset.value = open ? -300 : 0;
  };

  const handleLogout = (clearApiUrl: boolean = false) => {
    clearApiUrl && removeDataFromStorage("apiUrl");
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

  const getApiUrl = async () => {
    const value = await getDataFromStorage("apiUrl");
    return value;
  };

  const confirmChangeApiUrl = async () =>
    Alert.alert(
      `${await getApiUrl()} kullandığınız api Url değiştirilecek`,
      "Oturumunuz kapatılacak api Url değiştirlecek emin misiniz ?",
      [
        {
          text: "Vazgeç",
          style: "cancel",
        },
        {
          text: "Çıkış yap",
          onPress: () => {
            handleLogout(true);
          },
        },
      ]
    );
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
      backgroundColor: "#1C1C1E",
      zIndex: 99,
      borderRadius: 8,
    },
    sidebarHeader: {
      padding: 16,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
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
  return (
    <>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <SimpleLineIcons name="menu" size={24} color="#CCCCCC" />
      </TouchableOpacity>

      <Animated.View style={[styles.sidebar, animatedStyle]}>
        <View style={styles.sidebarHeader}>
          <TouchableOpacity>
            <UserAvatar
              imageUrl={`${IMAGE_DOMAIN}${user?.image}`}
              borderShape="circle"
              name={user?.nameSurname}
              corp={user?.corpName}
            />
          </TouchableOpacity>
          <AntDesign
            name="logout"
            size={32}
            color="#CCCCCC"
            onPress={confirmLogout}
          />
        </View>

        <View style={styles.divider}></View>

        <Feather
          name="server"
          size={32}
          color={"#CCCCCC"}
          onPress={confirmChangeApiUrl}
        />
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={32}
          color={"#CCCCCC"}
        />
      </Animated.View>

      {open && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
    </>
  );
}
