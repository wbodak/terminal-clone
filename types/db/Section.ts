import { PlantMaster } from '../db/PlantMaster'
import { ProductionMaster } from '../db/ProductionMaster'
import { ProductionProgMaster } from '../db/ProductionProgMaster'
import { SectionStore } from '../db/SectionStore'

export interface Section {
  ID: number
  SECTION_REGUSER_ID: number
  SECTION_REGDATE: Date
  SECTION_REGIP: string
  SECTION_CODE: string
  SECTION_NAME: string
  SECTION_ADDRESS?: string
  SECTION_TEL?: string
  SECTION_FAX?: string
  SECTION_REGISTERNO?: string
  PlantMaster: PlantMaster[]
  ProductionMaster: ProductionMaster[]
  ProductionProgMaster: ProductionProgMaster[]
  SectionStore: SectionStore[]
}
