import MyDataGrid from "@/components/DataGrid/MyDataGrid";
import MyDropdown from "@/components/Elements/MyDropdown";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { GlobalContext } from "@/context/GlobalContext";
import { useAxios } from "@/hooks/useAxiox";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { V_StockMaster } from "@/types/db/V_StockMaster";
import { SelectBoxDto } from "@/types/dtos/SelectBoxDto";
import { WebUserDto } from "@/types/dtos/WebUserDto";
import { getDataFromStorage } from "@/utils/asyncStore";
import { transformSelctBoxData } from "@/utils/helper";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const Waste = () => {
  // Hooks
  const { axiosGet, axiosPost } = useAxios();
  const { title: pageTitle } = useLocalSearchParams();
  const { showDialog } = useGlobalContext();
  const { axiosDelete } = useAxios();
  const router = useRouter();
  const { selectedRow } = useContext(GlobalContext);

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
  return (
    <Layout
      headerTitle={pageTitle.toString()}
      headerDescription="Açıklama Girilecek"
      scrollEnabled={false}
      bottomProps={{
        clearProps: {
          disabled: !selectedWareHouseValue,
          onPress: () => {
            setSelectedWareHouseValue(undefined);
            setWasteList([]);
          },
        },
        newProps: {
          disabled: !selectedWareHouseValue,
          onPress: async () => {
            axiosPost({
              path: `/Stock/CreateStockMasterForWaste?sourceStore=${selectedWareHouseValue}`,
              success: () => {
                getStoreTransfers();
                router.push({
                  pathname: "/waste/detail",
                });
              },
            });
          },
        },
        deleteProps: {
          disabled: !selectedRow,
          onPress: () => {
            axiosDelete({
              path: `/Stock/DeleteStockMaster/${selectedRow?.ID}`,
              success: getStoreTransfers,
            });
          },
        },
        editProps: {
          disabled: !selectedRow,
          onPress: () => {
            router.push({
              pathname: "/waste/detail",
            });
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
        // deletePath="/Stock/DeleteStockMaster"
        // editPage={"/waste/detail"}
        columns={[
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
