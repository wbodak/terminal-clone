import { Company } from '../db/Company'
import { SetUserDefinition } from '../db/SetUserDefinition'
import { Item } from '../db/Item'
import { ParameterDetail } from '../db/ParameterDetail'
import { CalendarType } from '../db/CalendarType'
import { CalendarNote } from '../db/CalendarNote'
import { CalendarUser } from '../db/CalendarUser'

export interface Calendar {
  ID: number
  SUBJECT: string
  STARTDATE: Date
  ENDDATE: Date
  PRIORITY_ID: number
  ALLDAY: boolean
  DESCRIPTION?: string
  CREATEUSER_ID: number
  REGDATE: Date
  REGIP: string
  REGUSER_ID: number
  COMPANY_ID?: number
  AUTHOR?: string
  ITEM_ID?: number
  FAIR_ID?: number
  STATUS_ID: number
  TYPE_ID: number
  COMPANY?: Company
  CREATEUSER?: SetUserDefinition
  ITEM?: Item
  PRIORITY?: ParameterDetail
  TYPE?: CalendarType
  CalendarNote: CalendarNote[]
  CalendarUser: CalendarUser[]
}
