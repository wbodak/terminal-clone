import { Corporation } from '../db/Corporation'
import { Section } from '../db/Section'
import { ProductionProgDetail } from '../db/ProductionProgDetail'

export interface ProductionProgMaster {
  ID: number
  PRODUCTIONPROGMASTER_CORP_ID: number
  PRODUCTIONPROGMASTER_SECTION_ID: number
  PRODUCTIONPROGMASTER_YEAR: number
  PRODUCTIONPROGMASTER_NUMBER: number
  PRODUCTIONPROGMASTER_DATE: Date
  PRODUCTIONPROGMASTER_CONFIRM: boolean
  PRODUCTIONPROGMASTER_REGUSER_ID: number
  PRODUCTIONPROGMASTER_REGDATE: Date
  PRODUCTIONPROGMASTER_REGIP: string
  PRODUCTIONPROGMASTER_PLANT_ID: number
  PRODUCTIONPROGMASTER_SERIAL_ID: number
  PRODUCTIONPROGMASTER_CLOSED: boolean
  PRODUCTIONPROGMASTER_CORP?: Corporation
  PRODUCTIONPROGMASTER_SECTION?: Section
  ProductionProgDetail: ProductionProgDetail[]
}
