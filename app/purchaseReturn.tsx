import MyInput from '@/components/Elements/MyInput'
import Layout from '@/components/Layout'
import { useAxios } from '@/hooks/useAxiox'
import { SelectBoxDto } from '@/types/dtos/SelectBoxDto'
import { WebUserDto } from '@/types/dtos/WebUserDto'
import { getDataFromStorage } from '@/utils/asyncStore'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState, useCallback } from 'react'
import { Image, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { V_StockMaster } from '@/types/db/V_StockMaster'
import MyButton from '@/components/Elements/MyButton'
import { icons } from '@/assets/icons'
import useStore from '@/store/useStore'
import MyDropdown from '@/components/Elements/MyDropdown'
import MyDataGrid from '@/components/DataGrid/MyDataGrid'

type DataType = {
  companyName?: string
  companyId?: number
  storeId?: number
}

const PurchaseReturn = () => {
  const router = useRouter()
  const pageData = useStore(state => state.pageData)
  const { axiosGet, axiosPost } = useAxios()
  const [sourceStores, setSourceStore] = useState<SelectBoxDto[]>([])
  const [formState, setFormState] = useState<DataType>({})
  const [stockList, setStockList] = useState<V_StockMaster[]>([])
  const [id, setId] = useState(0)
  const data = useLocalSearchParams()

  const handleUpdateState = (name: keyof DataType, value: any) => {
    if (formState) setFormState({ ...formState, [name]: value })
  }
  useEffect(() => {
    getDataFromStorage('userData').then((str: string | null) => {
      if (!str) return null
      const userData: WebUserDto = JSON.parse(str)
      setSourceStore(userData.sourceStores)
    })
  }, [])

  useEffect(() => {
    if (pageData?.purchaseReturn?.data?.length > 0) {
      setFormState({
        ...formState,
        companyId: pageData?.purchaseReturn?.data[0].ID,
        companyName: pageData?.purchaseReturn?.data[0].COMPANY_NAME
      })
    }
  }, [pageData])

  useFocusEffect(
    useCallback(() => {
      getStoreTransfers() // sayfaya geldi
      return () => { } // sayfadan çıktı
    }, [])
  )

  const getStoreTransfers = () => {
    const today = new Date().toISOString()
    axiosGet({
      path: `/Stock/GetStockMasterListByDate?typeCode=54&startDate=${today}&endDate=${today}`,
      success: data => {
        setStockList(data)
      }
    })
  }

  return (
    <Layout
      headerTitle={data.title as string}
      headerDescription='Lütfen önce sevk edilecek talimatın barkodunu okutun ve ardından stok fişini seçin'
      bottomProps={{
        saveProps: {
          disabled: !formState.storeId || !formState.companyId,
          onPress: async () => {
            axiosPost({
              path: `/Stock/CreateStockMasterForPurchaseReturn?sourceStore=${formState.storeId}&companyId=${formState.companyId}`,
              success: getStoreTransfers
            })
          }
        },
        clearProps: {
          onPress: () => {
            setFormState({})
            setStockList([])
            setId(0)
          }
        }
      }}
    >
      <View style={{ display: 'flex', gap: 10, paddingHorizontal: 16 }}>
        <MyInput
          label={'Firma Seçimi'}
          returnKeyType='done'
          placeholder='186...'
          keyboardType='decimal-pad'
          value={formState.companyName}
          icons={
            <MyButton
              style={{ width: 16, height: 16, marginRight: 16 }}
              onPress={() => {
                router.push('/helper/company-helper')
              }}
            >
              <Image source={icons['search-blue']} style={{ width: 16, height: 16 }} resizeMode='contain' />
            </MyButton>
          }
        />
        <MyDropdown
          data={sourceStores}
          placeholder='Depo Seçiniz'
          label='Kaynak Depo'
          value={formState?.storeId || 0}
          setValue={value => {
            handleUpdateState('storeId', value)
          }}
        />
      </View>
      <MyDataGrid
        deletePath='/Stock/DeleteStockMaster'
        editPage={'purchaseReturn-detail'}
        columns={[
          { dataField: 'STOCKMASTER_DATE', caption: 'Fiş Tarihi', dataType: 'date' },
          { dataField: 'STOCKMASTER_NUMBER', caption: 'Fiş No', dataType: 'number', width: 100 },
          { dataField: 'STOCKMASTER_SOURCESSTORENAME', caption: 'Depo', dataType: 'string' },
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

export default PurchaseReturn
