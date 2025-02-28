import { Item } from '../db/Item'

export interface ItemUnit {
  ID: number
  ITEMUNIT_ITEM_ID: number
  ITEMUNIT_SQUENCE: number
  ITEMUNIT_UNIT_ID: number
  ITEMUNIT_QUANTITY?: number
  ITEMUNIT_SUBUNIT_ID?: number
  ITEMUNIT_SUBQUANTITY?: number
  ITEMUNIT_NETWEIGTH?: number
  ITEMUNIT_WIDTH?: number
  ITEMUNIT_LENGTH?: number
  ITEMUNIT_HEIGHT?: number
  ITEMUNIT_VOLUME?: number
  ITEMUNIT_REGUSER_ID: number
  ITEMUNIT_REGDATE: Date
  ITEMUNIT_REGIP: string
  ITEMUNIT_DIAMETER?: number
  ITEMUNIT_ITEM?: Item
}
