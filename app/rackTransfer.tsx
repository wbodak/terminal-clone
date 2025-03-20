import MyDataGrid from "@/components/DataGrid/MyDataGrid";
import MyDropdown from "@/components/Elements/MyDropdown";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { useAxios } from "@/hooks/useAxiox";
import { V_StockMaster } from "@/types/db/V_StockMaster";
import { SelectBoxDto } from "@/types/dtos/SelectBoxDto";
import { WebUserDto } from "@/types/dtos/WebUserDto";
import { getDataFromStorage } from "@/utils/asyncStore";
import { transformSelctBoxData } from "@/utils/helper";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type DataType = {
  sourceStore?: number;
};

const RackTransfer = () => {
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

  useFocusEffect(
    useCallback(() => {
      getStoreTransfers(); // sayfaya geldi
      return () => {}; // sayfadan çıktı
    }, [])
  );

  const getStoreTransfers = () => {
    if (formState.sourceStore) {
      const today = new Date().toISOString();
      axiosGet({
        path: `/Stock/GetStockMasterListByDate?sourceStore=${
          formState.sourceStore || null
        }&confirm=false&typeCode=59&startDate=${today}&endDate=${today}`,
        success: (data) => {
          setStockList(data);
        },
      });
    }
  };

  return (
    <Layout
      headerTitle={data.title as string}
      headerDescription="Açıklama Girilecek"
      scrollEnabled={false}
      bottomProps={{
        saveProps: {
          disabled: !formState.sourceStore,
          onPress: async () => {
            axiosPost({
              path: `/Stock/CreateStockMasterForRackTransfer?sourceStore=${formState.sourceStore}`,
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
      <View style={styles.wrapper}>
        <MyDropdown
          data={transformSelctBoxData(stores)}
          placeholder="Depo Seçiniz"
          label="Depo"
          value={formState?.sourceStore || 0}
          setValue={(value) => {
            handleUpdateState("sourceStore", value);
          }}
        />
      </View>
      <SectionTitle title={`${data.title} Listesi`} />
      <MyDataGrid
        deletePath="/Stock/DeleteStockMaster"
        editPage={"rackTransfer-detail"}
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
            dataField: "STOCKMASTER_SOURCESSTORENAME",
            caption: "Depo",
            dataType: "string",
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
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    gap: 10,
    paddingHorizontal: 16,
  },
});

export default RackTransfer;
