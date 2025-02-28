import { PurchaseDetail } from '../db/PurchaseDetail'
import { PurchaseOrderDetail } from '../db/PurchaseOrderDetail'
import { SalesOrderDetail } from '../db/SalesOrderDetail'
import { StockDetail } from '../db/StockDetail'

export interface Color {
  ID: number
  COLOR_NAME: string
  COLOR_TYPE_ID: number
  COLOR_CODE: string
  COLOR_REGUSER_ID: number
  COLOR_REGIP: string
  COLOR_REGDATE: Date
  COLOR_CORP_ID: number
  COLOR_ENGLISH?: string
  COLOR_GERMANY?: string
  PurchaseDetail: PurchaseDetail[]
  PurchaseOrderDetail: PurchaseOrderDetail[]
  SalesOrderDetail: SalesOrderDetail[]
  StockDetail: StockDetail[]
}
