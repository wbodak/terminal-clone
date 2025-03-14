import React, { useEffect, useRef, useState } from "react";
import { useAxios } from "@/hooks/useAxiox";
import { SelectBoxDto } from "@/types/dtos/SelectBoxDto";
import { WebUserDto } from "@/types/dtos/WebUserDto";
import {
  getDataFromStorage,
  saveDataToStorage,
  removeDataFromStorage,
} from "@/utils/asyncStore";
import { transformSelctBoxData } from "@/utils/helper";
import { useRouter } from "expo-router";
import {
  Image,
  View,
  ScrollView,
  TextInput as TpRN,
  StyleSheet,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import MyText from "@/components/Elements/MyText";
import MyInput from "@/components/Elements/MyInput";
import MyButton from "@/components/Elements/MyButton";
import MyDropdown from "@/components/Elements/MyDropdown";
import { icons } from "@/assets/icons";
import { V_SetUserCorporation } from "@/types/db/V_SetUserCorporation";
import Layout from "@/components/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";

const Login = () => {
  const router = useRouter();
  const { axiosGet, axiosPost } = useAxios();

  const [corpId, setCorpId] = useState(0);
  const [sectionId, setSectionId] = useState(0);
  const [year, setYear] = useState(`${new Date().getFullYear()}`);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasApiUrl, setHasApiUrl] = useState(true);
  const [apiUrl, setApiUrl] = useState("");
  const [corporationDtos, setCorporationDtos] = useState<SelectBoxDto[]>([]);

  const [selectionData, setSelectionData] = useState<
    {
      data: SelectBoxDto;
      corporationId: number;
      sections: SelectBoxDto[];
    }[]
  >([]);

  useEffect(() => {
    removeDataFromStorage("userToken");
    removeDataFromStorage("userData");
  }, []);

  useEffect(() => {
    checkApiUrl();
  }, []);

  const checkApiUrl = async () => {
    await getDataFromStorage("apiUrl").then((storageUrl: string | null) => {
      setApiUrl(storageUrl || "");
      setHasApiUrl(!!storageUrl);
    });
  };

  const selectedCorp = selectionData.find(
    (corp) => corp.corporationId === corpId
  );

  let sectionDtos: SelectBoxDto[] = [];

  if (selectedCorp) {
    sectionDtos = selectedCorp.sections;
  }

  const passRef = useRef<TpRN>(null);

  const handleUserNameOnBlur = () => {
    const corporations: {
      data: SelectBoxDto;
      corporationId: number;
      sections: SelectBoxDto[];
    }[] = [];
    if (!userName) {
      return;
    }
    axiosGet({
      path: `/login/GetSetUserCorporationListByUserName?userName=${userName}`,
      sendToken: false,
      showToastMessage: true,
      success: (data) => {
        data.forEach((userCorporation: V_SetUserCorporation) => {
          if (corporations.length > 0) {
            corporations.forEach((corporation) => {
              if (
                corporation.corporationId ===
                userCorporation.SETUSERCORPORATION_CORP_ID
              ) {
                corporation.sections.push({
                  value: userCorporation.SETUSERCORPORATION_SECTION_ID,
                  text: userCorporation.SETUSERCORPORATION_SECTIONNAME,
                  code: userCorporation.SETUSERCORPORATION_SECTIONCODE,
                });
              } else {
                corporations.push({
                  corporationId: userCorporation.SETUSERCORPORATION_CORP_ID,
                  data: {
                    value: userCorporation.SETUSERCORPORATION_CORP_ID,
                    text: userCorporation.SETUSERCORPORATION_CORPORATIONNAME,
                    code: userCorporation.SETUSERCORPORATION_CORPORATIONCODE,
                  },
                  sections: [
                    {
                      value: userCorporation.SETUSERCORPORATION_SECTION_ID,
                      text: userCorporation.SETUSERCORPORATION_SECTIONNAME,
                      code: userCorporation.SETUSERCORPORATION_SECTIONCODE,
                    },
                  ],
                });
              }
            });
          } else {
            corporations.push({
              corporationId: userCorporation.SETUSERCORPORATION_CORP_ID,
              data: {
                value: userCorporation.SETUSERCORPORATION_CORP_ID,
                text: userCorporation.SETUSERCORPORATION_CORPORATIONNAME,
                code: userCorporation.SETUSERCORPORATION_CORPORATIONCODE,
              },
              sections: [
                {
                  value: userCorporation.SETUSERCORPORATION_SECTION_ID,
                  text: userCorporation.SETUSERCORPORATION_SECTIONNAME,
                  code: userCorporation.SETUSERCORPORATION_SECTIONCODE,
                },
              ],
            });
          }
          setSelectionData(corporations);
          setSectionId(corporations[0].sections[0].value as number);
          setCorpId(corporations[0].corporationId);
          setCorporationDtos(
            corporations.map((corporation) => corporation.data)
          );
        });
      },
    });
  };

  const backToApiUrl = () => {
    setHasApiUrl(false);
    removeDataFromStorage("apiUrl");
    resetForm();
  };
  const resetForm = () => {
    setUserName("");
    setPassword("");
    setCorpId(0);
    setSectionId(0);
  };

  return (
    <Layout hasHeader={false} fullWidth>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}
      >
        <Video
          source={require("../assets/videos/login-background.mp4")}
          rate={0.8}
          volume={1.0}
          isMuted={true}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          style={styles.backgroundVideo}
        />
        <View>
          <MyText style={styles.headerText}>Giriş yapın</MyText>
          <View style={styles.formContainer}>
            {hasApiUrl && (
              <Ionicons
                name="arrow-back"
                size={24}
                color="#e09607"
                onPress={backToApiUrl}
              />
            )}

            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/workbook-terminal.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            {!hasApiUrl ? (
              <>
                <MyText style={styles.infoText}>
                  Bir kereliğine girilecek olan sunucu adresini giriniz.
                </MyText>
                <View style={styles.formFieldsContainer}>
                  <MyInput
                    // theme={"light"}
                    placeholder="Örn: http://0.0.0.0:0"
                    label={"Sunucu Adresi"}
                    returnKeyType="done"
                    value={apiUrl}
                    onChangeText={(text) => {
                      setApiUrl(text);
                    }}
                  />
                  <MyButton
                    style={styles.darkButton}
                    onPress={() => {
                      saveDataToStorage("apiUrl", apiUrl);
                      checkApiUrl();
                    }}
                  >
                    <MyText style={styles.buttonText}>Kaydet</MyText>
                  </MyButton>
                </View>
              </>
            ) : (
              <>
                <MyText style={styles.loginInfoText}>
                  Yöneticiniz tarafından size verilen giriş bilgilerini
                  kullanarak sisteme giriş yapabilirsiniz.
                </MyText>

                <View style={styles.formFieldsContainer}>
                  <MyInput
                    // theme={"light"}
                    placeholder="Örn: ad.soyad"
                    label={"Kullanıcı Adı"}
                    returnKeyType="next"
                    value={userName}
                    onSubmitEditing={() => passRef.current?.focus()}
                    onChangeText={(text) => {
                      setUserName(text);
                    }}
                    onBlur={handleUserNameOnBlur}
                  />
                  <MyInput
                    // theme={"light"}
                    ref={passRef}
                    secureTextEntry={!showPassword}
                    label={"Şifre"}
                    returnKeyType="next"
                    placeholder="Şifre"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                    icons={
                      <MyButton
                        style={styles.passwordToggleButton}
                        onPress={() => {
                          setShowPassword((x) => !x);
                        }}
                      >
                        <Image
                          source={icons[showPassword ? "eye" : "eye-hide"]}
                          style={styles.passwordToggleIcon}
                          resizeMode="contain"
                        />
                      </MyButton>
                    }
                  />
                  <MyDropdown
                    // theme={"light"}
                    data={transformSelctBoxData(corporationDtos)}
                    placeholder="Şirket Seçiniz"
                    label="Şirket"
                    value={corpId}
                    setValue={(x) => setCorpId(Number(x))}
                  />
                  <MyDropdown
                    // theme={"light"}
                    data={transformSelctBoxData(sectionDtos)}
                    placeholder="Şube Seçiniz"
                    label="Şube"
                    value={sectionId}
                    setValue={(x) => setSectionId(Number(x))}
                  />
                  <MyInput
                    // // theme={"light"}
                    value={year}
                    label={"Yıl"}
                    returnKeyType="next"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setYear(text);
                    }}
                  />
                  <MyButton
                    style={styles.darkButton}
                    onPress={() => {
                      axiosPost({
                        path: "/Login/UserControl",
                        body: {
                          userName: userName,
                          password: password,
                          corp_id: corpId,
                          section_id: sectionId,
                          year: year,
                          accountType: 1,
                        },
                        sendToken: false,
                        success: async (data: WebUserDto) => {
                          await saveDataToStorage(
                            "userToken",
                            data.token || ""
                          );
                          await saveDataToStorage(
                            "userData",
                            JSON.stringify(data)
                          );
                          router.replace("/home");
                        },
                      });
                    }}
                  >
                    <MyText style={styles.buttonText}>Giriş Yap</MyText>
                  </MyButton>
                </View>
              </>
            )}
          </View>
        </View>
        <MyText style={styles.footerText}>Powered By Odak İnovasyon</MyText>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    width: "100%",
    height: "100%",
    minHeight: 800,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 32,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
  headerText: {
    paddingLeft: 33,
    fontSize: 24,
    fontWeight: "900",
  },
  formContainer: {
    backgroundColor: "rgba(20, 21, 24, 0.5)",
    margin: 16,
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: 27,
  },
  logo: {
    width: 187,
  },
  infoText: {
    marginBottom: 42,
    fontSize: 14,
    fontWeight: "300",
  },
  loginInfoText: {
    marginBottom: 42,
    fontSize: 16,
    fontWeight: "300",
  },
  formFieldsContainer: {
    marginVertical: "auto",
    display: "flex",
    gap: 12,
  },
  darkButton: {
    backgroundColor: "#16171A",
  },
  buttonText: {
    fontWeight: "800",
    fontSize: 14,
  },
  passwordToggleButton: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
  passwordToggleIcon: {
    width: 16,
    height: 16,
  },
  footerText: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    margin: "auto",
    textAlign: "center",
  },
});

export default Login;
