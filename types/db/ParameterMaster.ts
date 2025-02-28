import { ParameterDetail } from '../db/ParameterDetail'
import { SetUserParameter } from '../db/SetUserParameter'

export interface ParameterMaster {
  ID: number
  PARAMETERMASTER_NAME: string
  PARAMETERMASTER_REGUSER_ID: number
  PARAMETERMASTER_REGDATE: Date
  PARAMETERMASTER_REGIP: string
  PARAMETERMASTER_GROUP_ID?: number
  ParameterDetail: ParameterDetail[]
  SetUserParameter: SetUserParameter[]
}
