import { Calendar } from '../db/Calendar'
import { SetUserDefinition } from '../db/SetUserDefinition'

export interface CalendarUser {
  ID: number
  CALENDAR_ID: number
  USER_ID: number
  CALENDAR?: Calendar
  USER?: SetUserDefinition
}
