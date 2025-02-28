import { Company } from '../db/Company'

export interface CompanyAddress {
  ID: number
  COMPANYADDRESS_COMPANY_ID: number
  COMPANYADDRESS_ADDRESS: string
  COMPANYADDRESS_DESCRIPTION?: string
  COMPANYADDRESS_REGUSER_ID: number
  COMPANYADDRESS_REGDATE: Date
  COMPANYADDRESS_REGIP: string
  COMPANYADDRESS_COMPANY?: Company
}
