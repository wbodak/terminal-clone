import MyText from "@/components/Elements/MyText";
import { colors } from "@/constants/Colors";
import { Href, Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <View style={styles.container}>
        <MyText>Böyle bir sayfa yok.</MyText>
        <Link href={"/home"} style={styles.link}>
          <MyText>Ana sayfaya dön</MyText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
