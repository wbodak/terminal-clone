import { Calendar } from '../db/Calendar'
import { CalendarNote } from '../db/CalendarNote'
import { CalendarUser } from '../db/CalendarUser'
import { ConfirmDefinitionDetail } from '../db/ConfirmDefinitionDetail'
import { ConfirmFollow } from '../db/ConfirmFollow'
import { SetUserCorporation } from '../db/SetUserCorporation'
import { SetUserDepartment } from '../db/SetUserDepartment'
import { SetUserParameter } from '../db/SetUserParameter'
import { SetUserStore } from '../db/SetUserStore'
import { UserPermission } from '../db/UserPermission'
import { WallComment } from '../db/WallComment'
import { WallItem } from '../db/WallItem'

export interface SetUserDefinition {
  ID: number
  SETUSERDEFINITION_REGUSER_ID: number
  SETUSERDEFINITION_REGDATE: Date
  SETUSERDEFINITION_REGIP: string
  SETUSERDEFINITION_PERSON_ID?: number
  SETUSERDEFINITION_USERNAME: string
  SETUSERDEFINITION_USERPASS: string
  SETUSERDEFINITION_USERGROUP_ID: number
  SETUSERDEFINITION_ADMIN: boolean
  SETUSERDEFINITION_ENTERDATE?: Date
  SETUSERDEFINITION_EXITDATE?: Date
  SETUSERDEFINITION_NAME: string
  SETUSERDEFINITION_SURNAME: string
  SETUSERDEFINITION_REPRESENTATIVE: boolean
  SETUSERDEFINITION_DEPARTMENT_ID: number
  SETUSERDEFINITION_EMAIL?: string
  SETUSERDEFINITION_IMAGE?: string
  Calendar: Calendar[]
  CalendarNote: CalendarNote[]
  CalendarUser: CalendarUser[]
  ConfirmDefinitionDetail: ConfirmDefinitionDetail[]
  ConfirmFollow: ConfirmFollow[]
  SetUserCorporation: SetUserCorporation[]
  SetUserDepartment: SetUserDepartment[]
  SetUserParameter: SetUserParameter[]
  SetUserStore: SetUserStore[]
  UserPermission: UserPermission[]
  WallComment: WallComment[]
  WallItemCREATEUSER: WallItem[]
  WallItemREGUSER: WallItem[]
}
