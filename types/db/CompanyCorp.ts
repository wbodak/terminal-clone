import { Company } from '../db/Company'
import { Corporation } from '../db/Corporation'

export interface CompanyCorp {
  ID: number
  COMPANYCORP_COMPANY_ID: number
  COMPANYCORP_CORP_ID: number
  COMPANYCORP_REGUSER_ID: number
  COMPANYCORP_REGDATE: Date
  COMPANYCORP_REGIP: string
  COMPANYCORP_REPRESENTATIVE_ID?: number
  COMPANYCORP_COMPANY?: Company
  COMPANYCORP_CORP?: Corporation
}
