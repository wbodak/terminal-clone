import { PlantMaster } from '../db/PlantMaster'
import { Section } from '../db/Section'
import { ProductionDetail } from '../db/ProductionDetail'
import { ProductionMold } from '../db/ProductionMold'
import { ProductionStop } from '../db/ProductionStop'

export interface ProductionMaster {
  ID: number
  PRODUCTIONMASTER_REGUSER_ID: number
  PRODUCTIONMASTER_REGDATE: Date
  PRODUCTIONMASTER_REGIP: string
  PRODUCTIONMASTER_CORP_ID: number
  PRODUCTIONMASTER_SECTION_ID: number
  PRODUCTIONMASTER_YEAR: number
  PRODUCTIONMASTER_SHIFT_ID: number
  PRODUCTIONMASTER_PLANTMASTER_ID: number
  PRODUCTIONMASTER_DATE: Date
  PRODUCTIONMASTER_NUMBER: number
  PRODUCTIONMASTER_USER_ID: number
  PRODUCTIONMASTER_CONFIRM: boolean
  PRODUCTIONMASTER_EMPLOYEES: number
  PRODUCTIONMASTER_HOURS: number
  PRODUCTIONMASTER_PLANTMASTER?: PlantMaster
  PRODUCTIONMASTER_SECTION?: Section
  ProductionDetail: ProductionDetail[]
  ProductionMold: ProductionMold[]
  ProductionStop: ProductionStop[]
}
