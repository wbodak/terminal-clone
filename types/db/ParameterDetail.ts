import { ParameterMaster } from '../db/ParameterMaster'
import { Calendar } from '../db/Calendar'
import { PlantMaster } from '../db/PlantMaster'
import { SetPermissionMaster } from '../db/SetPermissionMaster'

export interface ParameterDetail {
  ID: number
  PARAMETERDETAIL_MASTER_ID: number
  PARAMETERDETAIL_CODE: string
  PARAMETERDETAIL_NAME: string
  PARAMETERDETAIL_ENGLISH?: string
  PARAMETERDETAIL_GERMANY?: string
  PARAMETERDETAIL_VALUE1?: number
  PARAMETERDETAIL_VALUE2?: string
  PARAMETERDETAIL_VALUE3?: string
  PARAMETERDETAIL_VALUE4?: string
  PARAMETERDETAIL_REGUSER_ID: number
  PARAMETERDETAIL_REGDATE: Date
  PARAMETERDETAIL_REGIP: string
  PARAMETERDETAIL_PASSIVE: boolean
  PARAMETERDETAIL_GROUP_ID?: number
  PARAMETERDETAIL_MASTER?: ParameterMaster
  Calendar: Calendar[]
  PlantMasterPLANTMASTER_SOURCESTORE: PlantMaster[]
  PlantMasterPLANTMASTER_TARGETSTORE: PlantMaster[]
  SetPermissionMaster: SetPermissionMaster[]
}
