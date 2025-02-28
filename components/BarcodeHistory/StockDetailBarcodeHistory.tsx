import React, { useEffect, useState } from 'react'
import { useAxios } from '@/hooks/useAxiox'
import { V_StockDetail } from '@/types/db/V_StockDetail'
import Layout from '@/components/Layout'
import MyButton from '@/components/Elements/MyButton'
import { View } from 'react-native'
import MyText from '@/components/Elements/MyText'
import MyDataGrid from '../DataGrid/MyDataGrid'

type Props = {
  masterId: number
}

const StockDetailBarcodeHistory = ({ masterId }: Props) => {
  const { axiosGet } = useAxios()

  const [history, setHistory] = useState<V_StockDetail[]>([])
  const [tabIndex, steTabIndex] = useState(0)

  useEffect(() => {
    axiosGet({
      path: `/Stock/GetStockDetailListByMasterId?masterId=${masterId}`,
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
          <MyText>Stok Detayı (Profil)</MyText>
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
          <MyText>Stok Detayı (Diğer)</MyText>
        </MyButton>
      </View>

      {tabIndex == 0 ? (
        <MyDataGrid
          columns={[
            { dataField: 'STOCKDETAIL_BARCODE_ID', caption: 'Barkod', dataType: 'string' },
            { dataField: 'STOCKDETAIL_ITEMNAME', caption: 'Ürün Adı', dataType: 'string', width: 280 },
            { dataField: 'STOCKDETAIL_PROFILENUMBER', caption: 'Profil', dataType: 'string' },
            { dataField: 'STOCKDETAIL_COLORNAME', caption: 'Renk', dataType: 'string' },
            { dataField: 'STOCKDETAIL_SURFACENAME', caption: 'Yüzey', dataType: 'string' },
            { dataField: 'STOCKDETAIL_ALLOYNAME', caption: 'Alaşım', dataType: 'string' },
            { dataField: 'STOCKDETAIL_HARDNESSNAME', caption: 'Sertlik', dataType: 'string' },
            { dataField: 'STOCKDETAIL_LENGTH', caption: 'Boy', dataType: 'number' },
            { dataField: 'STOCKDETAIL_PIECE', caption: 'Adet', dataType: 'number' },
            { dataField: 'STOCKDETAIL_QUANTITY', caption: 'Miktar', dataType: 'number' },
            { dataField: 'STOCKDETAIL_UNITCODE', caption: 'Birim', dataType: 'number' },
            { dataField: 'STOCKDETAIL_DIAMETER', caption: 'Çap', dataType: 'number' }
          ]}
          data={history.filter(x => x.STOCKDETAIL_PROFILE_ID)}
        />
      ) : (
        <MyDataGrid
          columns={[
            { dataField: 'STOCKDETAIL_BARCODE_ID', caption: 'Barkod', dataType: 'string' },
            { dataField: 'STOCKDETAIL_ITEMNAME', caption: 'Ürün Adı', dataType: 'string', width: 280 },
            { dataField: 'STOCKDETAIL_LENGTH', caption: 'Boy', dataType: 'number' },
            { dataField: 'STOCKDETAIL_PIECE', caption: 'Adet', dataType: 'number' },
            { dataField: 'STOCKDETAIL_QUANTITY', caption: 'Miktar', dataType: 'number' },
            { dataField: 'STOCKDETAIL_UNITCODE', caption: 'Birim', dataType: 'number' },
            { dataField: 'STOCKDETAIL_DIAMETER', caption: 'Çap', dataType: 'number' }
          ]}
          data={history.filter(x => !x.STOCKDETAIL_PROFILE_ID)}
        />
      )}
    </Layout>
  )
}

export default StockDetailBarcodeHistory
