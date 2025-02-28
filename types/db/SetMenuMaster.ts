import { SetMenuDetail } from '../db/SetMenuDetail'

export interface SetMenuMaster {
  ID: number
  SETMENUMASTER_TITLE: string
  SETMENUMASTER_ORDER: number
  SETMENUMASTER_REGUSER_ID: number
  SETMENUMASTER_REGDATE: Date
  SETMENUMASTER_REGIP: string
  SETMENUMASTER_PASSIVE: boolean
  SETMENUMASTER_ICON: string
  SETMENUMASTER_TYPE: string
  SetMenuDetail: SetMenuDetail[]
}
