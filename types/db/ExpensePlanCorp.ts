import { AccountPlan } from '../db/AccountPlan'
import { CurrentAccountPlan } from '../db/CurrentAccountPlan'
import { ExpensePlan } from '../db/ExpensePlan'

export interface ExpensePlanCorp {
  ID: number
  EXPENSEPLANCORP_EXPENSE_ID: number
  EXPENSEPLANCORP_CORP_ID: number
  EXPENSEPLANCORP_REGUSER_ID: number
  EXPENSEPLANCORP_REGDATE: Date
  EXPENSEPLANCORP_REGIP: string
  EXPENSEPLANCORP_DEPARTMENT_ID?: number
  EXPENSEPLANCORP_ACCOUNT_ID?: number
  EXPENSEPLANCORP_CURRENTACCOUNT_ID?: number
  EXPENSEPLANCORP_ACCOUNT?: AccountPlan
  EXPENSEPLANCORP_CURRENTACCOUNT?: CurrentAccountPlan
  EXPENSEPLANCORP_EXPENSE?: ExpensePlan
}
