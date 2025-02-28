import { ModuleNotification } from '../db/ModuleNotification'

export interface ModuleParameter {
  ID: number
  MODULEPARAMETER_REGUSER_ID: number
  MODULEPARAMETER_REGDATE: Date
  MODULEPARAMETER_REGIP: string
  MODULEPARAMETER_CORP_ID: number
  MODULEPARAMETER_CODE: string
  MODULEPARAMETER_NAME: string
  MODULEPARAMETER_BITVALUE: boolean
  MODULEPARAMETER_NUMBERVALUE?: number
  ModuleNotification: ModuleNotification[]
}
