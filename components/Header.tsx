import React from "react";
import { View, Image } from "react-native";
import MyText from "./Elements/MyText";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { icons } from "@/assets/icons";
import { useRouter } from "expo-router";
import { IconButton } from "react-native-paper";

type Props = {
  title?: string;
  description?: string;
  backButtonEnable?: boolean;
};

const Header = ({ title, description, backButtonEnable = true }: Props) => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0A4A84", "#16171A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        paddingHorizontal: 16,
        paddingTop: insets.top + 8,
        paddingBottom: 8,
        position: "static",
        paddingRight: 50,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          position: "relative",
          paddingRight: 32,
        }}
      >
        {backButtonEnable && (
          <IconButton
            icon={require("../assets/icons/left-arrow.png")}
            size={16}
            style={{ margin: 0 }}
            iconColor="white"
            onPress={() => router.back()}
          />
        )}
        <MyText
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {title}
        </MyText>
      </View>
      {description && (
        <View
          style={{
            marginTop: 8,
            marginHorizontal: 8,
            marginLeft: 32,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={icons[route.name as keyof typeof icons]}
            style={{ width: 48, height: 48, marginRight: 20 }}
            resizeMode="contain"
          />
          <View
            style={{
              width: 1,
              height: 53,
              backgroundColor: "white",
              marginRight: 24,
            }}
          ></View>
          <Image
            source={require("../assets/icons/info.png")}
            style={{ width: 16, height: 16, marginRight: 8 }}
            resizeMode="contain"
          />
          <MyText style={{ fontSize: 12, fontWeight: 400, paddingRight: 100 }}>
            {description}
          </MyText>
        </View>
      )}
    </LinearGradient>
  );
};

export default Header;
