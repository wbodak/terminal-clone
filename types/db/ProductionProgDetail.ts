import { Item } from '../db/Item'
import { ProductionProgMaster } from '../db/ProductionProgMaster'
import { Mold } from '../db/Mold'
import { PlantMaster } from '../db/PlantMaster'
import { ProductionOrderDetailSub } from '../db/ProductionOrderDetailSub'
import { ProductionDetail } from '../db/ProductionDetail'

export interface ProductionProgDetail {
  ID: number
  PRODUCTIONPROGDETAIL_REGUSER_ID: number
  PRODUCTIONPROGDETAIL_REGDATE: Date
  PRODUCTIONPROGDETAIL_REGIP: string
  PRODUCTIONPROGDETAIL_MASTER_ID: number
  PRODUCTIONPROGDETAIL_PRODUCTIONORDERDETAILSUB_ID: number
  PRODUCTIONPROGDETAIL_QUANTITY: number
  PRODUCTIONPROGDETAIL_SEQUENCE: number
  PRODUCTIONPROGDETAIL_CLOSED: boolean
  PRODUCTIONPROGDETAIL_PLANTMASTER_ID?: number
  PRODUCTIONPROGDETAIL_PIECE: number
  PRODUCTIONPROGDETAIL_ITEM_ID?: number
  PRODUCTIONPROGDETAIL_MOLD_ID?: number
  PRODUCTIONPROGDETAIL_ITEM?: Item
  PRODUCTIONPROGDETAIL_MASTER?: ProductionProgMaster
  PRODUCTIONPROGDETAIL_MOLD?: Mold
  PRODUCTIONPROGDETAIL_PLANTMASTER?: PlantMaster
  PRODUCTIONPROGDETAIL_PRODUCTIONORDERDETAILSUB?: ProductionOrderDetailSub
  ProductionDetail: ProductionDetail[]
}
