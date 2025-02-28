import { PlantMaster } from '../db/PlantMaster'
import { PlantMachine } from '../db/PlantMachine'

export interface PlantDetail {
  ID: number
  PLANTDETAIL_MASTER_ID: number
  PLANTDETAIL_PLANTMACHINE_ID: number
  PLANTDETAIL_REGUSER_ID: number
  PLANTDETAIL_REGDATE: Date
  PLANTDETAIL_REGIP: string
  PLANTDETAIL_MASTER?: PlantMaster
  PLANTDETAIL_PLANTMACHINE?: PlantMachine
}
