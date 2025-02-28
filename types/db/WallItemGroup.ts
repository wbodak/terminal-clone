import { WallItem } from '../db/WallItem'

export interface WallItemGroup {
  ID: number
  WALLITEM_ID: number
  USERGROUP_ID: number
  REGDATE: Date
  REGIP: string
  REGUSER_ID: number
  WALLITEM?: WallItem
}
