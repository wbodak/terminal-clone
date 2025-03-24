import { icons } from "@/assets/icons";
import { useRouter } from "expo-router";
import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import { Card } from "react-native-paper";
import MyText from "../Elements/MyText";

const screenWidth = Dimensions.get("window").width;

export type MenuCardProps = {
  title: string;
  path: string;
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
        height: 80,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: color,
          height: "100%",
        }}
      >
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <Image
            source={icons[icon]}
            style={{ width: 48, height: 48 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            width: 1,
            height: "70%",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        />
        <View
          style={{
            flex: 8,
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
        >
          <MyText
            style={{
              fontFamily: "Inter",
              fontSize: 12,
              color: "white",
              lineHeight: 18,
            }}
          >
            {title}
          </MyText>
        </View>
      </View>
    </Card>
  );
};

export default MenuCard;
