import { AccountingDetail } from '../db/AccountingDetail'
import { CurrentAccountPlanCorp } from '../db/CurrentAccountPlanCorp'
import { ExpensePlanCorp } from '../db/ExpensePlanCorp'
import { ItemAccount } from '../db/ItemAccount'

export interface AccountPlan {
  ID: number
  ACCOUNTPLAN_CORP_ID: number
  ACCOUNTPLAN_NUMBER: string
  ACCOUNTPLAN_NAME: string
  ACCOUNTPLAN_PARENT_ID?: number
  ACCOUNTPLAN_MASKNUMBER: string
  ACCOUNTPLAN_TAXNO?: string
  ACCOUNTPLAN_TAXOFFICE?: string
  ACCOUNTPLAN_CURRENCY_ID?: number
  ACCOUNTPLAN_PASSIVE: boolean
  ACCOUNTPLAN_DESCRIPTION?: string
  ACCOUNTPLAN_EXCHANGEDIFF: boolean
  ACCOUNTPLAN_REGUSER_ID: number
  ACCOUNTPLAN_REGDATE: Date
  ACCOUNTPLAN_REGIP: string
  ACCOUNTPLAN_VAT: boolean
  ACCOUNTPLAN_AGAINSTACCOUNT_ID?: number
  AccountingDetail: AccountingDetail[]
  CurrentAccountPlanCorp: CurrentAccountPlanCorp[]
  ExpensePlanCorp: ExpensePlanCorp[]
  ItemAccount: ItemAccount[]
}
