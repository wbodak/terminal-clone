import { SetUserDefinition } from '../db/SetUserDefinition'

export interface SetUserCorporation {
  ID: number
  SETUSERCORPORATION_USER_ID: number
  SETUSERCORPORATION_CORP_ID: number
  SETUSERCORPORATION_SECTION_ID: number
  SETUSERCORPORATION_REGUSER_ID: number
  SETUSERCORPORATION_REGDATE: Date
  SETUSERCORPORATION_REGIP: string
  SETUSERCORPORATION_USER?: SetUserDefinition
}
