import { Corporation } from '../db/Corporation'
import { PlantDetail } from '../db/PlantDetail'

export interface PlantMachine {
  ID: number
  PLANTMACHINE_CORP_ID: number
  PLANTMACHINE_NUMBER: number
  PLANTMACHINE_NAME: string
  PLANTMACHINE_REFNO?: string
  PLANTMACHINE_SERIAL?: string
  PLANTMACHINE_MODEL?: string
  PLANTMACHINE_MODELYEAR?: number
  PLANTMACHINE_CAPACITY?: number
  PLANTMACHINE_CAPACITYUNIT_ID?: number
  PLANTMACHINE_ELECTRIC?: number
  PLANTMACHINE_GAS?: number
  PLANTMACHINE_REGUSER_ID: number
  PLANTMACHINE_REGDATE: Date
  PLANTMACHINE_REGIP: string
  PLANTMACHINE_CORP?: Corporation
  PlantDetail: PlantDetail[]
}
