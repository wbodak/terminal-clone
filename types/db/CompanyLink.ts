import { Company } from '../db/Company'

export interface CompanyLink {
  ID: number
  COMPANYLINK_COMPANY_ID: number
  COMPANYLINK_LINK: string
  COMPANYLINK_DESCRIPTION?: string
  COMPANYLINK_REGUSER_ID: number
  COMPANYLINK_REGDATE: Date
  COMPANYLINK_REGIP: string
  COMPANYLINK_COMPANY?: Company
}
