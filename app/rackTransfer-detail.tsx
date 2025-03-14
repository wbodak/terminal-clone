import { StyleSheet } from "react-native";
import MyInput from "@/components/Elements/MyInput";
import Layout from "@/components/Layout";
import { useAxios } from "@/hooks/useAxiox";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { View, TextInput } from "react-native";
import InputBarcode from "@/components/FormElements/InputBarcode";
import { V_StockDetail } from "@/types/db/V_StockDetail";
import MyNumberInput from "@/components/Elements/MyNumberInput";
import { onPieceChanged } from "@/utils/gridCalcMethods";

interface DataType extends V_StockDetail {
  RackBarcode?: string;
  STOCKDETAIL_INSTRUCTIONQUANTITY?: number;
  STOCKDETAIL_TOTALQUANTITY?: number;
}

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
  width35Percent: {
    width: "35%",
  },
});

const RackTransferDetail = () => {
  const secondRef = useRef<TextInput>(null);
  const router = useRouter();
  const { axiosGet, axiosPost, axiosDelete, axiosPatch } = useAxios();
  const data = useLocalSearchParams();
  const [formState, setFormState] = useState<DataType>();
  const [rackId, setRackId] = useState(0);
  const [isApproved, setIsApproved] = useState<boolean>();

  const handleUpdateState = (name: keyof DataType, value: any) => {
    if (formState) setFormState({ ...formState, [name]: value });
    else setFormState({ [name]: value } as any);
  };

  const isNewRecord = formState?.STOCKDETAIL_REGUSER_ID == 0;

  return (
    <Layout
      headerTitle="Raf Transferi Detayı"
      showSubTitle={false}
      bottomProps={{
        isApproved: isApproved ?? data.isApproved == "true",
        saveProps: {
          disabled: !isNewRecord || !formState?.STOCKDETAIL_BARCODE_ID,
          onPress: async () => {
            axiosPost({
              path: `/Stock/CreateStockDetailForRackTransfer?barcode=${formState?.STOCKDETAIL_BARCODE_ID}&quantity=${formState?.STOCKDETAIL_QUANTITY}&stockMasterId=${data.masterId}&instructionDetailId=${formState?.STOCKDETAIL_REF_ID}&piece=${formState?.STOCKDETAIL_PIECE}`,
              success: (data) => {
                setFormState({
                  RackBarcode: formState?.RackBarcode,
                  STOCKDETAIL_RACKNAME: formState?.STOCKDETAIL_RACKNAME,
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
                path: `/Stock/DeleteStockDetail/${formState?.ID}`,
                success: () =>
                  setFormState({
                    RackBarcode: formState?.RackBarcode,
                    STOCKDETAIL_RACKNAME: formState?.STOCKDETAIL_RACKNAME,
                  } as DataType),
              });
          },
        },
        approveProps: {
          onPress: () => {
            axiosPatch({
              path: `/Stock/ConfirmStockMaster?id=${data.masterId}&value=true`,
              success: (data) => {
                setIsApproved(true);
              },
            });
          },
        },
        approveCancelProps: {
          onPress: () => {
            axiosPatch({
              path: `/Stock/ConfirmStockMaster?id=${data.masterId}&value=false`,
              success: (data) => {
                setIsApproved(false);
              },
            });
          },
        },
        historyProps: {
          onPress: () => {
            router.push({
              pathname: "/barcode-history",
              params: { masterId: data.masterId, type: "stock" },
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
          onClearButton={() => handleUpdateState("RackBarcode", undefined)}
          onSearchButton={() => {
            if (formState?.RackBarcode)
              axiosGet({
                path: `/System/GetParameterDetailListByMasterId?masterId=14&id=${formState.RackBarcode}`,
                success: (data: any) => {
                  if (data.length) {
                    setFormState({
                      ...formState,
                      STOCKDETAIL_RACKNAME: data[0].PARAMETERDETAIL_NAME,
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
          value={formState?.STOCKDETAIL_RACKNAME}
        />
        <InputBarcode
          ref={secondRef}
          autoFocus={false}
          value={String(formState?.STOCKDETAIL_BARCODE_ID ?? "")}
          onChangeText={(x) => {
            handleUpdateState("STOCKDETAIL_BARCODE_ID", x);
          }}
          onClearButton={() =>
            handleUpdateState("STOCKDETAIL_BARCODE_ID", undefined)
          }
          onSearchButton={() => {
            if (formState?.STOCKDETAIL_BARCODE_ID) {
              axiosGet({
                path: `/Stock/GetStockDetail?barcode=${formState.STOCKDETAIL_BARCODE_ID}&stockMasterId=${data.masterId}&rackId=${rackId}`,
                success: (data: any) => {
                  setFormState({ ...formState, ...data });
                },
                error: () => {
                  handleUpdateState("STOCKDETAIL_BARCODE_ID", undefined);
                },
              });
            }
          }}
        />
        <View style={styles.row}>
          <MyInput
            label={"Ürün Tanımı"}
            readOnly
            containerStyle={styles.flex1}
            returnKeyType="next"
            value={formState?.STOCKDETAIL_ITEMNAME}
          />
          {formState?.STOCKDETAIL_ISPROFILE && (
            <MyInput
              label={"Profil"}
              readOnly
              containerStyle={styles.width35Percent}
              returnKeyType="next"
              value={formState?.STOCKDETAIL_PROFILENUMBER}
            />
          )}
        </View>
        <View style={styles.row}>
          <MyInput
            label={"Depo Adı"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.STOCKDETAIL_STORENAME}
          />
          <MyInput
            label={"Birim"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.STOCKDETAIL_UNITCODE}
          />
        </View>
        {!!formState?.STOCKDETAIL_ISPROFILE && (
          <>
            <View style={styles.row}>
              <MyInput
                label={"Renk"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.STOCKDETAIL_COLORNAME}
              />
              <MyInput
                label={"Yüzey"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.STOCKDETAIL_SURFACENAME}
              />
            </View>
            <View style={styles.row}>
              <MyInput
                label={"Alaşım"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.STOCKDETAIL_ALLOYNAME}
              />
              <MyInput
                label={"Sertlik"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.STOCKDETAIL_HARDNESSNAME}
              />
            </View>
          </>
        )}
        {(formState?.STOCKDETAIL_LENGTHTRACKING ||
          formState?.STOCKDETAIL_PIECETRACKING ||
          formState?.STOCKDETAIL_DIAMETERTRACKING) && (
          <View style={styles.row}>
            {!!formState?.STOCKDETAIL_LENGTH && (
              <MyNumberInput
                label={"Boy"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.STOCKDETAIL_LENGTH}
              />
            )}
            {!!formState?.STOCKDETAIL_PIECETRACKING && (
              <MyNumberInput
                label={"Adet"}
                onChangeText={(text: string) => {
                  setFormState({
                    ...formState,
                    STOCKDETAIL_PIECE: text as any,
                    STOCKDETAIL_QUANTITY: onPieceChanged(
                      text,
                      formState.STOCKDETAIL_LENGTH,
                      formState.STOCKDETAIL_GRAMMAGE || 0
                    ),
                  } as V_StockDetail);
                }}
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.STOCKDETAIL_PIECE}
              />
            )}
            {!!formState?.STOCKDETAIL_DIAMETERTRACKING && (
              <MyNumberInput
                label={"Çap"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={formState?.STOCKDETAIL_DIAMETER}
              />
            )}
          </View>
        )}
        <View style={styles.row}>
          <MyInput
            label={"Lot Numarası"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.STOCKDETAIL_LOTNUMBER}
          />
          <MyInput
            label={"Durum"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.STOCKDETAIL_STATENAME}
          />
        </View>
        <View style={styles.row}>
          <MyNumberInput
            label={"Stok Miktarı"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.STOCKDETAIL_TOTALQUANTITY}
          />
          <MyNumberInput
            label={"Miktar"}
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={formState?.STOCKDETAIL_QUANTITY}
            onChangeText={(text: string) => {
              setFormState({
                ...formState,
                STOCKDETAIL_QUANTITY: text as any,
              } as DataType);
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default RackTransferDetail;
