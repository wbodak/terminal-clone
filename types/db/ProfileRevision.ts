import { Profile } from '../db/Profile'

export interface ProfileRevision {
  ID: number
  PROFILEREVISION_NAME: string
  PROFILEREVISION_DATE: Date
  PROFILEREVISION_REGDATE: Date
  PROFILEREVISION_REGIP: string
  PROFILEREVISION_REGUSER_ID: number
  PROFILEREVISION_URL?: string
  PROFILEREVISION_PROFILE_ID: number
  PROFILEREVISION_PROFILE?: Profile
}
