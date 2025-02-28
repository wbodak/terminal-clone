export interface Notification {
  ID: number
  TITLE: string
  SUBTITLE: string
  USER_ID: number
  DATETIME: Date
  ISREAD: boolean
  CORP_ID: number
  URL?: string
}
