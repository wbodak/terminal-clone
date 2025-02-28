import { GroupDetail } from '../db/GroupDetail'

export interface GroupMaster {
  ID: number
  GROUPMASTER_CORP_ID: number
  GROUPMASTER_CODE: string
  GROUPMASTER_NAME: string
  GROUPMASTER_GROUP1?: string
  GROUPMASTER_GROUP2?: string
  GROUPMASTER_GROUP3?: string
  GROUPMASTER_GROUP4?: string
  GROUPMASTER_GROUP5?: string
  GROUPMASTER_GROUP6?: string
  GROUPMASTER_TYPE: string
  GROUPMASTER_REGUSER_ID: number
  GROUPMASTER_REGDATE: Date
  GROUPMASTER_REGIP: string
  GROUPMASTER_GROUP7?: string
  GROUPMASTER_GROUP8?: string
  GROUPMASTER_GROUP9?: string
  GROUPMASTER_GROUP10?: string
  GROUPMASTER_GROUP11?: string
  GROUPMASTER_GROUP12?: string
  GroupDetail: GroupDetail[]
}
