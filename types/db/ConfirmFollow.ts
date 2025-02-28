import { ConfirmDefinitionDetail } from '../db/ConfirmDefinitionDetail'
import { SetUserDefinition } from '../db/SetUserDefinition'

export interface ConfirmFollow {
  CONFIRMFOLLOW_GUID: string
  CONFIRMFOLLOW_DEFINITIONDETAIL_ID: number
  CONFIRMFOLLOW_SEQUENCE: number
  CONFIRMFOLLOW_BODY: string
  CONFIRMFOLLOW_USER_ID: number
  CONFIRMFOLLOW_INFO: boolean
  CONFIRMFOLLOW_LINK: string
  CONFIRMFOLLOW_REF_ID: number
  CONFIRMFOLLOW_SENT: boolean
  CONFIRMFOLLOW_TITLE: string
  CONFIRMFOLLOW_CONFIRM: number
  CONFIRMFOLLOW_CONFIRMDATE?: Date
  CONFIRMFOLLOW_CONFIRMDESC?: string
  CONFIRMFOLLOW_SENDDATE?: Date
  CONFIRMFOLLOW_NUMBER: number
  CONFIRMFOLLOW_DEFINITIONDETAIL?: ConfirmDefinitionDetail
  CONFIRMFOLLOW_USER?: SetUserDefinition
}
