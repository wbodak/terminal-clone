import { SetUserDefinition } from '../db/SetUserDefinition'

export interface SetUserDepartment {
  ID: number
  SETUSERDEPARTMENT_USER_ID: number
  SETUSERDEPARTMENT_DEPARTMENT_ID: number
  SETUSERDEPARTMENT_REGUSER_ID: number
  SETUSERDEPARTMENT_REGDATE: Date
  SETUSERDEPARTMENT_REGIP: string
  SETUSERDEPARTMENT_USER?: SetUserDefinition
}
