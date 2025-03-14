import React from "react";
import { ScrollView, StatusBar, View, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./Header";
import MyText from "./Elements/MyText";
import Bottom, { BottomProps } from "./Bottom/Bottom";
import { FAB } from "react-native-paper";

type Props = {
  children: React.ReactNode;
  hasHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
  headerBackButtonEnable?: boolean;
  showSubTitle?: boolean;
  bottomProps?: BottomProps;
  fullWidth?: boolean;
  barcodeButton?: boolean;
};
const Layout = ({
  children,
  hasHeader = true,
  headerTitle = "",
  headerDescription = "",
  headerBackButtonEnable = true,
  showSubTitle = true,
  bottomProps,
  barcodeButton = false,
}: Props) => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    fabIcon: {
      width: 32,
      height: 32,
      alignSelf: "center",
      transform: "scale(1.5)",
    },

    fabStyle: {
      position: "absolute",
      right: 32,
      bottom: 32,
      zIndex: 999,
      backgroundColor: "white",
      borderRadius: 100,
      elevation: 0,
      shadowColor: "transparent",
      shadowOpacity: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
      display: "flex",
      justifyContent: "center", // This is good for vertical centering
      alignItems: "center", // This is good for horizontal centering
      alignContent: "center",
      textAlign: "center",
    },
  });
  return (
    <View
      style={{
        backgroundColor: "#12263A",
        flex: 1,
        width: "100%",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar backgroundColor="#12263A" barStyle="light-content" />
      {hasHeader && (
        <Header
          title={headerTitle}
          description={headerDescription}
          backButtonEnable={headerBackButtonEnable}
        />
      )}
      <ScrollView keyboardShouldPersistTaps="handled">
        {hasHeader && showSubTitle && (
          <>
            <MyText style={{ fontSize: 12, paddingHorizontal: 16 }}>
              {headerTitle} Bilgileri
            </MyText>
            <View
              style={{
                width: "100%",
                height: 1,
                marginTop: 4,
                marginBottom: 8,
                backgroundColor: "#313236",
              }}
            />
          </>
        )}
        {children}
      </ScrollView>
      {barcodeButton && (
        <FAB
          icon={() => (
            <Image
              source={require("../assets/icons/barcode.gif")}
              style={styles.fabIcon}
            />
          )}
          customSize={64}
          style={styles.fabStyle}
          onPress={() => console.log("Pressed")}
        />
      )}
      {bottomProps && <Bottom {...bottomProps} />}
    </View>
  );
};

export default Layout;
