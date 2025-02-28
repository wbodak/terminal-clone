import { DxReportParameter } from '../db/DxReportParameter'
import { ReportData } from '../db/ReportData'

export interface DxReport {
  ID: number
  DXREPORT_TITLE: string
  DXREPORT_ORDER: number
  DXREPORT_REGUSER_ID: number
  DXREPORT_REGIP: string
  DXREPORT_REGDATE: Date
  DXREPORT_FILE?: string
  DXREPORT_FILENAME: string
  DXREPORT_FORMNO?: string
  DxReportParameter: DxReportParameter[]
  ReportData: ReportData[]
}
