import { parseToNumber } from '@/components/Elements/MyNumberInput'

export const onPieceChanged = (value: string, length = 0, gramage = 0) => {
  const meter = (length * Number(parseToNumber(value))) / 1000
  return convertDecimal(meter * gramage, 4)
}

export const convertDecimal = (value: any, decimalCount = 2) => {
  return parseFloat(value?.toFixed(decimalCount)) || 0
}
