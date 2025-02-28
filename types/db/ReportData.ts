import { DxReport } from '../db/DxReport'
import { ReportMaster } from '../db/ReportMaster'
import { ReportDataColumn } from '../db/ReportDataColumn'

export interface ReportData {
  ID: number
  REPORTDATA_NAME: string
  REPORTDATA_QUERY: string
  REPORTDATA_REGUSER_ID: number
  REPORTDATA_REGDATE: Date
  REPORTDATA_REGIP: string
  REPORTDATA_PARENTDATA_ID?: number
  REPORTDATA_PRIMARYKEY?: string
  REPORTDATA_FOREIGNKEY?: string
  REPORTDATA_MASTER_ID: number
  REPORTDATA_TABNAME: string
  REPORTDATA_TABORDER: number
  REPORTDATA_TYPE: string
  REPORTDATA_DESC?: string
  REPORTDATA_DXREPORT_ID?: number
  REPORTDATA_DXREPORT?: DxReport
  REPORTDATA_MASTER?: ReportMaster
  ReportDataColumn: ReportDataColumn[]
  ReportMaster: ReportMaster[]
}
