import { AccountPlan } from '../db/AccountPlan'
import { Corporation } from '../db/Corporation'
import { CurrentAccountPlan } from '../db/CurrentAccountPlan'

export interface CurrentAccountPlanCorp {
  ID: number
  CURRENTACCOUNTPLANCORP_CURRENTACCOUNT_ID: number
  CURRENTACCOUNTPLANCORP_CORP_ID: number
  CURRENTACCOUNTPLANCORP_ACCOUNT_ID?: number
  CURRENTACCOUNTPLANCORP_REGUSER_ID: number
  CURRENTACCOUNTPLANCORP_REGDATE: Date
  CURRENTACCOUNTPLANCORP_REGIP: string
  CURRENTACCOUNTPLANCORP_ACCOUNT?: AccountPlan
  CURRENTACCOUNTPLANCORP_CORP?: Corporation
  CURRENTACCOUNTPLANCORP_CURRENTACCOUNT?: CurrentAccountPlan
}
