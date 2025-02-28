import { ModuleParameter } from '../db/ModuleParameter'

export interface ModuleNotification {
  ID: number
  MODULENOTIFICATION_MASTER_ID: number
  MODULENOTIFICATION_USER_ID: number
  MODULENOTIFICATION_REGDATE: Date
  MODULENOTIFICATION_REGIP: string
  MODULENOTIFICATION_REGUSER_ID: number
  MODULENOTIFICATION_MASTER?: ModuleParameter
}
