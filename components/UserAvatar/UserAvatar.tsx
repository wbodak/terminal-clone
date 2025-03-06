import { Image, useColorScheme, View } from "react-native";
import MyText from "../Elements/MyText";

interface UserAvatarProps {
  imageUrl: string;
  borderShape?: "circle" | "square";
  width?: number;
  height?: number;
  name?: string;
  corp?: string;
}

const UserAvatar = ({
  imageUrl,
  borderShape = "circle",
  width,
  height,
  name,
  corp,
}: UserAvatarProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <View
        style={{
          borderRadius: borderShape === "circle" ? "100%" : 8,
          borderWidth: 1,
          padding: 8,
          borderColor: "#DDDDDD80",
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: width ?? 42, height: height ?? 42 }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
          paddingVertical: 4,
        }}
      >
        <MyText
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#CCCCCC",
          }}
        >
          {name}
        </MyText>
        <MyText
          style={{
            fontSize: 12,
            color: "#CCCCCC",
          }}
        >
          {corp}
        </MyText>
      </View>
    </View>
  );
};

export default UserAvatar;
