import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDebounce } from "@/hooks/useDebaounce";

import Layout from "@/components/Layout";
import MenuCardList from "@/components/Menu/MenuCardList";
import MyText from "@/components/Elements/MyText";

import { MenuItem } from "@/types/dtos/MenuItem";

import { getDataFromStorage, removeDataFromStorage } from "@/utils/asyncStore";

import { WebUserDto } from "@/types/dtos/WebUserDto";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { bgColors, colors } from "@/constants/Colors";

const Home = () => {
  // States
  const [keyword, setKeyword] = useState("");
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const debaouncedValue = useDebounce(keyword, 300);
  const [user, setUser] = useState<WebUserDto>();

  const router = useRouter();
  const { showDialog } = useGlobalContext();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const getUserInitials = () => {
    if (!user || !user?.nameSurname) return "NA";
    const nameParts = user.nameSurname.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${
        nameParts[nameParts.length - 1][0]
      }`.toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Günaydın";
    if (hour < 18) return "İyi günler";
    return "İyi akşamlar";
  };

  const updateMenuList = (userData: WebUserDto) => {
    const menuList = userData.setMenuMasterList.map((menuMaster) => ({
      name: menuMaster.SETMENUMASTER_TITLE,
      list: menuMaster.SetMenuDetailGroups.flat()
        .filter(
          (x) =>
            !x.SETMENUDETAIL_PASSIVE &&
            x.SETMENUDETAIL_TITLE.toLocaleLowerCase("tr-TR").includes(
              debaouncedValue.toLocaleLowerCase("tr-TR")
            )
        )
        .map((x, i) => ({ ...x, color: bgColors[i % bgColors.length] })),
    }));
    setUser(userData);
    setMenu(menuList);
  };

  // Effects
  useEffect(() => {
    getDataFromStorage("userData").then((value) => {
      if (!value) return;
      const userData: WebUserDto = JSON.parse(value);
      updateMenuList(userData);
    });
  }, []);

  const handleOpenMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = () => {
    removeDataFromStorage("userToken");
    removeDataFromStorage("userData");
    router.replace("/login");
  };

  return (
    <Layout hasHeader={false} fullWidth barcodeButton={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.avatarContainer}
            activeOpacity={0.7}
            onPress={handleOpenMenu}
          >
            <View style={styles.initialsContainer}>
              <MyText style={styles.initials}>{getUserInitials()}</MyText>
            </View>

            <View style={styles.userInfo}>
              <MyText style={styles.greeting}>{getGreeting()}</MyText>
              <MyText style={styles.userName}>
                {user?.nameSurname || "Kullanıcı"}
              </MyText>
            </View>
          </TouchableOpacity>
          <Image
            source={require("../assets/images/workbook-terminal.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {isMenuVisible && (
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                showDialog({
                  type: "info",
                  title: "Çıkış yap",
                  message: "Oturumunuz Kapatılacaktır emin misiniz ?",
                  callback: () => handleLogout(),
                });
              }}
            >
              <AntDesign name="logout" size={24} color="#CCCCCC" />
              <MyText style={styles.menuItemText}>Çıkış Yap</MyText>
            </TouchableOpacity>
          </View>
        )}

        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <MenuCardList data={menu} />
        </Animated.ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
  initialsContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    height: 42,
    width: 180,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  // Dropdown menu styles
  dropdownContainer: {
    position: "absolute",
    top: 76, // Below the header
    left: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    width: 180,
    zIndex: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 16,
  },
  menuItemIcon: {
    marginRight: 12,
    fontSize: 18,
  },
  menuItemText: {
    color: colors.white,
    fontSize: 12,
  },
});

export default Home;
