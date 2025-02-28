import { ProductionOrderMaster } from '../db/ProductionOrderMaster'
import { RouteMaster } from '../db/RouteMaster'
import { SalesOrderDetail } from '../db/SalesOrderDetail'
import { ProductionDetail } from '../db/ProductionDetail'
import { ProductionOrderDetailSub } from '../db/ProductionOrderDetailSub'

export interface ProductionOrderDetail {
  ID: number
  PRODUCTIONORDERDETAIL_MASTER_ID: number
  PRODUCTIONORDERDETAIL_SALESORDERDETAIL_ID: number
  PRODUCTIONORDERDETAIL_QUANTITY: number
  PRODUCTIONORDERDETAIL_REGUSER_ID: number
  PRODUCTIONORDERDETAIL_REGDATE: Date
  PRODUCTIONORDERDETAIL_REGIP: string
  PRODUCTIONORDERDETAIL_DESCRIPTION?: string
  PRODUCTIONORDERDETAIL_ROUTEMASTER_ID?: number
  PRODUCTIONORDERDETAIL_CLOSED: boolean
  PRODUCTIONORDERDETAIL_PIECE: number
  PRODUCTIONORDERDETAIL_MASTER?: ProductionOrderMaster
  PRODUCTIONORDERDETAIL_ROUTEMASTER?: RouteMaster
  PRODUCTIONORDERDETAIL_SALESORDERDETAIL?: SalesOrderDetail
  ProductionDetail: ProductionDetail[]
  ProductionOrderDetailSub: ProductionOrderDetailSub[]
}
