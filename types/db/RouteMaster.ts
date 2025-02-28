import { Corporation } from '../db/Corporation'
import { ProductionOrderDetail } from '../db/ProductionOrderDetail'
import { RouteDetail } from '../db/RouteDetail'

export interface RouteMaster {
  ID: number
  ROUTEMASTER_REGUSER_ID: number
  ROUTEMASTER_REGDATE: Date
  ROUTEMASTER_REGIP: string
  ROUTEMASTER_CORP_ID: number
  ROUTEMASTER_NO: number
  ROUTEMASTER_PASSIVE: boolean
  ROUTEMASTER_DATE: Date
  ROUTEMASTER_CORP?: Corporation
  ProductionOrderDetail: ProductionOrderDetail[]
  RouteDetail: RouteDetail[]
}
