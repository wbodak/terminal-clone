import { Corporation } from '../db/Corporation'
import { Section } from '../db/Section'
import { ParameterDetail } from '../db/ParameterDetail'
import { Bolster } from '../db/Bolster'
import { MoldDemandMaster } from '../db/MoldDemandMaster'
import { MoldPress } from '../db/MoldPress'
import { PlantDetail } from '../db/PlantDetail'
import { ProductionMaster } from '../db/ProductionMaster'
import { ProductionProgDetail } from '../db/ProductionProgDetail'
import { StockDetail } from '../db/StockDetail'

export interface PlantMaster {
  ID: number
  PLANTMASTER_CORP_ID: number
  PLANTMASTER_NUMBER: number
  PLANTMASTER_NAME: string
  PLANTMASTER_REFNO?: string
  PLANTMASTER_TARGETSTORE_ID: number
  PLANTMASTER_REGUSER_ID: number
  PLANTMASTER_REGDATE: Date
  PLANTMASTER_REGIP: string
  PLANTMASTER_SOURCESTORE_ID: number
  PLANTMASTER_SECTION_ID: number
  PLANTMASTER_GROUP_ID: number
  PLANTMASTER_CORP?: Corporation
  PLANTMASTER_SECTION?: Section
  PLANTMASTER_SOURCESTORE?: ParameterDetail
  PLANTMASTER_TARGETSTORE?: ParameterDetail
  Bolster: Bolster[]
  MoldDemandMaster: MoldDemandMaster[]
  MoldPress: MoldPress[]
  PlantDetail: PlantDetail[]
  ProductionMaster: ProductionMaster[]
  ProductionProgDetail: ProductionProgDetail[]
  StockDetail: StockDetail[]
}
