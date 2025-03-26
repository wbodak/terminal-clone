import React, { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxiox";
import { V_StockDetail } from "@/types/db/V_StockDetail";
import Layout from "@/components/Layout";
import { useWindowDimensions, View } from "react-native";
import MyDataGrid from "../DataGrid/MyDataGrid";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { colors } from "@/constants/Colors";

type Props = {
  masterId: number;
};

const StockDetailBarcodeHistory = ({ masterId }: Props) => {
  const { axiosGet } = useAxios();

  const [history, setHistory] = useState<V_StockDetail[]>([]);
  const [tabIndex, steTabIndex] = useState(0);

  useEffect(() => {
    axiosGet({
      path: `/Stock/GetStockDetailListByMasterId?masterId=${masterId}`,
      success: (data) => {
        setHistory(data);
      },
    });
  }, []);
  const profile = () => (
    <MyDataGrid
      columns={[
        {
          dataField: "STOCKDETAIL_BARCODE_ID",
          caption: "Barkod",
          dataType: "string",
        },
        {
          dataField: "STOCKDETAIL_PIECE",
          caption: "Adet",
          dataType: "number",
        },
        {
          dataField: "STOCKDETAIL_ITEMNAME",
          caption: "Ürün Adı",
          dataType: "string",
          width: 280,
        },
      ]}
      data={history.filter((x) => x.STOCKDETAIL_PROFILE_ID)}
      detailColumns={[
        {
          dataField: "STOCKDETAIL_BARCODE_ID",
          caption: "Barkod",
          dataType: "string",
        },
        {
          dataField: "STOCKDETAIL_ITEMNAME",
          caption: "Ürün Adı",
          dataType: "string",
          width: 280,
        },
        {
          dataField: "STOCKDETAIL_PROFILENUMBER",
          caption: "Profil",
          dataType: "string",
        },
        {
          dataField: "STOCKDETAIL_COLORNAME",
          caption: "Renk",
          dataType: "string",
        },
        {
          dataField: "STOCKDETAIL_SURFACENAME",
          caption: "Yüzey",
          dataType: "string",
        },
        {
          dataField: "STOCKDETAIL_ALLOYNAME",
          caption: "Alaşım",
          dataType: "string",
        },
        {
          dataField: "STOCKDETAIL_HARDNESSNAME",
          caption: "Sertlik",
          dataType: "string",
        },
        {
          dataField: "STOCKDETAIL_LENGTH",
          caption: "Boy",
          dataType: "number",
        },
        {
          dataField: "STOCKDETAIL_PIECE",
          caption: "Adet",
          dataType: "number",
        },
        {
          dataField: "STOCKDETAIL_QUANTITY",
          caption: "Miktar",
          dataType: "number",
        },
        {
          dataField: "STOCKDETAIL_UNITCODE",
          caption: "Birim",
          dataType: "number",
        },
        {
          dataField: "STOCKDETAIL_DIAMETER",
          caption: "Çap",
          dataType: "number",
        },
      ]}
    />
  );

  const other = () => (
    <MyDataGrid
      columns={[
        {
          dataField: "STOCKDETAIL_BARCODE_ID",
          caption: "Barkod",
          dataType: "string",
        },
        {
          dataField: "STOCKDETAIL_ITEMNAME",
          caption: "Ürün Adı",
          dataType: "string",
          width: 280,
        },
        {
          dataField: "STOCKDETAIL_QUANTITY",
          caption: "Miktar",
          dataType: "number",
        },
        {
          dataField: "STOCKDETAIL_UNITCODE",
          caption: "Birim",
          dataType: "number",
        },
      ]}
      detailColumns={[
        {
          dataField: "STOCKDETAIL_BARCODE_ID",
          caption: "Barkod",
          dataType: "string",
        },
        {
          dataField: "STOCKDETAIL_ITEMNAME",
          caption: "Ürün Adı",
          dataType: "string",
          width: 280,
        },
        { dataField: "STOCKDETAIL_LENGTH", caption: "Boy", dataType: "number" },
        { dataField: "STOCKDETAIL_PIECE", caption: "Adet", dataType: "number" },
        {
          dataField: "STOCKDETAIL_QUANTITY",
          caption: "Miktar",
          dataType: "number",
        },
        {
          dataField: "STOCKDETAIL_UNITCODE",
          caption: "Birim",
          dataType: "number",
        },
        {
          dataField: "STOCKDETAIL_DIAMETER",
          caption: "Çap",
          dataType: "number",
        },
      ]}
      data={history.filter((x) => !x.STOCKDETAIL_PROFILE_ID)}
    />
  );
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Stok Detayı (Profil)" },
    { key: "second", title: "Stok Detayı (Diğer)" },
  ]);

  return (
    <Layout
      scrollEnabled={false}
      headerTitle="Barkod Geçmişi"
      showSubTitle={false}
    >
      <View style={{ flex: 1 }}>
        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{
                backgroundColor: colors.background,
              }}
              indicatorStyle={{
                backgroundColor: colors.white,
              }}
            />
          )}
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            first: profile,
            second: other,
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </Layout>
  );
};

export default StockDetailBarcodeHistory;
