import { Corporation } from '../db/Corporation'
import { CashBankDetail } from '../db/CashBankDetail'

export interface CashBankMaster {
  ID: number
  CASHBANKMASTER_CORP_ID: number
  CASHBANKMASTER_SECTION_ID: number
  CASHBANKMASTER_YEAR: number
  CASHBANKMASTER_SERIAL_ID: number
  CASHBANKMASTER_NUMBER: number
  CASHBANKMASTER_DATE: Date
  CASHBANKMASTER_TYPE: number
  CASHBANKMASTER_OPERATION_ID: number
  CASHBANKMASTER_ACCOUNTING: boolean
  CASHBANKMASTER_LINK?: string
  CASHBANKMASTER_REF_ID?: number
  CASHBANKMASTER_CONFIRM: boolean
  CASHBANKMASTER_REGUSER_ID: number
  CASHBANKMASTER_REGDATE: Date
  CASHBANKMASTER_REGIP: string
  CASHBANKMASTER_CORP?: Corporation
  CashBankDetail: CashBankDetail[]
}
