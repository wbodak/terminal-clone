import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GlobalProvider } from "@/context/GlobalContext";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <StatusBar style="light" />
        <Stack.Screen name="index" options={{ headerShown: false }} redirect />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="shipping"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="shipping-detail"
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="storeTransfer"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="storeTransfer-detail"
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="rackTransfer"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="rackTransfer-detail"
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="counting"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="counting-detail"
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="purchaseReturn"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="purchaseReturn-detail"
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="barcode-history"
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="helper/company-helper"
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="materialOutput"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="materialOutput-detail"
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalProvider>
  );
}
