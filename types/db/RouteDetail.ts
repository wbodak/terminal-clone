import { RouteMaster } from '../db/RouteMaster'

export interface RouteDetail {
  ID: number
  ROUTEDETAIL_REGUSER_ID: number
  ROUTEDETAIL_REGDATE: Date
  ROUTEDETAIL_REGIP: string
  ROUTEDETAIL_MASTER_ID: number
  ROUTEDETAIL_SEQUENCE: number
  ROUTEDETAIL_PLANT_ID: number
  ROUTEDETAIL_MASTER?: RouteMaster
}
