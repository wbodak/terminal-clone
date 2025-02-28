import { ProductionMaster } from '../db/ProductionMaster'

export interface ProductionStop {
  PRODUCTIONSTOP_REGUSER_ID: number
  PRODUCTIONSTOP_REGDATE: Date
  PRODUCTIONSTOP_REGIP: string
  ID: number
  PRODUCTIONSTOP_TYPE_ID: number
  PRODUCTIONSTOP_STARTTIME: Date
  PRODUCTIONSTOP_ENDTIME?: Date
  PRODUCTIONSTOP_DESCRIPTION?: string
  PRODUCTIONSTOP_MASTER_ID: number
  PRODUCTIONSTOP_MASTER?: ProductionMaster
}
