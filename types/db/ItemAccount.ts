import { AccountPlan } from '../db/AccountPlan'
import { CurrentAccountPlan } from '../db/CurrentAccountPlan'
import { Item } from '../db/Item'

export interface ItemAccount {
  ID: number
  ITEMACCOUNT_ITEM_ID: number
  ITEMACCOUNT_CORP_ID: number
  ITEMACCOUNT_TYPE_ID: number
  ITEMACCOUNT_TYPEDETAIL_ID: number
  ITEMACCOUNT_ACCOUNT_ID?: number
  ITEMACCOUNT_CURRENTACCOUNT_ID: number
  ITEMACCOUNT_RATE_ID?: number
  ITEMACCOUNT_REGUSER_ID: number
  ITEMACCOUNT_REGDATE: Date
  ITEMACCOUNT_REGIP: string
  ITEMACCOUNT_ACCOUNT?: AccountPlan
  ITEMACCOUNT_CURRENTACCOUNT?: CurrentAccountPlan
  ITEMACCOUNT_ITEM?: Item
}
