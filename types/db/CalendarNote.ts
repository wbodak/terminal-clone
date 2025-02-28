import { Calendar } from '../db/Calendar'
import { SetUserDefinition } from '../db/SetUserDefinition'

export interface CalendarNote {
  ID: number
  NOTE: string
  USER_ID: number
  CALENDAR_ID: number
  REGDATE?: Date
  REGIP?: string
  CREATEDATE: Date
  CALENDAR?: Calendar
  USER?: SetUserDefinition
}
