import { ProductionMaster } from '../db/ProductionMaster'
import { ProductionMold } from '../db/ProductionMold'
import { ProductionOrderDetail } from '../db/ProductionOrderDetail'
import { ProductionProgDetail } from '../db/ProductionProgDetail'
import { ProductionDetailSub } from '../db/ProductionDetailSub'
import { ProductionWaste } from '../db/ProductionWaste'

export interface ProductionDetail {
  ID: number
  PRODUCTIONDETAIL_MASTER_ID: number
  PRODUCTIONDETAIL_PRODUCTIONORDERDETAIL_ID: number
  PRODUCTIONDETAIL_QUANTITY: number
  PRODUCTIONDETAIL_LOTNUMBER?: string
  PRODUCTIONDETAIL_REGUSER_ID: number
  PRODUCTIONDETAIL_REGDATE: Date
  PRODUCTIONDETAIL_REGIP: string
  PRODUCTIONDETAIL_STARTTIME: Date
  PRODUCTIONDETAIL_ENDTIME?: Date
  PRODUCTIONDETAIL_DESCRIPTION?: string
  PRODUCTIONDETAIL_PIECE: number
  PRODUCTIONDETAIL_PRODUCTIONPROGDETAIL_ID?: number
  PRODUCTIONDETAIL_PRODUCTIONMOLD_ID?: number
  PRODUCTIONDETAIL_LENGTH: number
  PRODUCTIONDETAIL_WASTEPIECE: number
  PRODUCTIONDETAIL_WASTEQUANTITY: number
  PRODUCTIONDETAIL_BASKETNO?: string
  PRODUCTIONDETAIL_REALGRAMMAGE?: number
  PRODUCTIONDETAIL_PRODUCTIONORDERDETAILSUB_ID?: number
  PRODUCTIONDETAIL_MASTER?: ProductionMaster
  PRODUCTIONDETAIL_PRODUCTIONMOLD?: ProductionMold
  PRODUCTIONDETAIL_PRODUCTIONORDERDETAIL?: ProductionOrderDetail
  PRODUCTIONDETAIL_PRODUCTIONPROGDETAIL?: ProductionProgDetail
  ProductionDetailSub: ProductionDetailSub[]
  ProductionWaste: ProductionWaste[]
}
