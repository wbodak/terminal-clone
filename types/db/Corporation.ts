import { CashBankMaster } from '../db/CashBankMaster'
import { CheckDefinition } from '../db/CheckDefinition'
import { CheckMaster } from '../db/CheckMaster'
import { CheckParameter } from '../db/CheckParameter'
import { Company } from '../db/Company'
import { CompanyCorp } from '../db/CompanyCorp'
import { CompanyGuarantee } from '../db/CompanyGuarantee'
import { CurrentAccountMaster } from '../db/CurrentAccountMaster'
import { CurrentAccountPlan } from '../db/CurrentAccountPlan'
import { CurrentAccountPlanCorp } from '../db/CurrentAccountPlanCorp'
import { ExpenseMaster } from '../db/ExpenseMaster'
import { ExpenseParameter } from '../db/ExpenseParameter'
import { ExpensePlan } from '../db/ExpensePlan'
import { Item } from '../db/Item'
import { ItemCorp } from '../db/ItemCorp'
import { PlantMachine } from '../db/PlantMachine'
import { PlantMaster } from '../db/PlantMaster'
import { ProductionProgMaster } from '../db/ProductionProgMaster'
import { RouteMaster } from '../db/RouteMaster'

export interface Corporation {
  ID: number
  CORPORATION_SECTION_ID: number
  CORPORATION_CODE: string
  CORPORATION_NAME: string
  CORPORATION_ADDRESS?: string
  CORPORATION_TEL?: string
  CORPORATION_FAX?: string
  CORPORATION_EMAIL?: string
  CORPORATION_WEB?: string
  CORPORATION_TAXOFFICE?: string
  CORPORATION_TAXNUMBER?: string
  CORPORATION_TELOTHER?: string
  CORPORATION_FAXOTHER?: string
  CORPORATION_MERSISNUMBER?: string
  CORPORATION_COUNTRY_ID?: number
  CORPORATION_CITY_ID?: number
  CORPORATION_SUBDIVISION?: string
  CORPORATION_STREET?: string
  CORPORATION_BUILDINGNAME?: string
  CORPORATION_BUILDINGNUMBER?: string
  CORPORATION_BUILDINGROOM?: string
  CORPORATION_POSTCODE?: string
  CORPORATION_ITEM: boolean
  CORPORATION_CURRENT: boolean
  CORPORATION_EXPENSE: boolean
  CORPORATION_ITEMCORP_ID: number
  CORPORATION_EXPENSECORP_ID: number
  CORPORATION_CURRENTCORP_ID: number
  CORPORATION_NACECODE?: string
  CORPORATION_ACCOUNTANTNAME?: string
  CORPORATION_ACCOUNTANTBUILDINGNO?: string
  CORPORATION_ACCOUNTANTSTREET?: string
  CORPORATION_ACCOUNTANTSUBDIVISION?: string
  CORPORATION_ACCOUNTANTCITY_ID?: number
  CORPORATION_ACCOUNTANTCOUNTRY_ID?: number
  CORPORATION_ACCOUNTANTPOSTCODE?: string
  CORPORATION_ACCOUNTANTCONTRACT?: string
  CORPORATION_ACCOUNTANTTEL?: string
  CORPORATION_ACCOUNTANTFAX?: string
  CORPORATION_ACCOUNTANTEMAIL?: string
  CORPORATION_ECOMPANYCODE?: string
  CORPORATION_EUSERNAME?: string
  CORPORATION_EPASSWORD?: string
  CORPORATION_COMPANY_ID?: number
  CORPORATION_TRADEREGNUMBER?: string
  CORPORATION_REGUSER_ID: number
  CORPORATION_REGDATE: Date
  CORPORATION_REGIP: string
  CORPORATION_MAILHOST?: string
  CORPORATION_MAILPORT?: number
  CORPORATION_MAILSSL: boolean
  CORPORATION_ERPURL?: string
  CORPORATION_ERPMAIL?: string
  CORPORATION_ERPMAILPASSWORD?: string
  CORPORATION_FTPIP?: string
  CORPORATION_FTPPORT?: string
  CORPORATION_FTPUSERNAME?: string
  CORPORATION_FTPPASSWORD?: string
  CORPORATION_IMAGEURL?: string
  CORPORATION_REGION?: string
  CashBankMaster: CashBankMaster[]
  CheckDefinition: CheckDefinition[]
  CheckMaster: CheckMaster[]
  CheckParameter: CheckParameter[]
  Company: Company[]
  CompanyCorp: CompanyCorp[]
  CompanyGuarantee: CompanyGuarantee[]
  CurrentAccountMaster: CurrentAccountMaster[]
  CurrentAccountPlan: CurrentAccountPlan[]
  CurrentAccountPlanCorp: CurrentAccountPlanCorp[]
  ExpenseMaster: ExpenseMaster[]
  ExpenseParameter: ExpenseParameter[]
  ExpensePlan: ExpensePlan[]
  Item: Item[]
  ItemCorp: ItemCorp[]
  PlantMachine: PlantMachine[]
  PlantMaster: PlantMaster[]
  ProductionProgMaster: ProductionProgMaster[]
  RouteMaster: RouteMaster[]
}
