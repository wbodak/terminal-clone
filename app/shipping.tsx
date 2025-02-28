import MyDataGrid from "@/components/DataGrid/MyDataGrid";
import MyDateInput from "@/components/Elements/MyDateInput";
import MyDropdown from "@/components/Elements/MyDropdown";
import MyInput from "@/components/Elements/MyInput";
import InputBarcode from "@/components/FormElements/InputBarcode";
import Layout from "@/components/Layout";
import { useAxios } from "@/hooks/useAxiox";
import { SelectBoxDto } from "@/types/dtos/SelectBoxDto";
import { WebUserDto } from "@/types/dtos/WebUserDto";
import { getDataFromStorage } from "@/utils/asyncStore";
import { transformSelctBoxData } from "@/utils/helper";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SectionTitle from "@/components/SectionTitle";
import { V_StockMaster } from "@/types/db/V_StockMaster";
import StockDetailBarcodeHistory from "@/components/BarcodeHistory/StockDetailBarcodeHistory";

type DataType = {
  Barcode?: string;
  SALESINSTRUCTIONMASTER_NUMBER?: number;
  SALESINSTRUCTIONMASTER_COMPANYNAME?: string;
  SALESINSTRUCTIONMASTER_DATE?: string;
  SALESINSTRUCTIONMASTER_STORE_ID?: number;
};

const Shipping = () => {
  const { axiosGet, axiosPost } = useAxios();
  const [sourceStores, setSourceStore] = useState<SelectBoxDto[]>([]);
  const [formState, setFormState] = useState<DataType>({});
  const [stockList, setStockList] = useState<V_StockMaster[]>([]);
  const [id, setId] = useState(0);
  const data = useLocalSearchParams();

  const handleUpdateState = (name: keyof DataType, value: any) => {
    if (formState) setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    getDataFromStorage("userData").then((str: string | null) => {
      if (!str) return null;
      const userData: WebUserDto = JSON.parse(str);
      setSourceStore(userData.sourceStores);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getShippingDetailByBracode(); // sayfaya geldi
      return () => {}; // sayfadan çıktı
    }, [])
  );

  const getShippingDetailByBracode = () => {
    if (formState.Barcode) {
      axiosGet({
        path: `/Stock/GetStockMasterListByInstructionBarcode?barcode=${formState.Barcode}`,
        success: (data: any) => {
          setFormState({
            ...formState,
            SALESINSTRUCTIONMASTER_NUMBER:
              data.salesInstructionMaster.SALESINSTRUCTIONMASTER_NUMBER,
            SALESINSTRUCTIONMASTER_COMPANYNAME:
              data.salesInstructionMaster.SALESINSTRUCTIONMASTER_COMPANYNAME,
            SALESINSTRUCTIONMASTER_DATE:
              data.salesInstructionMaster.SALESINSTRUCTIONMASTER_DATE,
          });
          setId(data.salesInstructionMaster.ID);
          setStockList(data.stockMasters);
        },
        error: () => {
          setFormState({});
        },
      });
    }
  };

  return (
    <Layout
      headerTitle={data.title as string}
      headerDescription="Lütfen önce sevk edilecek talimatın barkodunu okutun ve ardından stok fişini seçin"
      bottomProps={{
        saveProps: {
          disabled: !formState.SALESINSTRUCTIONMASTER_STORE_ID || !id,
          onPress: () => {
            axiosPost({
              path: `/Stock/CreateStockMasterForInstruction?storeId=${formState.SALESINSTRUCTIONMASTER_STORE_ID}&instructionMasterId=${id}`,
              success: getShippingDetailByBracode,
            });
          },
        },
        clearProps: {
          onPress: () => {
            setFormState({});
            setStockList([]);
            setId(0);
          },
        },
      }}
    >
      <View style={{ display: "flex", gap: 10, paddingHorizontal: 16 }}>
        <MyDropdown
          data={transformSelctBoxData(sourceStores)}
          placeholder="Depo Seçiniz"
          label="Depo"
          value={formState?.SALESINSTRUCTIONMASTER_STORE_ID || 0}
          setValue={(value) => {
            handleUpdateState("SALESINSTRUCTIONMASTER_STORE_ID", value);
          }}
        />
        <InputBarcode
          value={formState?.Barcode}
          onChangeText={(x) => {
            handleUpdateState("Barcode", x);
          }}
          onClearButton={() => handleUpdateState("Barcode", undefined)}
          onSearchButton={getShippingDetailByBracode}
        />
        <MyInput
          readOnly
          label={"Firma"}
          returnKeyType="next"
          value={formState?.SALESINSTRUCTIONMASTER_COMPANYNAME}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 10,
          }}
        >
          <MyInput
            containerStyle={{ flex: 1 }}
            readOnly
            label={"Talimat No"}
            returnKeyType="next"
            value={formState?.SALESINSTRUCTIONMASTER_NUMBER?.toString() || ""}
          />
          <MyDateInput
            label="Tarih"
            readOnly
            containerStyle={{ flex: 1 }}
            value={formState?.SALESINSTRUCTIONMASTER_DATE}
          />
        </View>
      </View>
      <SectionTitle title={`${data.title} Listesi`} />
      <MyDataGrid
        deletePath="/Stock/DeleteStockMaster"
        deleteQueryParams={{ link: "SalesInstructionMaster" }}
        editPage={"shipping-detail"}
        columns={[
          {
            dataField: "STOCKMASTER_NUMBER",
            caption: "No",
            dataType: "number",
            width: 80,
          },
          {
            dataField: "STOCKMASTER_SOURCESSTORENAME",
            caption: "Depo Adı",
            dataType: "string",
          },
          {
            dataField: "STOCKMASTER_DATE",
            caption: "Fiş Tarihi",
            dataType: "date",
          },
          {
            dataField: "STOCKMASTER_CONFIRM",
            caption: "Onaylı",
            dataType: "boolean",
          },
        ]}
        data={stockList}
        updateData={setStockList}
        editPageFields={[
          {
            targetField: "masterId",
            sourceField: "ID",
          },
          {
            targetField: "isApproved",
            sourceField: "STOCKMASTER_CONFIRM",
          },
        ]}
      />
    </Layout>
  );
};

export default Shipping;
