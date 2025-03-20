import MyDataGrid from "@/components/DataGrid/MyDataGrid";
import MyDropdown from "@/components/Elements/MyDropdown";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { useAxios } from "@/hooks/useAxiox";
import { SelectBoxDto } from "@/types/dtos/SelectBoxDto";
import { WebUserDto } from "@/types/dtos/WebUserDto";
import { getDataFromStorage } from "@/utils/asyncStore";
import { transformSelctBoxData } from "@/utils/helper";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { V_StockMaster } from "@/types/db/V_StockMaster";

type DataType = {
  sourceStore?: number;
  targetStore?: number;
};

const StoreTransfer = () => {
  const { axiosGet, axiosPost } = useAxios();
  const [stores, setStores] = useState<SelectBoxDto[]>([]);
  const [formState, setFormState] = useState<DataType>({});
  const [stockList, setStockList] = useState<V_StockMaster[]>([]);
  const data = useLocalSearchParams();

  const handleUpdateState = (name: keyof DataType, value: any) => {
    if (formState) setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    getDataFromStorage("userData").then((str: string | null) => {
      if (!str) return null;
      const userData: WebUserDto = JSON.parse(str);
      setStores(userData.sourceStores);
    });
  }, []);

  useEffect(() => {
    getStoreTransfers();
  }, [formState]);

  const getStoreTransfers = () => {
    if (formState.sourceStore || formState.targetStore) {
      const today = new Date().toISOString();
      axiosGet({
        path: `/Stock/GetStockMasterListByDate?sourceStore=${
          formState.sourceStore || null
        }&targetStore=${
          formState.targetStore || null
        }&startDate=${today}&endDate=${today}&typeCode=57`,
        success: (data) => {
          setStockList(data);
        },
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getStoreTransfers(); // sayfaya geldi
      return () => {}; // sayfadan çıktı
    }, [])
  );

  return (
    <Layout
      headerTitle={data.title as string}
      headerDescription="Açıklama Girilecek"
      bottomProps={{
        saveProps: {
          disabled: !formState.sourceStore || !formState.targetStore,
          onPress: async () => {
            axiosPost({
              path: `/Stock/CreateStockMasterForStoreTransfer?sourceStore=${formState.sourceStore}&targetStore=${formState.targetStore}`,
              success: getStoreTransfers,
            });
          },
        },
        clearProps: {
          onPress: () => {
            setFormState({});
            setStockList([]);
          },
        },
      }}
    >
      <View style={{ display: "flex", gap: 10, paddingHorizontal: 16 }}>
        <MyDropdown
          data={transformSelctBoxData(stores)}
          placeholder="Kaynak Depo Seçiniz"
          label="Kaynak Depo"
          value={formState?.sourceStore || 0}
          setValue={(value) => {
            handleUpdateState("sourceStore", value);
          }}
        />
        <MyDropdown
          data={transformSelctBoxData(stores)}
          placeholder="Hedef Depo Seçiniz"
          label="Hedef Depo"
          value={formState?.targetStore || 0}
          setValue={(value) => {
            handleUpdateState("targetStore", value);
          }}
        />
      </View>
      <SectionTitle title={`${data.title} Listesi`} />
      <MyDataGrid
        deletePath="/Stock/DeleteStockMaster"
        editPage={"storeTransfer-detail"}
        columns={[
          {
            dataField: "STOCKMASTER_DATE",
            caption: "Fiş Tarihi",
            dataType: "date",
          },
          {
            dataField: "STOCKMASTER_NUMBER",
            caption: "Fiş No",
            dataType: "number",
            width: 100,
          },
          {
            dataField: "STOCKMASTER_CONFIRM",
            caption: "Onaylı",
            dataType: "boolean",
          },
        ]}
        detailColumns={[
          { dataField: "STOCKMASTER_SOURCESSTORENAME", caption: "Kaynak Depo" },
          { dataField: "STOCKMASTER_TARGETSTORENAME", caption: "Hedef Depo" },
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

export default StoreTransfer;
