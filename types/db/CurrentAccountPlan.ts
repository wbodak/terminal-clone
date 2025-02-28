import { Company } from '../db/Company'
import { Corporation } from '../db/Corporation'
import { CashBankDetail } from '../db/CashBankDetail'
import { CheckDefinition } from '../db/CheckDefinition'
import { CheckMaster } from '../db/CheckMaster'
import { CheckParameter } from '../db/CheckParameter'
import { CompanyGuarantee } from '../db/CompanyGuarantee'
import { CurrentAccountDetail } from '../db/CurrentAccountDetail'
import { CurrentAccountPlanCorp } from '../db/CurrentAccountPlanCorp'
import { ExpenseMaster } from '../db/ExpenseMaster'
import { ExpensePlanCorp } from '../db/ExpensePlanCorp'
import { ItemAccount } from '../db/ItemAccount'

export interface CurrentAccountPlan {
  ID: number
  CURRENTACCOUNTPLAN_CORP_ID: number
  CURRENTACCOUNTPLAN_NUMBER: string
  CURRENTACCOUNTPLAN_NAME: string
  CURRENTACCOUNTPLAN_PARENT_ID?: number
  CURRENTACCOUNTPLAN_MASKNUMBER: string
  CURRENTACCOUNTPLAN_COMPANY_ID?: number
  CURRENTACCOUNTPLAN_CURRENCY_ID?: number
  CURRENTACCOUNTPLAN_SESSION: boolean
  CURRENTACCOUNTPLAN_JOINTACCOUNT_ID?: number
  CURRENTACCOUNTPLAN_DEPOSITACCOUNT_ID?: number
  CURRENTACCOUNTPLAN_IBAN?: string
  CURRENTACCOUNTPLAN_BANKACCOUNTNO?: string
  CURRENTACCOUNTPLAN_SWIFTCODE?: string
  CURRENTACCOUNTPLAN_BANKDEPOSIT: boolean
  CURRENTACCOUNTPLAN_BANK_ID?: number
  CURRENTACCOUNTPLAN_PASSIVE: boolean
  CURRENTACCOUNTPLAN_SUBACCOUNT_ID?: number
  CURRENTACCOUNTPLAN_REGUSER_ID: number
  CURRENTACCOUNTPLAN_REGDATE: Date
  CURRENTACCOUNTPLAN_REGIP: string
  CURRENTACCOUNTPLAN_TAXNO?: string
  CURRENTACCOUNTPLAN_TAXOFFICE?: string
  CURRENTACCOUNTPLAN_COMPANY?: Company
  CURRENTACCOUNTPLAN_CORP?: Corporation
  CashBankDetail: CashBankDetail[]
  CheckDefinition: CheckDefinition[]
  CheckMasterCHECKMASTER_BANKACCOUNT: CheckMaster[]
  CheckMasterCHECKMASTER_CURRENTACCOUNT: CheckMaster[]
  CheckMasterCHECKMASTER_OWNER: CheckMaster[]
  CheckParameter: CheckParameter[]
  CompanyGuarantee: CompanyGuarantee[]
  CurrentAccountDetail: CurrentAccountDetail[]
  CurrentAccountPlanCorp: CurrentAccountPlanCorp[]
  ExpenseMaster: ExpenseMaster[]
  ExpensePlanCorp: ExpensePlanCorp[]
  ItemAccount: ItemAccount[]
}
