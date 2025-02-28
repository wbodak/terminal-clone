import { GroupMaster } from '../db/GroupMaster'

export interface GroupDetail {
  ID: number
  GROUPDETAIL_MASTER_ID: number
  GROUPDETAIL_CODE: string
  GROUPDETAIL_NAME: string
  GROUPDETAIL_ENGLISH?: string
  GROUPDETAIL_GERMANY?: string
  GROUPDETAIL_PARENT: number
  GROUPDETAIL_REGUSER_ID: number
  GROUPDETAIL_REGDATE: Date
  GROUPDETAIL_REGIP: string
  GROUPDETAIL_FORMULE?: string
  GROUPDETAIL_MASTER?: GroupMaster
}
