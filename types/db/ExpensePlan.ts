import { Corporation } from '../db/Corporation'
import { CashBankDetail } from '../db/CashBankDetail'
import { ExpenseDemandDetail } from '../db/ExpenseDemandDetail'
import { ExpenseDetail } from '../db/ExpenseDetail'
import { ExpensePlanCorp } from '../db/ExpensePlanCorp'

export interface ExpensePlan {
  ID: number
  EXPENSEPLAN_CORP_ID: number
  EXPENSEPLAN_NUMBER: string
  EXPENSEPLAN_MASKNUMBER: string
  EXPENSEPLAN_NAME: string
  EXPENSEPLAN_PARENT_ID: number
  EXPENSEPLAN_PASSIVE: boolean
  EXPENSEPLAN_DESCRIPTION?: string
  EXPENSEPLAN_REGUSER_ID: number
  EXPENSEPLAN_REGDATE: Date
  EXPENSEPLAN_REGIP: string
  EXPENSEPLAN_RATE?: number
  EXPENSEPLAN_AMOUNT?: number
  EXPENSEPLAN_DEMAND: boolean
  EXPENSEPLAN_IMPORT: boolean
  EXPENSEPLAN_REQUIRED1: boolean
  EXPENSEPLAN_REQUIRED2: boolean
  EXPENSEPLAN_REQUIRED3: boolean
  EXPENSEPLAN_REQUIRED4: boolean
  EXPENSEPLAN_CORP?: Corporation
  CashBankDetail: CashBankDetail[]
  ExpenseDemandDetail: ExpenseDemandDetail[]
  ExpenseDetail: ExpenseDetail[]
  ExpensePlanCorp: ExpensePlanCorp[]
}
