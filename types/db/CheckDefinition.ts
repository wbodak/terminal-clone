import { Corporation } from '../db/Corporation'
import { CurrentAccountPlan } from '../db/CurrentAccountPlan'
import { CheckDetail } from '../db/CheckDetail'
import { CheckMaster } from '../db/CheckMaster'

export interface CheckDefinition {
  ID: number
  CHECKDEFINITION_CORP_ID: number
  CHECKDEFINITION_SECTION_ID: number
  CHECKDEFINITION_TYPE_ID: number
  CHECKDEFINITION_MOVE_ID: number
  CHECKDEFINITION_DATE: Date
  CHECKDEFINITION_NUMBER: number
  CHECKDEFINITION_SERIAL_ID: number
  CHECKDEFINITION_CURRENTACCOUNT_ID: number
  CHECKDEFINITION_DESCRIPTION?: string
  CHECKDEFINITION_ACCOUNTING: boolean
  CHECKDEFINITION_DOCUMENTNUMBER: string
  CHECKDEFINITION_DOCUMENTDATE: Date
  CHECKDEFINITION_SUBACCOUNT_ID: number
  CHECKDEFINITION_CONFIRM: boolean
  CHECKDEFINITION_REGUSER_ID: number
  CHECKDEFINITION_REGDATE: Date
  CHECKDEFINITION_REGIP: string
  CHECKDEFINITION_ENTERDATE: Date
  CHECKDEFINITION_CORP?: Corporation
  CHECKDEFINITION_CURRENTACCOUNT?: CurrentAccountPlan
  CheckDetail: CheckDetail[]
  CheckMaster: CheckMaster[]
}
