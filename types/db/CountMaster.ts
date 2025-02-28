import { CountAnalysis } from '../db/CountAnalysis'
import { CountDetail } from '../db/CountDetail'

export interface CountMaster {
  ID: number
  COUNTMASTER_CORP_ID: number
  COUNTMASTER_DATE: Date
  COUNTMASTER_STORE_ID: number
  COUNTMASTER_CONFIRM: boolean
  COUNTMASTER_REGUSER_ID: number
  COUNTMASTER_REGDATE: Date
  COUNTMASTER_REGIP: string
  CountAnalysis: CountAnalysis[]
  CountDetail: CountDetail[]
}
