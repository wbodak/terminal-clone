import { Mold } from '../db/Mold'
import { ProfileCorp } from '../db/ProfileCorp'
import { ProfileImage } from '../db/ProfileImage'
import { ProfileInsulation } from '../db/ProfileInsulation'
import { ProfileRevision } from '../db/ProfileRevision'
import { ProfileSpec } from '../db/ProfileSpec'

export interface Profile {
  ID: number
  PROFILE_CORP_ID: number
  PROFILE_NUMBER: string
  PROFILE_NAME: string
  PROFILE_GROUP_ID: number
  PROFILE_REGUSER_ID: number
  PROFILE_REGIP: string
  PROFILE_REGDATE: Date
  PROFILE_GRAMMAGE: number
  PROFILE_THICKNESS: number
  PROFILE_PERIMETER: number
  PROFILE_AREA: number
  PROFILE_BUSBAR: number
  PROFILE_COMPANY_ID?: number
  PROFILE_DESCRIPTION?: string
  PROFILE_BARCODE: number
  PROFILE_INSULATION: boolean
  PROFILE_PASSIVE: boolean
  PROFILE_MECHANICALPROCESS: boolean
  PROFILE_ANODIZEDGRAMMAGE: number
  PROFILE_PAINTEDGRAMMAGE: number
  PROFILE_MEASUREMENT_ID?: number
  PROFILE_DUVALUE: number
  PROFILE_FORMFACTOR: number
  PROFILE_COMPANYREFNO?: string
  PROFILE_PRIVATE: boolean
  PROFILE_ASSEMBLY: boolean
  PROFILE_INPERIMETER: number
  Mold: Mold[]
  ProfileCorp: ProfileCorp[]
  ProfileImage: ProfileImage[]
  ProfileInsulationPROFILEINSULATION_MASTER: ProfileInsulation[]
  ProfileInsulationPROFILEINSULATION_PROFILE: ProfileInsulation[]
  ProfileRevision: ProfileRevision[]
  ProfileSpec: ProfileSpec[]
}
