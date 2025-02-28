import { Company } from '../db/Company'

export interface CompanyNote {
  ID: number
  COMPANYNOTE_COMPANY_ID: number
  COMPANYNOTE_NOTE: string
  COMPANYNOTE_USER_ID: number
  COMPANYNOTE_REGDATE: Date
  COMPANYNOTE_REGUSER_ID: number
  COMPANYNOTE_REGIP: string
  COMPANYNOTE_COMPANY?: Company
}
