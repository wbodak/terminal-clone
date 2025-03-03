import React from "react";
import MenuCard from "./MenuCard";
import { View, StyleSheet, ScrollView } from "react-native";
import { DetailMenuItem, MenuItem } from "@/types/dtos/MenuItem";
import { Text } from "react-native-paper";
import { Href } from "expo-router";
import { icons } from "@/assets/icons";

type Props = {
  data: MenuItem[];
};

const MenuCardList = ({ data }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {data.map((menuItem, index) => (
        <View key={index}>
          <Text style={styles.menuTitle}>{menuItem.name}</Text>
          <View style={styles.menuList}>
            {menuItem.list.map((detailMenu, i) => (
              <View key={i} style={styles.menuItem}>
                <MenuCard
                  path={detailMenu.SETMENUDETAIL_PATH}
                  title={detailMenu.SETMENUDETAIL_TITLE}
                  icon={
                    detailMenu.SETMENUDETAIL_PATH.replace(
                      "/",
                      ""
                    ) as keyof typeof icons
                  }
                  color={detailMenu.color}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  menuTitle: {
    fontFamily: "Inter",
    color: "white",
    borderBottomWidth: 1,
    borderColor: "#313236",
    paddingBottom: 5,
  },
  menuList: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 26,
  },
  menuItem: {
    width: "48%",
  },
});

export default MenuCardList;
