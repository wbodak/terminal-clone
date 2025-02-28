import { SetMenuDetail } from '../db/SetMenuDetail'
import { SetMenuMaster } from '../db/SetMenuMaster'

export interface SetMenuMasterDto extends SetMenuMaster {
  SetMenuDetailGroups: SetMenuDetail[][]
}
