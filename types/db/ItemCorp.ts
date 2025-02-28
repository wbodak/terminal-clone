import { Corporation } from '../db/Corporation'
import { Item } from '../db/Item'

export interface ItemCorp {
  ID: number
  ITEMCORP_ITEM_ID: number
  ITEMCORP_CORP_ID: number
  ITEMCORP_TEVKIFAT_ID?: number
  ITEMCORP_REGUSER_ID: number
  ITEMCORP_REGDATE: Date
  ITEMCORP_REGIP: string
  ITEMCORP_CORP?: Corporation
  ITEMCORP_ITEM?: Item
}
