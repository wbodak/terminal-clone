import { SetUserDefinition } from '../db/SetUserDefinition'
import { WallItem } from '../db/WallItem'

export interface WallComment {
  ID: number
  COMMENT: string
  REGDATE: Date
  REGIP: string
  REGUSER_ID: number
  WALLITEM_ID: number
  REGUSER?: SetUserDefinition
  WALLITEM?: WallItem
}
