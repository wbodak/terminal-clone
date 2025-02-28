import { ReportData } from '../db/ReportData'
import { ReportParameter } from '../db/ReportParameter'

export interface ReportMaster {
  ID: number
  REPORTMASTER_TITLE: string
  REPORTMASTER_SETMENUMASTER_ID: number
  REPORTMASTER_REGUSER_ID: number
  REPORTMASTER_REGDATE: Date
  REPORTMASTER_REGIP: string
  REPORTMASTER_ORDER: number
  REPORTMASTER_CATEGORY?: string
  REPORTMASTER_PASSIVE: boolean
  REPORTMASTER_DESCRIPTION?: string
  REPORTMASTER_MAINCHART_ID?: number
  REPORTMASTER_MAINCHART?: ReportData
  ReportData: ReportData[]
  ReportParameter: ReportParameter[]
}
