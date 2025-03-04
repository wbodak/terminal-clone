import React, { useEffect, useState } from "react";
import { Image, View, Dimensions, StyleSheet } from "react-native";

import { useDebounce } from "@/hooks/useDebaounce";

import Layout from "@/components/Layout";
import MenuCardList from "@/components/Menu/MenuCardList";

import { bgColors } from "@/constants/colors";

import { WebUserDto } from "@/types/dtos/WebUserDto";
import { MenuItem } from "@/types/dtos/MenuItem";
import { getDataFromStorage, removeDataFromStorage } from "@/utils/asyncStore";

import { FAB } from "react-native-paper";
import SideBar from "@/components/SideBar/SideBar";

const screenHeight = Dimensions.get("window").height;

const Home = () => {
  // States
  const [keyword, setKeyword] = useState("");
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const debaouncedValue = useDebounce(keyword, 300);
  const [user, setUser] = useState<WebUserDto>();

  //Effects
  useEffect(() => {
    getDataFromStorage("userData").then((value) => {
      if (!value) return;
      const userData: WebUserDto = JSON.parse(value);

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
    });
  }, [debaouncedValue]);

  return (
    <Layout hasHeader={false} fullWidth>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/workbook-terminal.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <SideBar user={user} />
        <MenuCardList data={menu} />
        <FAB
          icon={() => (
            <Image
              source={require("../assets/icons/barcode.gif")}
              style={styles.fabIcon}
              resizeMode="contain"
            />
          )}
          customSize={64}
          mode="elevated"
          style={styles.fabStyle}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
  },
  innerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  menuIcon: {
    display: "flex",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: 42,
  },
  fabIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    margin: 0,
  },
  fabStyle: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    paddingRight: 8,
    paddingBottom: 8,
    borderRadius: 50,
    position: "absolute",
    marginVertical: 25,
    right: 16,
    bottom: 16,
  },
});

export default Home;
