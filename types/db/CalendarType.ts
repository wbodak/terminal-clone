import { Calendar } from '../db/Calendar'

export interface CalendarType {
  ID: number
  NAME: string
  ITEM_REQUIRED: boolean
  COMPANY_REQUIRED: boolean
  FAIR_REQUIRED: boolean
  Calendar: Calendar[]
}
