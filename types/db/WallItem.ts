import { SetUserDefinition } from '../db/SetUserDefinition'
import { WallComment } from '../db/WallComment'
import { WallItemGroup } from '../db/WallItemGroup'
import { WallLike } from '../db/WallLike'

export interface WallItem {
  ID: number
  REGUSER_ID: number
  REGDATE: Date
  REGIP: string
  CREATEUSER_ID: number
  BODY: string
  FILEPATH?: string
  DATE: Date
  CORP_ID: number
  CREATEUSER?: SetUserDefinition
  REGUSER?: SetUserDefinition
  WallComment: WallComment[]
  WallItemGroup: WallItemGroup[]
  WallLike: WallLike[]
}
