import { icons } from "@/assets/icons";
import Layout from "@/components/Layout";
import MenuCardList from "@/components/Menu/MenuCardList";
import { bgColors } from "@/constants/colors";
import { IMAGE_DOMAIN } from "@/constants/env";
import { useDebounce } from "@/hooks/useDebaounce";
import { MenuItem } from "@/types/dtos/MenuItem";
import { WebUserDto } from "@/types/dtos/WebUserDto";
import { getDataFromStorage, removeDataFromStorage } from "@/utils/asyncStore";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, View, Dimensions } from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import { Button, Menu, PaperProvider } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const TabPage = () => {
  const [keyword, setKeyword] = useState("");
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [user, setUser] = useState<WebUserDto>();
  const debaouncedValue = useDebounce(keyword, 300);

  useEffect(() => {
    getDataFromStorage("userData").then((str) => {
      if (!str) return null;
      const userData: WebUserDto = JSON.parse(str);
      const menuList = userData.setMenuMasterList.map((menuMaster) => {
        return {
          name: menuMaster.SETMENUMASTER_TITLE,
          list: menuMaster.SetMenuDetailGroups.flat()
            .filter((x) => !x.SETMENUDETAIL_PASSIVE)
            .filter((x) =>
              x.SETMENUDETAIL_TITLE.toLocaleLowerCase("tr-TR").includes(
                debaouncedValue.toLocaleLowerCase("tr-TR")
              )
            )
            .map((x, i) => {
              return { ...x, color: bgColors[i % bgColors.length] };
            }),
        };
      });
      setUser(userData);
      setMenu(menuList);
    });
  }, [debaouncedValue]);

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Layout hasHeader={false} fullWidth>
      <View style={{ height: screenHeight }}>
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              width: "100%",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/workbook-terminal.png")}
              style={{ height: 30 }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              zIndex: 100,
            }}
          >
            <PaperProvider>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  zIndex: 9999,
                }}
              >
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  contentStyle={{ backgroundColor: "white" }}
                  style={{ zIndex: 999 }}
                  anchor={
                    <Button onPress={openMenu}>
                      <Image
                        source={{ uri: `${IMAGE_DOMAIN}${user?.image}` }}
                        style={{ width: 48, height: 48, borderRadius: 500 }}
                        resizeMode="contain"
                      />
                    </Button>
                  }
                >
                  <Menu.Item
                    theme={{
                      colors: {
                        primaryContainer: "red",
                        secondaryContainer: "red",
                      },
                    }}
                    leadingIcon={() => (
                      <Image
                        source={icons.logout}
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                      />
                    )}
                    onPress={() => {
                      removeDataFromStorage("userToken");
                      removeDataFromStorage("userData");
                      router.replace("/login");
                    }}
                    titleStyle={{ color: "black" }}
                    title="Çıkış Yap"
                  />
                </Menu>
              </View>
            </PaperProvider>
            <Searchbar
              value={keyword}
              onChangeText={(text) => setKeyword(text)}
              placeholder="Arama..."
              inputStyle={{
                height: 48,
                color: "white",
                minHeight: 0,
                fontFamily: "Inter",
                flex: 1,
              }}
              placeholderTextColor={"white"}
              icon={() => (
                <Image
                  source={require("../assets/icons/search.png")}
                  style={{ width: 32, height: 32 }}
                  resizeMode="contain"
                />
              )}
              clearIcon={undefined}
              style={{
                fontFamily: "Inter",
                height: 48,
                width: screenWidth - 92,
                marginBottom: 56,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#9429FF",
                backgroundColor: "#313236",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            />
          </View>
        </View>
        <MenuCardList data={menu} />
        <FAB
          icon={() => (
            <Image
              source={require("../assets/icons/barcode.gif")}
              style={{ width: 40, height: 40, borderRadius: 50, margin: 0 }}
              resizeMode="contain"
            />
          )}
          customSize={64}
          mode={"elevated"}
          style={{
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
          }}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </Layout>
  );
};

export default TabPage;
