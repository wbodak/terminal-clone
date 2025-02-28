import { Mold } from '../db/Mold'

export interface MoldMaintenance {
  ID: number
  MOLDMAINTENANCE_NO: string
  MOLDMAINTENANCE_DESC?: string
  MOLDMAINTENANCE_STEP1?: number
  MOLDMAINTENANCE_STEP2?: number
  MOLDMAINTENANCE_STEP3?: number
  MOLDMAINTENANCE_STEP4?: number
  MOLDMAINTENANCE_STEP5?: number
  MOLDMAINTENANCE_REGUSER_ID: number
  MOLDMAINTENANCE_REGDATE: Date
  MOLDMAINTENANCE_REGIP: string
  Mold: Mold[]
}
