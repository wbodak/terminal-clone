import { ProductionDetail } from '../db/ProductionDetail'

export interface ProductionWaste {
  ID: number
  PRODUCTIONWASTE_DESC?: string
  PRODUCTIONWASTE_QUANTITY: number
  PRODUCTIONWASTE_DETAIL_ID: number
  PRODUCTIONWASTE_REGUSER_ID: number
  PRODUCTIONWASTE_REGDATE: Date
  PRODUCTIONWASTE_REGIP: string
  PRODUCTIONWASTE_PIECE: number
  PRODUCTIONWASTE_REASON_ID?: number
  PRODUCTIONWASTE_PLANT_ID?: number
  PRODUCTIONWASTE_DETAIL?: ProductionDetail
}
