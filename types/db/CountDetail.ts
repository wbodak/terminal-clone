import { CountMaster } from '../db/CountMaster'

export interface CountDetail {
  ID: number
  COUNTDETAIL_MASTER_ID: number
  COUNTDETAIL_QUANTITY: number
  COUNTDETAIL_BARCODE_ID: number
  COUNTDETAIL_RACK_ID: number
  COUNTDETAIL_REGUSER_ID: number
  COUNTDETAIL_REGDATE: Date
  COUNTDETAIL_REGIP: string
  COUNTDETAIL_PIECE: number
  COUNTDETAIL_MASTER?: CountMaster
}
