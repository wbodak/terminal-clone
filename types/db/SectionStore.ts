import { Section } from '../db/Section'

export interface SectionStore {
  ID: number
  SECTIONSTORE_REGUSER_ID: number
  SECTIONSTORE_REGDATE: Date
  SECTIONSTORE_REGIP: string
  SECTIONSTORE_SECTION_ID: number
  SECTIONSTORE_STORE_ID: number
  SECTIONSTORE_SECTION?: Section
}
