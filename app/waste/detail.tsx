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

const WasteDetail = () => {
  //Hooks
  const router = useRouter();
  const { isApproved: isRecoredApproved, masterId } = useLocalSearchParams();
  const { axiosGet, axiosPost, axiosDelete, axiosPatch } = useAxios();
  // Ref
  const barcodeInputRef = useRef<TextInput>(null);
  // States
  const [warehouse, setWarehouse] = useState<DataType>();
  const [isApproved, setIsApproved] = useState(
    Boolean(isRecoredApproved === "true" ? true : false)
  );
  // Handlers
  const handleUpdateState = (name: keyof DataType, value: any) => {
    if (warehouse) setWarehouse({ ...warehouse, [name]: value });
    else setWarehouse({ [name]: value } as any);
  };
  const isNewRecord = warehouse?.STOCKDETAIL_REGUSER_ID == 0;

  const getWareHouse = () => {
    axiosGet({
      path: `/Stock/GetStockDetail?barcode=${warehouse?.STOCKDETAIL_BARCODE_ID}&stockMasterId=${masterId}`,
      success: (data: V_StockDetail) => {
        setWarehouse({ ...warehouse, ...data });
      },
      error: () => {
        handleUpdateState("STOCKDETAIL_BARCODE_ID", undefined);
      },
    });
  };
  return (
    <Layout
      headerTitle="Fire Detayı"
      showSubTitle={false}
      bottomProps={{
        isApproved: isApproved,
        saveProps: {
          disabled: !warehouse?.STOCKDETAIL_BARCODE_ID,
          onPress: async () => {
            axiosPost({
              path: `/Stock/CreateStockDetailForWaste?barcode=${warehouse?.STOCKDETAIL_BARCODE_ID}&quantity=${warehouse?.STOCKDETAIL_QUANTITY}&stockMasterId=${masterId}&piece=${warehouse?.STOCKDETAIL_PIECE}`,
              success: () => {
                getWareHouse();
              },
            });
          },
        },
        clearProps: {
          onPress: () => {
            setWarehouse(undefined);
          },
        },
        deleteProps: {
          disabled: !warehouse?.ID,
          onPress: () => {
            if (warehouse?.ID)
              axiosDelete({
                path: `/Stock/DeleteStockDetailForWaste/${warehouse?.ID}`,
                success: () => {
                  setWarehouse(undefined);
                },
              });
          },
        },
        approveProps: {
          disabled: warehouse?.STOCKDETAIL_REGUSER_ID == 0 ? false : true,
          onPress: () => {
            axiosPatch({
              path: `/Stock/ConfirmStockMaster?id=${masterId}&value=true`,
              success: () => {
                setIsApproved(true);
              },
            });
          },
        },
        approveCancelProps: {
          disabled: warehouse?.STOCKDETAIL_REGUSER_ID == 0 ? true : false,
          onPress: () => {
            axiosPatch({
              path: `/Stock/ConfirmStockMaster?id=${masterId}&value=false`,
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
              params: { masterId: masterId, type: "stock" },
            });
          },
        },
      }}
    >
      <View style={styles.container}>
        <InputBarcode
          ref={barcodeInputRef}
          autoFocus={false}
          value={String(warehouse?.STOCKDETAIL_BARCODE_ID ?? "")}
          onChangeText={(x) => {
            handleUpdateState("STOCKDETAIL_BARCODE_ID", x);
          }}
          onClearButton={() =>
            handleUpdateState("STOCKDETAIL_BARCODE_ID", undefined)
          }
          onSearchButton={() => {
            if (warehouse?.STOCKDETAIL_BARCODE_ID) {
              getWareHouse();
            }
          }}
        />
        <View style={styles.row}>
          <MyInput
            label={"Ürün Tanımı"}
            readOnly
            containerStyle={styles.flex1}
            returnKeyType="next"
            value={warehouse?.STOCKDETAIL_ITEMNAME}
          />
          {warehouse?.STOCKDETAIL_ISPROFILE && (
            <MyInput
              label={"Profil"}
              readOnly
              containerStyle={styles.width35Percent}
              returnKeyType="next"
              value={warehouse?.STOCKDETAIL_PROFILENUMBER}
            />
          )}
        </View>
        <View style={styles.row}>
          <MyInput
            label={"Depo Adı"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={warehouse?.STOCKDETAIL_STORENAME}
          />
          <MyInput
            label={"Birim"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={warehouse?.STOCKDETAIL_UNITCODE}
          />
        </View>
        {!!warehouse?.STOCKDETAIL_ISPROFILE && (
          <>
            <View style={styles.row}>
              <MyInput
                label={"Renk"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={warehouse?.STOCKDETAIL_COLORNAME}
              />
              <MyInput
                label={"Yüzey"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={warehouse?.STOCKDETAIL_SURFACENAME}
              />
            </View>
            <View style={styles.row}>
              <MyInput
                label={"Alaşım"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={warehouse?.STOCKDETAIL_ALLOYNAME}
              />
              <MyInput
                label={"Sertlik"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={warehouse?.STOCKDETAIL_HARDNESSNAME}
              />
            </View>
          </>
        )}
        {(warehouse?.STOCKDETAIL_LENGTHTRACKING ||
          warehouse?.STOCKDETAIL_PIECETRACKING ||
          warehouse?.STOCKDETAIL_DIAMETERTRACKING) && (
          <View style={styles.row}>
            {!!warehouse?.STOCKDETAIL_LENGTH && (
              <MyNumberInput
                label={"Boy"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={warehouse?.STOCKDETAIL_LENGTH}
              />
            )}
            {!!warehouse?.STOCKDETAIL_PIECETRACKING && (
              <MyNumberInput
                label={"Adet"}
                onChangeText={(value: string) => {
                  setWarehouse({
                    ...warehouse,
                    STOCKDETAIL_PIECE: value as any,
                    STOCKDETAIL_QUANTITY: onPieceChanged(
                      Number(value),
                      warehouse
                    ),
                  });
                }}
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={warehouse?.STOCKDETAIL_PIECE}
              />
            )}
            {!!warehouse?.STOCKDETAIL_DIAMETERTRACKING && (
              <MyNumberInput
                label={"Çap"}
                readOnly
                returnKeyType="next"
                containerStyle={styles.flex1}
                value={warehouse?.STOCKDETAIL_DIAMETER}
              />
            )}
          </View>
        )}
        <View style={styles.row}>
          <MyInput
            label={"Durum"}
            readOnly
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={warehouse?.STOCKDETAIL_STATENAME}
          />
          <MyNumberInput
            readOnly
            label={"Miktar"}
            returnKeyType="next"
            containerStyle={styles.flex1}
            value={warehouse?.STOCKDETAIL_QUANTITY}
            onChangeText={(text: string) => {
              setWarehouse({
                ...warehouse,
                STOCKDETAIL_QUANTITY: text as any,
              } as DataType);
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default WasteDetail;
