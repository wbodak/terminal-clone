import { SalesPriceDetail } from '../db/SalesPriceDetail'
import { SalesPriceDetailSub } from '../db/SalesPriceDetailSub'

export interface SalesPriceMaster {
  ID: number
  SALESPRICEMASTER_CORP_ID: number
  SALESPRICEMASTER_YEAR: number
  SALESPRICEMASTER_SECTION_ID: number
  SALESPRICEMASTER_NUMBER: number
  SALESPRICEMASTER_COMPANY_ID?: number
  SALESPRICEMASTER_DATE: Date
  SALESPRICEMASTER_CLOSED: boolean
  SALESPRICEMASTER_DESCRIPTION?: string
  SALESPRICEMASTER_CURRENCY_ID?: number
  SALESPRICEMASTER_REGUSER_ID: number
  SALESPRICEMASTER_REGDATE: Date
  SALESPRICEMASTER_REGIP: string
  SALESPRICEMASTER_VATTYPE: number
  SALESPRICEMASTER_CLOSEDDATE?: Date
  SALESPRICEMASTER_GROUP_ID?: number
  SalesPriceDetail: SalesPriceDetail[]
  SalesPriceDetailSub: SalesPriceDetailSub[]
}
