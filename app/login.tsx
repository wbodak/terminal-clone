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
import { Image, View, ScrollView, TextInput as TpRN } from "react-native";
import { ResizeMode, Video } from "expo-av";
import MyText from "@/components/Elements/MyText";
import MyInput from "@/components/Elements/MyInput";
import MyButton from "@/components/Elements/MyButton";
import MyDropdown from "@/components/Elements/MyDropdown";
import { icons } from "@/assets/icons";
import { V_SetUserCorporation } from "@/types/db/V_SetUserCorporation";
import Layout from "@/components/Layout";

const Login = () => {
  const router = useRouter();
  const { axiosGet, axiosPost } = useAxios();

  const [corpId, setCorpId] = useState(0);
  const [sectionId, setSectionId] = useState(0);
  const [year, setYear] = useState(`${new Date().getFullYear()}`);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [hasApiUrl, setHasApiUrl] = useState<boolean>(true);
  const [apiUrl, setApiUrl] = useState<string>("");
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

  return (
    <Layout hasHeader={false} fullWidth>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          minHeight: 800,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12,
          paddingVertical: 32,
        }}
      >
        <Video
          source={require("../assets/videos/login-background.mp4")} // Video URL'si
          rate={0.8} // Video oynatma hızı
          volume={1.0} // Ses seviyesi
          isMuted={true} // Sessiz oynatma
          resizeMode={ResizeMode.COVER} // Video boyutlandırma modu
          shouldPlay // Videonun otomatik oynatılması için
          isLooping // Videonun döngüde çalınması için
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <View>
          <MyText style={{ paddingLeft: 33, fontSize: 24, fontWeight: 900 }}>
            Giriş yapın
          </MyText>
          <View
            style={{
              backgroundColor: "rgba(20, 21, 24, 0.5)",
              margin: 16,
              marginTop: 10,
              borderRadius: 8,
              paddingVertical: 16,
              paddingHorizontal: 32,
            }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginBottom: 27,
              }}
            >
              <Image
                source={require("../assets/images/workbook-terminal.png")}
                style={{ width: 187 }}
                resizeMode="contain"
              />
            </View>
            {!hasApiUrl ? (
              <>
                <MyText
                  style={{ marginBottom: 42, fontSize: 14, fontWeight: 300 }}
                >
                  Bir kereliğine girilecek olan sunucu adresini giriniz.
                </MyText>
                <View
                  style={{ marginVertical: "auto", display: "flex", gap: 12 }}
                >
                  <MyInput
                    theme={"light"}
                    placeholder="Örn: http://0.0.0.0:0"
                    label={"Sunucu Adresi"}
                    returnKeyType="done"
                    value={apiUrl}
                    onChangeText={(text) => {
                      setApiUrl(text);
                    }}
                  />
                  <MyButton
                    style={{ backgroundColor: "#16171A" }}
                    onPress={() => {
                      saveDataToStorage("apiUrl", apiUrl);
                      checkApiUrl();
                    }}
                  >
                    <MyText style={{ fontWeight: 800, fontSize: 14 }}>
                      Kaydet
                    </MyText>
                  </MyButton>
                </View>
              </>
            ) : (
              <>
                <MyText
                  style={{ marginBottom: 42, fontSize: 16, fontWeight: 300 }}
                >
                  Yöneticiniz tarafından size verilen giriş bilgilerini
                  kullanarak sisteme giriş yapabilirsiniz.
                </MyText>

                <View
                  style={{ marginVertical: "auto", display: "flex", gap: 12 }}
                >
                  <MyInput
                    theme={"light"}
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
                    theme={"light"}
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
                        style={{ width: 16, height: 16, marginRight: 16 }}
                        onPress={() => {
                          setShowPassword((x) => !x);
                        }}
                      >
                        <Image
                          source={icons[showPassword ? "eye" : "eye-hide"]}
                          style={{ width: 16, height: 16 }}
                          resizeMode="contain"
                        />
                      </MyButton>
                    }
                  />
                  <MyDropdown
                    theme={"light"}
                    data={transformSelctBoxData(corporationDtos)}
                    placeholder="Şirket Seçiniz"
                    label="Şirket"
                    value={corpId}
                    setValue={(x) => setCorpId(Number(x))}
                  />
                  <MyDropdown
                    theme={"light"}
                    data={transformSelctBoxData(sectionDtos)}
                    placeholder="Şube Seçiniz"
                    label="Şube"
                    value={sectionId}
                    setValue={(x) => setSectionId(Number(x))}
                  />
                  <MyInput
                    theme={"light"}
                    value={year}
                    label={"Yıl"}
                    returnKeyType="next"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setYear(text);
                    }}
                  />
                  <MyButton
                    style={{ backgroundColor: "#16171A" }}
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
                    <MyText style={{ fontWeight: 800, fontSize: 14 }}>
                      Giriş Yap
                    </MyText>
                  </MyButton>
                </View>
              </>
            )}
          </View>
        </View>
        <MyText
          style={{
            position: "absolute",
            bottom: 24,
            left: 0,
            right: 0,
            margin: "auto",
            textAlign: "center",
          }}
        >
          Powered By Odak İnovasyon
        </MyText>
      </ScrollView>
    </Layout>
  );
};

export default Login;
