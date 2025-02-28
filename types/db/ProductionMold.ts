import { ProductionMaster } from '../db/ProductionMaster'
import { Mold } from '../db/Mold'
import { ProductionDetail } from '../db/ProductionDetail'
import { ProductionDetailSub } from '../db/ProductionDetailSub'

export interface ProductionMold {
  ID: number
  PRODUCTIONMOLD_MASTER_ID: number
  PRODUCTIONMOLD_MOLD_ID: number
  PRODUCTIONMOLD_STARTTIME: Date
  PRODUCTIONMOLD_ENDTIME?: Date
  PRODUCTIONMOLD_REGDATE: Date
  PRODUCTIONMOLD_REGIP: string
  PRODUCTIONMOLD_REGUSER_ID?: number
  PRODUCTIONMOLD_REALGRAMMAGE: number
  PRODUCTIONMOLD_USER_ID: number
  PRODUCTIONMOLD_ERROR_ID?: number
  PRODUCTIONMOLD_OVENTEMP?: number
  PRODUCTIONMOLD_QUITTEMP?: number
  PRODUCTIONMOLD_SIZE?: number
  PRODUCTIONMOLD_WEDGEHEAD?: number
  PRODUCTIONMOLD_SAWDIST?: number
  PRODUCTIONMOLD_TUNNELFANSPEED?: number
  PRODUCTIONMOLD_HIVETEMP?: number
  PRODUCTIONMOLD_MOLDTEMP?: number
  PRODUCTIONMOLD_DESC?: string
  PRODUCTIONMOLD_OVENDATE?: Date
  PRODUCTIONMOLD_MASTER?: ProductionMaster
  PRODUCTIONMOLD_MOLD?: Mold
  ProductionDetail: ProductionDetail[]
  ProductionDetailSub: ProductionDetailSub[]
}
