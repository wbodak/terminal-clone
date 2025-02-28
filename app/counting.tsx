import MyDataGrid from '@/components/DataGrid/MyDataGrid'
import MyDropdown from '@/components/Elements/MyDropdown'
import Layout from '@/components/Layout'
import SectionTitle from '@/components/SectionTitle'
import { useAxios } from '@/hooks/useAxiox'
import { SelectBoxDto } from '@/types/dtos/SelectBoxDto'
import { WebUserDto } from '@/types/dtos/WebUserDto'
import { getDataFromStorage } from '@/utils/asyncStore'
import { transformSelctBoxData } from '@/utils/helper'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState, useCallback } from 'react'
import { View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { V_StockMaster } from '@/types/db/V_StockMaster'

type DataType = {
  store?: number
}

const Counting = () => {
  const { axiosGet, axiosPost } = useAxios()
  const [stores, setStores] = useState<SelectBoxDto[]>([])
  const [formState, setFormState] = useState<DataType>({})
  const [stockList, setStockList] = useState<V_StockMaster[]>([])
  const data = useLocalSearchParams()

  const handleUpdateState = (name: keyof DataType, value: any) => {
    if (formState) setFormState({ ...formState, [name]: value })
  }

  useEffect(() => {
    getDataFromStorage('userData').then((str: string | null) => {
      if (!str) return null
      const userData: WebUserDto = JSON.parse(str)
      setStores(userData.sourceStores)
    })
  }, [])

  useEffect(() => {
    getStoreTransfers()
  }, [])

  const getStoreTransfers = () => {
    const today = new Date().toISOString()
    axiosGet({
      path: `/Stock/GetCountMasterListByDate?startDate=${today}&endDate=${today}`,
      success: data => {
        setStockList(data)
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
      getStoreTransfers() // sayfaya geldi
      return () => {} // sayfadan çıktı
    }, [])
  )

  return (
    <Layout
      headerTitle={data.title as string}
      headerDescription='Açıklama Girilecek'
      bottomProps={{
        saveProps: {
          disabled: !formState.store,
          onPress: async () => {
            axiosPost({
              path: `/Stock/SaveCountMaster`,
              body: { COUNTMASTER_DATE: new Date().toISOString(), COUNTMASTER_STORE_ID: formState.store },
              success: getStoreTransfers
            })
          }
        },
        clearProps: {
          onPress: () => {
            setFormState({})
            setStockList([])
          }
        }
      }}
    >
      <View style={{ display: 'flex', gap: 10, paddingHorizontal: 16 }}>
        <MyDropdown
          data={transformSelctBoxData(stores)}
          placeholder='Depo Seçiniz'
          label='Depo'
          value={formState?.store || 0}
          setValue={value => {
            handleUpdateState('store', value)
          }}
        />
      </View>
      <SectionTitle title={`${data.title} Listesi`} />
      <MyDataGrid
        deletePath='/Stock/DeleteCountMaster'
        editPage={'counting-detail'}
        columns={[
          { dataField: 'COUNTMASTER_DATE', caption: 'Tarih', dataType: 'date' },
          { dataField: 'COUNTMASTER_STORENAME', caption: 'Depo', dataType: 'string' },
          { dataField: 'COUNTMASTER_CONFIRM', caption: 'Onaylı', dataType: 'boolean' }
        ]}
        data={stockList}
        updateData={setStockList}
        editPageFields={[
          {
            targetField: 'masterId',
            sourceField: 'ID'
          },
          {
            targetField: 'isApproved',
            sourceField: 'COUNTMASTER_CONFIRM'
          }
        ]}
      />
    </Layout>
  )
}

export default Counting
