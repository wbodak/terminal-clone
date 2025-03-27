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

const Waste = () => {
  // Hooks
  const { axiosGet, axiosPost } = useAxios();
  const { title: pageTitle } = useLocalSearchParams();
  // States
  const [warehouseList, setWarehouseList] = useState<SelectBoxDto[]>([]);
  const [selectedWareHouseValue, setSelectedWareHouseValue] = useState<
    number | undefined
  >(undefined);
  const [wasteList, setWasteList] = useState<V_StockMaster[]>([]);
  const formattedDate = `${new Date().getDate()}.${
    new Date().getMonth() + 1
  }.${new Date().getFullYear()}`;

  const getStoreTransfers = () => {
    if (selectedWareHouseValue) {
      const today = new Date().toISOString();
      axiosGet({
        path: `/Stock/GetStockMasterListByDate?sourceStore=${
          selectedWareHouseValue || null
        }&confirm=false&typeCode=64&startDate=${today}&endDate=${today}`,
        success: (data) => {
          setWasteList(data);
        },
      });
    }
  };
  // Effects
  useEffect(() => {
    getDataFromStorage("userData").then((str: string | null) => {
      if (!str) return null;
      const userData: WebUserDto = JSON.parse(str);
      setWarehouseList(userData.sourceStores);
    });
  }, []);

  useEffect(() => {
    getStoreTransfers();
  }, [selectedWareHouseValue]);

  useFocusEffect(
    useCallback(() => {
      getStoreTransfers(); // sayfaya geldi
      return () => {}; // sayfadan çıktı
    }, [])
  );
  console.log(wasteList[0], "wasteList");
  return (
    <Layout
      headerTitle={pageTitle.toString()}
      headerDescription="Açıklama Girilecek"
      scrollEnabled={false}
      bottomProps={{
        saveProps: {
          disabled: !selectedWareHouseValue,
          onPress: async () => {
            axiosPost({
              path: `/Stock/CreateStockMasterForWaste?sourceStore=${selectedWareHouseValue}`,
              success: getStoreTransfers,
            });
          },
        },
        clearProps: {
          onPress: () => {
            setSelectedWareHouseValue(undefined);
            setWasteList([]);
          },
        },
      }}
    >
      <View style={styles.wrapper}>
        <MyDropdown
          data={transformSelctBoxData(warehouseList)}
          placeholder="Depo Seçiniz"
          label="Depo"
          value={selectedWareHouseValue || 0}
          setValue={(value) => {
            setSelectedWareHouseValue(value);
          }}
        />
      </View>
      <SectionTitle
        title={`${pageTitle.toString()} Listesi ${formattedDate}`}
      />
      <MyDataGrid
        deletePath="/Stock/DeleteStockMaster"
        editPage={"Waste/waste-detail"}
        columns={[
          {
            dataField: "STOCKMASTER_NUMBER",
            caption: "Fiş No",
            dataType: "number",
            width: 100,
          },
          //   {
          //     dataField: "STOCKMASTER_SECTIONNAME",
          //     caption: "Şube",
          //   },
          //   {
          //     dataField: "STOCKMASTER_SOURCESSTORENAME",
          //     caption: "Depo",
          //     dataType: "string",
          //   },
          {
            dataField: "STOCKMASTER_CONFIRM",
            caption: "Onaylı",
            dataType: "boolean",
          },
        ]}
        data={wasteList}
        updateData={setWasteList}
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

export default Waste;
