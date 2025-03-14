import MyInput from "@/components/Elements/MyInput";
import Layout from "@/components/Layout";
import { useAxios } from "@/hooks/useAxiox";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import InputBarcode from "@/components/FormElements/InputBarcode";
import MyNumberInput from "@/components/Elements/MyNumberInput";
import { V_CountDetail } from "@/types/db/V_CountDetail";
import { onPieceChanged } from "@/utils/gridCalcMethods";

interface DataType extends V_CountDetail {
  RackBarcode?: string;
}

const CountingDetail = () => {
  const router = useRouter();
  const secondRef = useRef<TextInput>(null);

  const { axiosGet, axiosPost, axiosDelete } = useAxios();
  const data = useLocalSearchParams();
  const [formState, setFormState] = useState<DataType>();
  const [rackId, setRackId] = useState(0);
  const [visibleData, setVisibleData] = useState<[]>();

  const handleUpdateState = (
    name: keyof DataType,
    value: any,
    additionalState?: Partial<DataType>
  ) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
      ...additionalState,
    }));
  };

  const isNewRecord = formState?.ID == 0;

  return (
    <Layout
      headerTitle="Sayım Detayı"
      showSubTitle={false}
      bottomProps={{
        isApproved: data.isApproved == "true",
        saveProps: {
          disabled: !isNewRecord || !formState?.COUNTDETAIL_BARCODE_ID,
          onPress: async () => {
            if (formState?.COUNTDETAIL_BARCODE_ID)
              axiosPost({
                path: `/Stock/SaveCountDetail`,
                body: { ...formState, COUNTDETAIL_RACK_ID: rackId },
                success: (data) => {
                  setFormState({
                    RackBarcode: formState?.RackBarcode,
                    COUNTDETAIL_RACKNAME: formState?.COUNTDETAIL_RACKNAME,
                  } as DataType);
                },
              });
          },
        },
        clearProps: {
          onPress: () => {
            setFormState(undefined);
            setRackId(0);
          },
        },
        deleteProps: {
          disabled: !formState?.ID,
          onPress: () => {
            if (formState?.ID)
              axiosDelete({
                path: `/Stock/DeleteCountDetail/${formState?.ID}`,
                success: () => {
                  setFormState({
                    RackBarcode: formState?.RackBarcode,
                    COUNTDETAIL_RACKNAME: formState?.COUNTDETAIL_RACKNAME,
                  } as DataType);
                },
              });
          },
        },
        historyProps: {
          onPress: () => {
            router.push({
              pathname: "/barcode-history",
              params: { masterId: data.masterId, type: "count" },
            });
          },
        },
      }}
    >
      <View style={styles.container}>
        <InputBarcode
          value={formState?.RackBarcode}
          label="Raf Barkodu"
          onChangeText={(x) => {
            handleUpdateState("RackBarcode", x);
          }}
          onClearButton={() => {
            handleUpdateState("RackBarcode", undefined, {
              COUNTDETAIL_RACKNAME: undefined,
            });
          }}
          onSearchButton={() => {
            if (formState?.RackBarcode)
              axiosGet({
                path: `/System/GetParameterDetailListByMasterId?masterId=14&id=${formState.RackBarcode}`,
                success: (data: any) => {
                  if (data.length) {
                    setFormState({
                      ...formState,
                      COUNTDETAIL_RACKNAME: data[0].PARAMETERDETAIL_NAME,
                    });
                    setRackId(data[0].ID);
                    secondRef.current?.focus();
                  } else {
                    throw "Raf bulunamadı";
                  }
                },
              });
          }}
        />
        <MyInput
          label={"Raf"}
          readOnly
          returnKeyType="next"
          value={formState?.COUNTDETAIL_RACKNAME}
        />
        <InputBarcode
          ref={secondRef}
          autoFocus={false}
          value={String(formState?.COUNTDETAIL_BARCODE_ID ?? "")}
          onChangeText={(x) => {
            handleUpdateState("COUNTDETAIL_BARCODE_ID", x);
          }}
          onClearButton={() => {
            handleUpdateState("COUNTDETAIL_BARCODE_ID", undefined, {
              COUNTDETAIL_ITEMNAME: undefined,
              COUNTDETAIL_UNITCODE: undefined,
              COUNTDETAIL_PROFILENUMBER: undefined,
              COUNTDETAIL_COLORNAME: undefined,
              COUNTDETAIL_SURFACENAME: undefined,
              COUNTDETAIL_ALLOYNAME: undefined,
              COUNTDETAIL_HARDNESSNAME: undefined,
              COUNTDETAIL_LENGTH: undefined,
              COUNTDETAIL_PIECE: undefined,
              COUNTDETAIL_DIAMETER: undefined,
              COUNTDETAIL_QUANTITY: undefined,
            });
          }}
          onSearchButton={() => {
            if (formState?.COUNTDETAIL_BARCODE_ID) {
              axiosGet({
                path: `/Stock/GetCountDetail?barcode=${formState.COUNTDETAIL_BARCODE_ID}&masterId=${data.masterId}`,
                success: (data: any) => {
                  setVisibleData(data);
                  const newData: any = {};
                  for (const [key, value] of Object.entries(data)) {
                    newData[key.replace("STOCKDETAIL", "COUNTDETAIL")] = value;
                  }
                  setFormState({ ...formState, ...newData });
                },
                error: () => {
                  handleUpdateState("COUNTDETAIL_BARCODE_ID", undefined);
                },
              });
            }
          }}
        />
        <View style={styles.row}>
          <MyInput
            label={"Ürün Tanımı"}
            readOnly
            containerStyle={styles.flex2}
            returnKeyType="next"
            value={formState?.COUNTDETAIL_ITEMNAME}
          />
          <MyInput
            label={"Birim"}
            readOnly
            containerStyle={styles.flex1}
            returnKeyType="next"
            value={formState?.COUNTDETAIL_UNITCODE}
          />
        </View>
        {formState?.COUNTDETAIL_ISPROFILE && (
          <View style={styles.row}>
            <MyInput
              label={"Profil"}
              readOnly
              returnKeyType="next"
              containerStyle={styles.flex1}
              value={formState?.COUNTDETAIL_PROFILENUMBER}
            />
            <MyInput
              label={"Renk"}
              readOnly
              returnKeyType="next"
              containerStyle={styles.flex1}
              value={formState?.COUNTDETAIL_COLORNAME}
            />
            <MyInput
              label={"Yüzey"}
              readOnly
              returnKeyType="next"
              containerStyle={styles.flex1}
              value={formState?.COUNTDETAIL_SURFACENAME}
            />
          </View>
        )}
        <View style={styles.row}>
          <MyInput
            label={"Alaşım"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.COUNTDETAIL_ALLOYNAME}
          />
          <MyInput
            label={"Sertlik"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.COUNTDETAIL_HARDNESSNAME}
          />
        </View>

        {(formState?.COUNTDETAIL_LENGTHTRACKING ||
          formState?.COUNTDETAIL_PIECETRACKING ||
          formState?.COUNTDETAIL_DIAMETERTRACKING) && (
          <View style={styles.row}>
            {!!formState?.COUNTDETAIL_LENGTHTRACKING && (
              <MyNumberInput
                label={"Boy"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.COUNTDETAIL_LENGTH}
              />
            )}
            {!!formState?.COUNTDETAIL_PIECETRACKING && (
              <MyNumberInput
                label={"Adet"}
                onChangeText={(text: string) => {
                  setFormState({
                    ...formState,
                    COUNTDETAIL_PIECE: text as any,
                    COUNTDETAIL_QUANTITY: onPieceChanged(
                      text,
                      formState.COUNTDETAIL_LENGTH,
                      formState.COUNTDETAIL_GRAMMAGE || 0
                    ),
                  } as V_CountDetail);
                }}
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.COUNTDETAIL_PIECE}
              />
            )}
            {!!formState?.COUNTDETAIL_DIAMETERTRACKING && (
              <MyNumberInput
                label={"Çap"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.COUNTDETAIL_DIAMETER}
              />
            )}
          </View>
        )}
        <View style={styles.row}>
          <MyNumberInput
            label={"Adet"}
            onChangeText={(text: string) => {
              setFormState({
                ...formState,
                COUNTDETAIL_PIECE: text as any,
                COUNTDETAIL_QUANTITY: onPieceChanged(
                  text,
                  formState?.COUNTDETAIL_LENGTH,
                  formState?.COUNTDETAIL_GRAMMAGE || 0
                ),
              } as V_CountDetail);
            }}
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.COUNTDETAIL_PIECE}
          />
          <MyNumberInput
            label={"Miktar"}
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.COUNTDETAIL_QUANTITY}
            onChangeText={(text: string) => {
              setFormState({
                ...formState,
                COUNTDETAIL_QUANTITY: text as any,
              } as V_CountDetail);
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    paddingHorizontal: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
});

export default CountingDetail;
