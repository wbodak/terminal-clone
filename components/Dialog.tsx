import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import {
  Image,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import MyButton, { MyButtonOnPress } from "./Elements/MyButton";
import MyText from "./Elements/MyText";
import { icons } from "@/assets/icons";

export type DialogProps = {
  title: string;
  message: string;
  type: "danger" | "info" | "success";
  callback?: MyButtonOnPress;
  cancelText?: string;
  confirmText?: string;
  showCancel?: boolean;
};

const configs = {
  danger: {
    icon: icons["alert-dialog"],
    color: "#FF5A5F",
    bgColor: "rgba(255, 90, 95, 0.1)",
  },
  info: {
    icon: icons["info-dialog"],
    color: "#4A90E2",
    bgColor: "rgba(74, 144, 226, 0.1)",
  },
  success: {
    icon: icons["success"],
    color: "#50E3C2",
    bgColor: "rgba(80, 227, 194, 0.1)",
  },
};

const { height } = Dimensions.get("window");

const MyDialog = (props: any, ref: any) => {
  const [isShowing, setIsShowing] = useState(false);

  const [dialog, setDialog] = useState<DialogProps>({
    type: "info",
    title: "Bilgilendirme",
    message: "Bu bir bilgilendirme mesajıdır. Lütfen dikkate almayınız.",
    callback: () => {},
    cancelText: "Hayır",
    confirmText: "Evet",
    showCancel: true,
  });

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(height))[0];

  const showDialog = (dialogProps: DialogProps) => {
    const mergedDialog = { ...dialog, ...dialogProps };
    setDialog(mergedDialog);
    setIsShowing(true);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 30,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideDialog = (callback?: Function) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsShowing(false);
      callback && callback();
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      show: showDialog,
    }),
    []
  );

  const handleBackdropPress = () => {
    hideDialog();
  };

  const handleCancel = () => {
    hideDialog();
  };

  const handleConfirm = (e: any) => {
    hideDialog(() => dialog?.callback && dialog.callback(e));
  };

  useEffect(() => {
    return () => {
      fadeAnim.stopAnimation();
      slideAnim.stopAnimation();
    };
  }, []);

  if (!isShowing) return null;

  return (
    <TouchableWithoutFeedback onPress={handleBackdropPress}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeAnim,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 2001,
        }}
      >
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={{
              width: "90%",
              maxWidth: 400,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: configs[dialog.type].color,
              backgroundColor: "#12263A",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 10,
              transform: [{ translateY: slideAnim }],
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: "100%",
                paddingVertical: 8,
                paddingHorizontal: 16,
                display: "flex",
                gap: 16,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255, 255, 255, 0.1)",
                backgroundColor: configs[dialog.type].bgColor,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: `${configs[dialog.type].color}33`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Image
                  source={configs[dialog.type].icon}
                  style={{ width: 32, height: 32 }}
                />
              </View>
              <MyText
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {dialog?.title}
              </MyText>
            </View>

            <View style={{ padding: 24, paddingTop: 16 }}>
              <MyText
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                {dialog?.message}
              </MyText>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 12,
                paddingHorizontal: 24,
                paddingBottom: 24,
              }}
            >
              {dialog.showCancel !== false && (
                <MyButton
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    height: "auto",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 8,
                  }}
                  onPress={handleCancel}
                >
                  <MyText style={{ color: "white", fontWeight: "500" }}>
                    {dialog.cancelText || "Hayır"}
                  </MyText>
                </MyButton>
              )}
              <MyButton
                style={{
                  backgroundColor: configs[dialog.type].color,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  height: "auto",
                  borderRadius: 8,
                }}
                onPress={handleConfirm}
              >
                <MyText style={{ color: "#12263A", fontWeight: "bold" }}>
                  {dialog.confirmText || "Evet"}
                </MyText>
              </MyButton>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default forwardRef(MyDialog);
