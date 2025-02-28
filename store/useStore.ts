import { create } from 'zustand'

export interface AppState {
  pageData: Record<string, any>
  setPageData: (key: string, newData: any) => void
  gridSelectedElement: Record<any, any>
  setGridSelectedElement: (key: any, newData: any) => void
}

const useStore = create<AppState>(set => ({
  pageData: {},
  setPageData: (key, newData) =>
    set(state => {
      return { pageData: { ...state.pageData, [key]: newData } }
    }),
  gridSelectedElement: {},
  setGridSelectedElement: (key, newData) => {
    set(state => {
      let temp = { ...state.gridSelectedElement }
      if (temp[key]) {
        temp = {}
      } else {
        temp = { [key]: newData }
      }
      return { gridSelectedElement: temp }
    })
  }
}))

export default useStore
