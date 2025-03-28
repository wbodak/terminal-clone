import { parseToNumber } from "@/components/Elements/MyNumberInput";
import { V_StockDetail } from "@/types/db/V_StockDetail";

export const onPieceChanged = (value: number, warehouse: V_StockDetail) => {
  const length = warehouse?.STOCKDETAIL_LENGTH;
  const meter = ((length ?? 0) * value) / 1000;

  let grammage = warehouse?.STOCKDETAIL_GRAMMAGE;
  if (!grammage) {
    console.log("burdayız");
    grammage =
      (warehouse?.STOCKDETAIL_QUANTITY /
        ((length ?? 0) * warehouse?.STOCKDETAIL_PIECE)) *
      1000;
  }

  const quantity = meter * grammage;

  return quantity;
};

export const convertDecimal = (value: any, decimalCount = 2) => {
  return parseFloat(value?.toFixed(decimalCount)) || 0;
};
