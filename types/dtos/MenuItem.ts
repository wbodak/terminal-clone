import { SetMenuDetail } from '../db/SetMenuDetail'

export type MenuItem = {
  name: string
  list: DetailMenuItem[]
}

export interface DetailMenuItem extends SetMenuDetail {
  color: string
}
