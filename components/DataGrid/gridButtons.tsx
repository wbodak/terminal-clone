import React from 'react'
import MyButton from '../Elements/MyButton'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'
import { useAxios } from '@/hooks/useAxiox'
import { useGlobalContext } from '@/hooks/useGlobalContext'
import { icons } from '@/assets/icons'
import useStore from '@/store/useStore'

export const DeleteButton = ({ deletePath, masterId, onScuccess, queryParams }: any) => {
  const { axiosDelete } = useAxios()
  const { showDialog } = useGlobalContext()

  let queries = '?'
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      queries += queries.length > 1 ? '&' : '' + `${key}=${value}`
    }
  } else {
    queries = ''
  }
  return (
    <MyButton
      style={{ width: 32, height: 32 }}
      onPress={() => {
        showDialog({
          type: 'danger',
          title: 'Emin misiniz?',
          message: 'Bu kaydı silmek istediğinizden emin misiniz?',
          callback: () => {
            axiosDelete({ path: `${deletePath}/${masterId}${queries}`, success: onScuccess })
          }
        })
      }}
    >
      <Image source={require('../../assets/icons/trash.png')} style={{ width: 28, height: 28 }} />
    </MyButton>
  )
}

export const SelectButton = ({ data }: any) => {
  const gridSelectedElement = useStore(state => state.gridSelectedElement)
  const setGridSelectedElement = useStore(state => state.setGridSelectedElement)

  return (
    <MyButton
      style={{ width: 32, height: 32 }}
      onPress={() => {
        setGridSelectedElement(data.ID, data)
      }}
    >
      {gridSelectedElement[data.ID] ? (
        <Image source={icons['checkbox-check']} style={{ width: 28, height: 28 }} />
      ) : (
        <Image source={icons['checkbox-uncheck']} style={{ width: 28, height: 28 }} />
      )}
    </MyButton>
  )
}

export const EditButton = ({ editPage, data }: any) => {
  const router = useRouter()
  return (
    <MyButton
      style={{ width: 32, height: 32 }}
      onPress={() => {
        router.push({ pathname: editPage, params: data })
      }}
    >
      <Image source={require('../../assets/icons/edit.png')} style={{ width: 28, height: 28 }} />
    </MyButton>
  )
}
