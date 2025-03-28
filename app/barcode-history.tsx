import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import StockDetailBarcodeHistory from "@/components/BarcodeHistory/StockDetailBarcodeHistory";
import CountDetailBarcodeHistory from "@/components/BarcodeHistory/CountDetailBarcodeHistory";

const BarcodeHistory = () => {
  const data = useLocalSearchParams();
  return data.type == "stock" ? (
    <StockDetailBarcodeHistory masterId={Number(data.masterId)} />
  ) : (
    <CountDetailBarcodeHistory masterId={Number(data.masterId)} />
  );
};

export default BarcodeHistory;
