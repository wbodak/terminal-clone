import { MoldDemandMaster } from '../db/MoldDemandMaster'

export interface MoldDemandDetail {
  ID: number
  MOLDDEMANDDETAIL_MASTER_ID: number
  MOLDDEMANDDETAIL_LINK: string
  MOLDDEMANDDETAIL_REF_ID: number
  MOLDDEMANDDETAIL_REGDATE: Date
  MOLDDEMANDDETAIL_REGIP: string
  MOLDDEMANDDETAIL_REGUSER_ID: number
  MOLDDEMANDDETAIL_MASTER?: MoldDemandMaster
}
