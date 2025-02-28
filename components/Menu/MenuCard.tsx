import { icons } from "@/assets/icons";
import { Href, useRouter } from "expo-router";
import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import { Card } from "react-native-paper";
import MyText from "../Elements/MyText";

const screenWidth = Dimensions.get("window").width;

export type MenuCardProps = {
  title: string;
  path: Href<string | object>;
  icon: keyof typeof icons;
  color: string;
};

const MenuCard = ({ title, icon, path = "/home", color }: MenuCardProps) => {
  const router = useRouter();

  return (
    <Card
      onPress={() =>
        router.push({ pathname: path as any, params: { title: title } })
      }
      style={{
        backgroundColor: "none",
        width: screenWidth / 2 - 26,
        height: 98,
      }}
    >
      <View
        style={{
          paddingVertical: 4,
          paddingLeft: 16,
          paddingRight: 8,
          width: "100%",
          height: 98,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          backgroundColor: color,
          borderRadius: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Image
          source={icons[icon]}
          style={{ width: 48, height: 48 }}
          resizeMode="contain"
        />
        <MyText
          style={{
            fontFamily: "Inter",
            fontSize: 15,
            color: "white",
            lineHeight: 18,
          }}
        >
          {title}
        </MyText>
      </View>
    </Card>
  );
};

export default MenuCard;
