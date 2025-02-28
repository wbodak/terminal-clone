import { Corporation } from '../db/Corporation'
import { CurrentAccountPlan } from '../db/CurrentAccountPlan'

export interface CheckParameter {
  ID: number
  CHECKPARAMETER_CORP_ID: number
  CHECKPARAMETER_MOVE_ID: number
  CHECKPARAMETER_CURRENTACCOUNT_ID: number
  CHECKPARAMETER_CURRENCY_ID?: number
  CHECKPARAMETER_TYPE_ID: number
  CHECKPARAMETER_REGUSER_ID: number
  CHECKPARAMETER_REGDATE: Date
  CHECKPARAMETER_REGIP: string
  CHECKPARAMETER_CORP?: Corporation
  CHECKPARAMETER_CURRENTACCOUNT?: CurrentAccountPlan
}
