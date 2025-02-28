import { SetUserDefinition } from '../db/SetUserDefinition'

export interface SetUserStore {
  ID: number
  SETUSERSTORE_USER_ID: number
  SETUSERSTORE_STORE_ID: number
  SETUSERSTORE_REGUSER_ID: number
  SETUSERSTORE_REGDATE: Date
  SETUSERSTORE_REGIP: string
  SETUSERSTORE_SOURCESTORE: boolean
  SETUSERSTORE_TARGETSTORE: boolean
  SETUSERSTORE_USER?: SetUserDefinition
}
