import { Profile } from '../db/Profile'

export interface ProfileImage {
  ID: number
  PROFILEIMAGE_TYPE_ID: number
  PROFILEIMAGE_REFNO?: string
  PROFILEIMAGE_COMPANYREFNO?: string
  PROFILEIMAGE_REGDATE: Date
  PROFILEIMAGE_REGIP: string
  PROFILEIMAGE_REGUSER_ID: number
  PROFILEIMAGE_URL?: string
  PROFILEIMAGE_PROFILE_ID: number
  PROFILEIMAGE_DURATION?: number
  PROFILEIMAGE_PASSIVE: boolean
  PROFILEIMAGE_PROFILE?: Profile
}
