import { Profile } from '../db/Profile'

export interface ProfileCorp {
  ID: number
  PROFILECORP_PROFILE_ID: number
  PROFILECORP_CORP_ID: number
  PROFILECORP_REGDATE: Date
  PROFILECORP_REGIP: string
  PROFILECORP_REGUSER_ID: number
  PROFILECORP_PROFILE?: Profile
}
