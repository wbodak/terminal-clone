import { Exchange } from '../db/Exchange'
import { SetMenuMasterDto } from './SetMenuMasterDto'
import { SetMenuMaster } from '../db/SetMenuMaster'
import { ModuleParameter } from '../db/ModuleParameter'
import { SelectBoxDto } from './SelectBoxDto'

export interface WebUserDto {
  id?: number
  corpName?: string
  sectionName?: string
  sectionId: number
  corpId: number
  year: number
  token?: string
  nameSurname?: string
  userName?: string
  image?: string
  userGroupName?: string
  admin: boolean
  departmentId?: string
  exchangeList: Exchange[]
  setMenuMasterList: SetMenuMasterDto[]
  favorites: SetMenuMaster[]
  moduleParameterList: ModuleParameter[]
  targetStores: SelectBoxDto[]
  sourceStores: SelectBoxDto[]
}
