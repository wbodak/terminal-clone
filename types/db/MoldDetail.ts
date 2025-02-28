import { MoldMaster } from '../db/MoldMaster'
import { Mold } from '../db/Mold'

export interface MoldDetail {
  ID: number
  MOLDDETAIL_MASTER_ID: number
  MOLDDETAIL_MOLD_ID: number
  MOLDDETAIL_KG: number
  MOLDDETAIL_MT: number
  MOLDDETAIL_USER_ID: number
  MOLDDETAIL_REASON_ID: number
  MOLDDETAIL_DESC?: string
  MOLDDETAIL_PROCESSDESC?: string
  MOLDDETAIL_REGDATE: Date
  MOLDDETAIL_REGUSER_ID: number
  MOLDDETAIL_REGIP: string
  MOLDDETAIL_MASTER?: MoldMaster
  MOLDDETAIL_MOLD?: Mold
}
