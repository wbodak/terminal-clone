import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./Header";
import MyText from "./Elements/MyText";
import Bottom, { BottomProps } from "./Bottom/Bottom";
import { StatusBar } from "expo-status-bar";

type Props = {
  children: React.ReactNode;
  hasHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
  headerBackButtonEnable?: boolean;
  showSubTitle?: boolean;
  bottomProps?: BottomProps;
  fullWidth?: boolean;
};
const Layout = ({
  children,
  hasHeader = true,
  headerTitle = "",
  headerDescription = "",
  headerBackButtonEnable = true,
  showSubTitle = true,
  bottomProps,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "#16171A",
        flex: 1,
        width: "100%",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />
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
      {bottomProps && <Bottom {...bottomProps} />}
    </View>
  );
};

export default Layout;
