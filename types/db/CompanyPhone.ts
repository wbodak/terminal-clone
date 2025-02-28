import { Company } from '../db/Company'

export interface CompanyPhone {
  ID: number
  COMPANYPHONE_COMPANY_ID?: number
  COMPANYPHONE_TYPE: string
  COMPANYPHONE_NUMBER: string
  COMPANYPHONE_DESCRIPTION: string
  COMPANYPHONE_REGUSER_ID: number
  COMPANYPHONE_REGDATE: Date
  COMPANYPHONE_REGIP: string
  COMPANYPHONE_COMPANY?: Company
}
