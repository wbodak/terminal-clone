import { DxReportParameter } from '../db/DxReportParameter'
import { ReportData } from '../db/ReportData'
import { ReportMaster } from '../db/ReportMaster'
import { ReportParameter } from '../db/ReportParameter'
import { SelectBoxDto } from './SelectBoxDto'

export interface ReportMasterDto extends ReportMaster {
  formData: any
  mainChart: ReportData
  reportTabs: ReportTab[]
  reportParameters: ReportParameterDto[]
}

export interface ReportTab {
  title: string
  reportDetails: ReportDetail[]
}

export interface ReportDetail extends ReportData {
  reportDetailSub?: ReportData
}

export interface ReportDataResponse {
  chartDataList: ChartData[]
  gridDataList: GridData[]
}

export interface ChartData {
  id: number
  categories: any[]
  series: ChartSeries[]
}

export interface GridData {
  id: number
  dataSource: any[]
}

export interface ChartSeries {
  name: string
  data: number[]
}

export interface ReportParameterDto extends ReportParameter {
  REPORTPARAMETER_DATASOURCE: SelectBoxDto[]
}

export interface DxReportParameterDto extends DxReportParameter {
  DXREPORTPARAMETER_FORMREPORT_ID?: number
  DXREPORT_TITLE?: string
}
