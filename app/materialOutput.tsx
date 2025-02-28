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
  sourceStore?: number
  department?: number
}

const StoreTransfer = () => {
  const { axiosGet, axiosPost } = useAxios()
  const [stores, setStores] = useState<SelectBoxDto[]>([])
  const [department, setDepartman] = useState<any>()

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
  }, [formState])

  useFocusEffect(
    useCallback(() => {
      getStoreTransfers() // sayfaya geldi
      return () => { } // sayfadan çıktı
    }, [])
  )

  useEffect(() => {
    axiosGet({
      path: `/System/GetParameterDetailListByMasterId?masterId=2`,
      success: data => {
        setDepartman(data)
      }
    })
  }, [])

  const transformDepartmentData = (data: any) => {
    return data
      ? data?.map((item: any) => ({
        value: item.ID,
        text: item.PARAMETERDETAIL_NAME
      }))
      : []
  }

  const getStoreTransfers = () => {
    const today = new Date().toISOString()
    axiosGet({
      path: `/Stock/GetStockMasterListByDate?sourceStore=${formState.sourceStore || null}&startDate=${today}&endDate=${today}&typeCode=62`,
      success: data => {
        setStockList(data)
      }
    })
  }
  return (
    <Layout
      headerTitle={data.title as string}
      headerDescription='Açıklama Girilecek'
      bottomProps={{
        saveProps: {
          disabled: !formState.sourceStore || !formState.department,
          onPress: async () => {
            axiosPost({
              path: `/Stock/CreateStockMasterForMaterialOutput?departmentId=${formState.department || 0}&storeId=${formState.sourceStore || 0}`,
              success: () => {
                getStoreTransfers()
              }
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
          placeholder='Kaynak Depo Seçiniz'
          label='Kaynak Depo'
          value={formState?.sourceStore || 0}
          setValue={value => {
            handleUpdateState('sourceStore', value)
          }}
        />
        <MyDropdown
          data={transformDepartmentData(department)}
          placeholder='Departman Seçiniz'
          label='Departman'
          value={formState?.department || 0}
          setValue={value => {
            handleUpdateState('department', value)
          }}
        />
      </View>
      <SectionTitle title={`${data.title} Listesi`} />
      <MyDataGrid
        deletePath='/Stock/DeleteStockMaster'
        editPage={'materialOutput-detail'}
        columns={[
          { dataField: 'STOCKMASTER_DATE', caption: 'Fiş Tarihi', dataType: 'date' },
          { dataField: 'STOCKMASTER_NUMBER', caption: 'Fiş No', dataType: 'number', width: 100 },
          { dataField: 'STOCKMASTER_SOURCESSTORENAME', caption: 'Kaynak Depo', dataType: 'string' },
          { dataField: 'STOCKMASTER_DEPARTMENTNAME', caption: 'Departman', dataType: 'string' },
          { dataField: 'STOCKMASTER_CONFIRM', caption: 'Onaylı', dataType: 'boolean' }
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
            sourceField: 'STOCKMASTER_CONFIRM'
          }
        ]}
      />
    </Layout>
  )
}

export default StoreTransfer
