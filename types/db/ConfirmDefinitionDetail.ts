import { ConfirmDefinition } from '../db/ConfirmDefinition'
import { SetUserDefinition } from '../db/SetUserDefinition'
import { ConfirmFollow } from '../db/ConfirmFollow'

export interface ConfirmDefinitionDetail {
  ID: number
  CONFIRMDEFINITIONDETAIL_MASTER_ID: number
  CONFIRMDEFINITIONDETAIL_USER_ID: number
  CONFIRMDEFINITIONDETAIL_SEQUENCE: number
  CONFIRMDEFINITIONDETAIL_PASSIVE: boolean
  CONFIRMDEFINITIONDETAIL_INFO: boolean
  CONFIRMDEFINITIONDETAIL_REGDATE: Date
  CONFIRMDEFINITIONDETAIL_REGIP: string
  CONFIRMDEFINITIONDETAIL_REGUSER_ID: number
  CONFIRMDEFINITIONDETAIL_MASTER?: ConfirmDefinition
  CONFIRMDEFINITIONDETAIL_USER?: SetUserDefinition
  ConfirmFollow: ConfirmFollow[]
}
