import { WallItem } from '../db/WallItem'

export interface WallLike {
  ID: number
  WALLITEM_ID: number
  REGDATE: Date
  REGIP: string
  REGUSER_ID: number
  WALLITEM?: WallItem
}
