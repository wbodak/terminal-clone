import { Company } from '../db/Company'

export interface CompanyBank {
  ID: number
  COMPANYBANK_COMPANY_ID: number
  COMPANYBANK_NAME: string
  COMPANYBANK_ACOUNTNUMBER?: string
  COMPANYBANK_IBAN?: string
  COMPANYBANK_SWIFTCODE?: string
  COMPANYBANK_REGUSER_ID: number
  COMPANYBANK_REGDATE: Date
  COMPANYBANK_REGIP: string
  COMPANYBANK_COMPANY?: Company
}
