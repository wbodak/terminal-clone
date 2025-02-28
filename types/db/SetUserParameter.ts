import { ParameterMaster } from '../db/ParameterMaster'
import { SetUserDefinition } from '../db/SetUserDefinition'

export interface SetUserParameter {
  ID: number
  SETUSERPARAMETER_MASTER_ID: number
  SETUSERPARAMETER_USER_ID: number
  SETUSERPARAMETER_REGDATE: Date
  SETUSERPARAMETER_REGIP: string
  SETUSERPARAMETER_REGUSER_ID: number
  SETUSERPARAMETER_MASTER?: ParameterMaster
  SETUSERPARAMETER_USER?: SetUserDefinition
}
