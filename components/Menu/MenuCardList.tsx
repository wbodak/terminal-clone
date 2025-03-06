import React from "react";
import MenuCard from "./MenuCard";
import { View, StyleSheet, ScrollView } from "react-native";
import { DetailMenuItem, MenuItem } from "@/types/dtos/MenuItem";
import { icons } from "@/assets/icons";
import MyText from "../Elements/MyText";

type Props = {
  data: MenuItem[];
};

const MenuCardList = ({ data }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {data.map((menuItem, index) => (
        <View key={index}>
          <MyText style={styles.menuTitle}>{menuItem.name}</MyText>
          <View style={styles.menuList}>
            {menuItem.list.map((detailMenu, i) => (
              <View key={i} style={styles.menuItemWrapper}>
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
    borderBottomWidth: 1,
    borderColor: "#313236",
    paddingBottom: 5,
  },
  menuList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
    marginBottom: 26,
  },
  menuItemWrapper: {
    width: "48%",
  },
});

export default MenuCardList;
