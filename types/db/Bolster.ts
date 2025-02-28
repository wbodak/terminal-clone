import { PlantMaster } from '../db/PlantMaster'
import { Mold } from '../db/Mold'

export interface Bolster {
  ID: number
  BOLSTER_REGUSER_ID: number
  BOLSTER_REGDATE: Date
  BOLSTER_REGIP: string
  BOLSTER_CODE: string
  BOLSTER_NAME: string
  BOLSTER_PLANTMASTER_ID: number
  BOLSTER_PATH: string
  BOLSTER_CORP_ID: number
  BOLSTER_PLANTMASTER?: PlantMaster
  MoldMOLD_BOLSTER: Mold[]
  MoldMOLD_BOLSTER2: Mold[]
}
