import { MoldDetail } from '../db/MoldDetail'

export interface MoldMaster {
  ID: number
  MOLDMASTER_NUMBER: number
  MOLDMASTER_DATE: Date
  MOLDMASTER_TYPE_ID: number
  MOLDMASTER_REGDATE: Date
  MOLDMASTER_REGIP: string
  MOLDMASTER_REGUSER_ID: number
  MOLDMASTER_SECTION_ID: number
  MOLDMASTER_CORP_ID: number
  MOLDMASTER_COMPANY_ID?: number
  MoldDetail: MoldDetail[]
}
