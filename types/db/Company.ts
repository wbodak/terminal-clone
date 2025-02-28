import { Corporation } from '../db/Corporation'
import { Calendar } from '../db/Calendar'
import { CompanyAddress } from '../db/CompanyAddress'
import { CompanyAuthor } from '../db/CompanyAuthor'
import { CompanyBank } from '../db/CompanyBank'
import { CompanyCorp } from '../db/CompanyCorp'
import { CompanyGuarantee } from '../db/CompanyGuarantee'
import { CompanyLink } from '../db/CompanyLink'
import { CompanyNote } from '../db/CompanyNote'
import { CompanyPhone } from '../db/CompanyPhone'
import { CompanyRepresentative } from '../db/CompanyRepresentative'
import { CompanyRisk } from '../db/CompanyRisk'
import { CurrentAccountPlan } from '../db/CurrentAccountPlan'

export interface Company {
  ID: number
  COMPANY_CORP_ID: number
  COMPANY_CODE: string
  COMPANY_REFNO?: string
  COMPANY_TYPE_ID: number
  COMPANY_NAME: string
  COMPANY_ADDRESS?: string
  COMPANY_NAMEOTHER?: string
  COMPANY_POSTCODE?: string
  COMPANY_TAXOFFICE?: string
  COMPANY_TAXNO?: string
  COMPANY_MERSISNO?: string
  COMPANY_COUNTRY_ID?: number
  COMPANY_CITY_ID?: number
  COMPANY_REGION_ID?: number
  COMPANY_SUBDIVISION?: string
  COMPANY_STREET?: string
  COMPANY_BUILDINGNAME?: string
  COMPANY_BUILDINGNO?: string
  COMPANY_BUILDINGROOM?: string
  COMPANY_FIRSTNAME?: string
  COMPANY_LASTNAME?: string
  COMPANY_PAYMENT_ID?: number
  COMPANY_DELIVERY_ID?: number
  COMPANY_PAYDAY: number
  COMPANY_CURRENCY_ID?: number
  COMPANY_WEB?: string
  COMPANY_EMAIL?: string
  COMPANY_INFORMATION?: string
  COMPANY_TEL?: string
  COMPANY_FAX?: string
  COMPANY_PASSIVE: boolean
  COMPANY_GROUP: boolean
  COMPANY_EINVOICE: boolean
  COMPANY_KIND_ID: number
  COMPANY_RISKGROUP_ID?: number
  COMPANY_ENTERDATE?: Date
  COMPANY_PRIVATECODE1?: string
  COMPANY_PRIVATECODE2?: string
  COMPANY_PRIVATECODE3?: string
  COMPANY_PRIVATECODE4?: string
  COMPANY_PRIVATECODE5?: string
  COMPANY_PRIVATECODE6?: string
  COMPANY_CURRENTGROUP_ID?: number
  COMPANY_SUBCOMPANY: boolean
  COMPANY_REGUSER_ID: number
  COMPANY_REGDATE: Date
  COMPANY_REGIP: string
  COMPANY_ESCENARIO?: string
  COMPANY_PUBLIC: boolean
  COMPANY_GROUP1_ID?: number
  COMPANY_GROUP2_ID?: number
  COMPANY_GROUP3_ID?: number
  COMPANY_GROUP4_ID?: number
  COMPANY_GROUP5_ID?: number
  COMPANY_GROUP6_ID?: number
  COMPANY_GROUP7_ID?: number
  COMPANY_GROUP8_ID?: number
  COMPANY_GROUP9_ID?: number
  COMPANY_GROUP10_ID?: number
  COMPANY_GROUP11_ID?: number
  COMPANY_GROUP12_ID?: number
  COMPANY_EWAYBILL: boolean
  COMPANY_EWAYBILLURL?: string
  COMPANY_EINVOICEURL?: string
  COMPANY_JOINCOMPANY_ID?: number
  COMPANY_NOTEVKIFAT: boolean
  COMPANY_NOCAMPAIGN: boolean
  COMPANY_PRICEGROUP_ID?: number
  COMPANY_CORP?: Corporation
  Calendar: Calendar[]
  CompanyAddress: CompanyAddress[]
  CompanyAuthor: CompanyAuthor[]
  CompanyBank: CompanyBank[]
  CompanyCorp: CompanyCorp[]
  CompanyGuarantee: CompanyGuarantee[]
  CompanyLink: CompanyLink[]
  CompanyNote: CompanyNote[]
  CompanyPhone: CompanyPhone[]
  CompanyRepresentative: CompanyRepresentative[]
  CompanyRisk: CompanyRisk[]
  CurrentAccountPlan: CurrentAccountPlan[]
}
