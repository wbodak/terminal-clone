import { ConfirmDefinitionDetail } from '../db/ConfirmDefinitionDetail'

export interface ConfirmDefinition {
  ID: number
  CONFIRMDEFINITION_CORP_ID: number
  CONFIRMDEFINITION_SEQUENCE: number
  CONFIRMDEFINITION_BODY: string
  CONFIRMDEFINITION_PASSIVE: boolean
  CONFIRMDEFINITION_REGUSER_ID: number
  CONFIRMDEFINITION_REGDATE: Date
  CONFIRMDEFINITION_REGIP: string
  CONFIRMDEFINITION_FIELD: string
  CONFIRMDEFINITION_TITLE: string
  CONFIRMDEFINITION_LINK: string
  CONFIRMDEFINITION_PATH?: string
  CONFIRMDEFINITION_CONTROLQUERY?: string
  ConfirmDefinitionDetail: ConfirmDefinitionDetail[]
}
