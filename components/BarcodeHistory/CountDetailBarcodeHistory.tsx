import React, { useEffect, useState } from 'react'
import { useAxios } from '@/hooks/useAxiox'
import Layout from '@/components/Layout'
import MyButton from '@/components/Elements/MyButton'
import { View } from 'react-native'
import MyText from '@/components/Elements/MyText'
import MyDataGrid from '../DataGrid/MyDataGrid'
import { V_CountDetail } from '@/types/db/V_CountDetail'

type Props = {
  masterId: number
}

const CountDetailBarcodeHistory = ({ masterId }: Props) => {
  const { axiosGet } = useAxios()

  const [history, setHistory] = useState<V_CountDetail[]>([])
  const [tabIndex, steTabIndex] = useState(0)

  useEffect(() => {
    axiosGet({
      path: `/Stock/GetCountDetailListByMasterId?masterId=${masterId}`,
      success: data => {
        setHistory(data)
      }
    })
  }, [])

  return (
    <Layout headerTitle='Barkod Geçmişi' showSubTitle={false}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          gap: 10,
          marginBottom: 16,
          paddingHorizontal: 16
        }}
      >
        <MyButton
          containerStyle={{
            flex: 1,
            borderBottomColor: tabIndex == 0 ? '#0A4A84' : 'transparent',
            borderBottomWidth: 2
          }}
          onPress={() => {
            steTabIndex(0)
          }}
        >
          <MyText>Sayım Detayı (Profil)</MyText>
        </MyButton>
        <MyButton
          containerStyle={{
            flex: 1,
            borderBottomColor: tabIndex == 1 ? '#0A4A84' : 'transparent',
            borderBottomWidth: 2
          }}
          onPress={() => {
            steTabIndex(1)
          }}
        >
          <MyText>Sayım Detayı (Diğer)</MyText>
        </MyButton>
      </View>

      {tabIndex == 0 ? (
        <MyDataGrid
          columns={[
            { dataField: 'COUNTDETAIL_BARCODE_ID', caption: 'Barkod', dataType: 'string' },
            { dataField: 'COUNTDETAIL_ITEMNAME', caption: 'Ürün Adı', dataType: 'string', width: 280 },
            { dataField: 'COUNTDETAIL_PROFILENUMBER', caption: 'Profil', dataType: 'string' },
            { dataField: 'COUNTDETAIL_COLORNAME', caption: 'Renk', dataType: 'string' },
            { dataField: 'COUNTDETAIL_SURFACENAME', caption: 'Yüzey', dataType: 'string' },
            { dataField: 'COUNTDETAIL_ALLOYNAME', caption: 'Alaşım', dataType: 'string' },
            { dataField: 'COUNTDETAIL_HARDNESSNAME', caption: 'Sertlik', dataType: 'string' },
            { dataField: 'COUNTDETAIL_PIECE', caption: 'Adet', dataType: 'number' },
            { dataField: 'COUNTDETAIL_QUANTITY', caption: 'Miktar', dataType: 'number' },
            { dataField: 'COUNTDETAIL_UNITCODE', caption: 'Birim', dataType: 'number' }
          ]}
          data={history.filter(x => x.COUNTDETAIL_PROFILENUMBER)}
        />
      ) : (
        <MyDataGrid
          columns={[
            { dataField: 'COUNTDETAIL_BARCODE_ID', caption: 'Barkod', dataType: 'string' },
            { dataField: 'COUNTDETAIL_ITEMNAME', caption: 'Ürün Adı', dataType: 'string', width: 280 },
            { dataField: 'COUNTDETAIL_LENGTH', caption: 'Boy', dataType: 'number' },
            { dataField: 'COUNTDETAIL_PIECE', caption: 'Adet', dataType: 'number' },
            { dataField: 'COUNTDETAIL_QUANTITY', caption: 'Miktar', dataType: 'number' },
            { dataField: 'COUNTDETAIL_UNITCODE', caption: 'Birim', dataType: 'number' }
          ]}
          data={history.filter(x => !x.COUNTDETAIL_PROFILENUMBER)}
        />
      )}
    </Layout>
  )
}

export default CountDetailBarcodeHistory
