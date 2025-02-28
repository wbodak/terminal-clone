export interface Exchange {
  ID: number
  EXCHANGE_DATE: Date
  EXCHANGE_CURRENCY_ID: number
  EXCHANGE_CODE: string
  EXCHANGE_NAME: string
  EXCHANGE_BUY: number
  EXCHANGE_SALE: number
  EXCHANGE_EFFECTIVEBUY: number
  EXCHANGE_EFFECTIVESALE: number
  EXCHANGE_CORP_ID: number
  EXCHANGE_REGUSER_ID: number
  EXCHANGE_REGDATE: Date
  EXCHANGE_REGIP: string
  EXCHANGE_LME?: number
}
