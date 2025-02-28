export interface Document {
  ID: number
  DOCUMENT_DESC: string
  DOCUMENT_PATH: string
  DOCUMENT_SEQUENCE: number
  DOCUMENT_REGDATE: Date
  DOCUMENT_REGUSER_ID: number
  DOCUMENT_REGIP: string
  DOCUMENT_LINK: string
  DOCUMENT_REF_ID: number
  DOCUMENT_FIELD?: string
}
