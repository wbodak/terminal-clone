import { SetUserDefinition } from '../db/SetUserDefinition'

export interface UserPermission {
  ID: number
  USERPERMISSION_PERMISSION_ID: number
  USERPERMISSION_REGUSER_ID: number
  USERPERMISSION_REGIP: string
  USERPERMISSION_REGDATE: Date
  USERPERMISSION_USER_ID: number
  USERPERMISSION_USER?: SetUserDefinition
}
