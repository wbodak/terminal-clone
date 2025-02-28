import MyInput from '@/components/Elements/MyInput'
import Layout from '@/components/Layout'
import { useAxios } from '@/hooks/useAxiox'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View } from 'react-native'
import InputBarcode from '@/components/FormElements/InputBarcode'
import MyNumberInput from '@/components/Elements/MyNumberInput'
import { V_StockDetail } from '@/types/db/V_StockDetail'
import { onPieceChanged } from '@/utils/gridCalcMethods'

interface DataType extends V_StockDetail {
  STOCKDETAIL_TOTALQUANTITY?: number
}

const PurchaseReturnDetail = () => {
  const router = useRouter()
  const { axiosGet, axiosPost, axiosDelete, axiosPatch } = useAxios()
  const data = useLocalSearchParams()
  const [formState, setFormState] = useState<DataType>()
  const [isApproved, setIsApproved] = useState<boolean>()

  const handleUpdateState = (name: keyof DataType, value: any) => {
    if (formState) setFormState({ ...formState, [name]: value })
    else setFormState({ [name]: value } as any)
  }

  const isNewRecord = formState?.STOCKDETAIL_REGUSER_ID == 0

  return (
    <Layout
      headerTitle='Satıcı İade Detayı'
      showSubTitle={false}
      bottomProps={{
        isApproved: isApproved ?? data.isApproved == 'true',
        saveProps: {
          disabled: !isNewRecord || !formState?.STOCKDETAIL_BARCODE_ID,
          onPress: async () => {
            if (formState?.STOCKDETAIL_BARCODE_ID)
              axiosPost({
                path: `/Stock/CreateStockDetailForPurchaseReturn?barcode=${formState?.STOCKDETAIL_BARCODE_ID}&quantity=${formState.STOCKDETAIL_QUANTITY}&stockMasterId=${data.masterId}&piece=${formState.STOCKDETAIL_PIECE}`,
                success: data => {
                  setFormState(undefined)
                }
              })
          }
        },
        clearProps: {
          onPress: () => {
            setFormState(undefined)
          }
        },
        deleteProps: {
          disabled: !formState?.ID,
          onPress: () => {
            if (formState?.ID) {
              axiosDelete({ path: `/Stock/DeleteStockDetail/${formState?.ID}`, success: () => setFormState(undefined) })
            }
          }
        },
        approveProps: {
          onPress: () => {
            axiosPatch({
              path: `/Stock/ConfirmStockMaster?id=${data.masterId}&value=true`,
              success: data => {
                setIsApproved(true)
              }
            })
          }
        },
        approveCancelProps: {
          onPress: () => {
            axiosPatch({
              path: `/Stock/ConfirmStockMaster?id=${data.masterId}&value=false`,
              success: data => {
                setIsApproved(false)
              }
            })
          }
        },
        historyProps: {
          onPress: () => {
            router.push({
              pathname: '/barcode-history',
              params: { masterId: data.masterId, type: 'stock', isApproved: isApproved ? 'true' : 'false' }
            })
          }
        }
      }}
    >
      <View style={{ display: 'flex', gap: 10, paddingHorizontal: 16 }}>
        <InputBarcode
          value={String(formState?.STOCKDETAIL_BARCODE_ID ?? '')}
          readOnly={isNewRecord}
          onChangeText={x => {
            handleUpdateState('STOCKDETAIL_BARCODE_ID', x)
          }}
          onClearButton={() => handleUpdateState('STOCKDETAIL_BARCODE_ID', undefined)}
          onSearchButton={() => {
            if (formState?.STOCKDETAIL_BARCODE_ID)
              axiosGet({
                path: `/Stock/GetStockDetail?barcode=${formState.STOCKDETAIL_BARCODE_ID}&stockMasterId=${data.masterId}`,
                success: (data: any) => {
                  setFormState(data)
                },
                error: () => {
                  handleUpdateState('STOCKDETAIL_BARCODE_ID', undefined)
                }
              })
          }}
        />
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10 }}>
          <MyInput
            label={'Ürün Tanımı'}
            readOnly
            containerStyle={{ flex: 1 }}
            returnKeyType='next'
            value={formState?.STOCKDETAIL_ITEMNAME}
          />
          {formState?.STOCKDETAIL_ISPROFILE && (
            <MyInput
              label={'Profil'}
              readOnly
              containerStyle={{ width: '35%' }}
              returnKeyType='next'
              value={formState?.STOCKDETAIL_PROFILENUMBER}
            />
          )}
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10 }}>
          <MyInput
            label={'Depo Adı'}
            readOnly
            returnKeyType='next'
            containerStyle={{ flex: 1 }}
            value={formState?.STOCKDETAIL_STORENAME}
          />
          <MyInput
            label={'Birim'}
            readOnly
            returnKeyType='next'
            containerStyle={{ flex: 1 }}
            value={formState?.STOCKDETAIL_UNITCODE}
          />
        </View>
        <MyInput
          label={'Raf'}
          readOnly
          returnKeyType='next'
          containerStyle={{ flex: 1 }}
          value={formState?.STOCKDETAIL_RACKNAME}
        />
        {!!formState?.STOCKDETAIL_ISPROFILE && (
          <>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10 }}>
              <MyInput
                label={'Renk'}
                readOnly
                returnKeyType='next'
                containerStyle={{ flex: 1 }}
                value={formState?.STOCKDETAIL_COLORNAME}
              />
              <MyInput
                label={'Yüzey'}
                readOnly
                returnKeyType='next'
                containerStyle={{ flex: 1 }}
                value={formState?.STOCKDETAIL_SURFACENAME}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10 }}>
              <MyInput
                label={'Alaşım'}
                readOnly
                returnKeyType='next'
                containerStyle={{ flex: 1 }}
                value={formState?.STOCKDETAIL_ALLOYNAME}
              />
              <MyInput
                label={'Sertlik'}
                readOnly
                returnKeyType='next'
                containerStyle={{ flex: 1 }}
                value={formState?.STOCKDETAIL_HARDNESSNAME}
              />
            </View>
          </>
        )}
        {(formState?.STOCKDETAIL_LENGTHTRACKING ||
          formState?.STOCKDETAIL_PIECETRACKING ||
          formState?.STOCKDETAIL_DIAMETERTRACKING) && (
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10 }}>
            {!!formState?.STOCKDETAIL_LENGTHTRACKING && (
              <MyNumberInput
                label={'Boy'}
                readOnly
                returnKeyType='next'
                containerStyle={{ flex: 1 }}
                value={formState?.STOCKDETAIL_LENGTH}
              />
            )}
            {!!formState?.STOCKDETAIL_PIECETRACKING && (
              <MyNumberInput
                label={'Adet'}
                onChangeText={(text: string) => {
                  setFormState({
                    ...formState,
                    STOCKDETAIL_PIECE: text as any,
                    STOCKDETAIL_QUANTITY: onPieceChanged(
                      text,
                      formState.STOCKDETAIL_LENGTH,
                      formState.STOCKDETAIL_GRAMMAGE || 0
                    )
                  } as V_StockDetail)
                }}
                returnKeyType='next'
                containerStyle={{ flex: 1 }}
                value={formState?.STOCKDETAIL_PIECE}
              />
            )}
            {!!formState?.STOCKDETAIL_DIAMETERTRACKING && (
              <MyNumberInput
                label={'Çap'}
                readOnly
                returnKeyType='next'
                containerStyle={{ flex: 1 }}
                value={formState?.STOCKDETAIL_DIAMETER}
              />
            )}
          </View>
        )}
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10 }}>
          <MyInput
            label={'Lot Numarası'}
            readOnly
            returnKeyType='next'
            containerStyle={{ flex: 1 }}
            value={formState?.STOCKDETAIL_LOTNUMBER}
          />
          <MyInput
            label={'Durum'}
            readOnly
            returnKeyType='next'
            containerStyle={{ flex: 1 }}
            value={formState?.STOCKDETAIL_STATENAME}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10 }}>
          <MyNumberInput
            label={'Stok Miktarı'}
            readOnly
            returnKeyType='next'
            containerStyle={{ flex: 1 }}
            value={formState?.STOCKDETAIL_TOTALQUANTITY}
          />
          <MyNumberInput
            label={'Miktar'}
            returnKeyType='next'
            containerStyle={{ flex: 1 }}
            value={formState?.STOCKDETAIL_QUANTITY}
            onChangeText={(text: string) => {
              setFormState({
                ...formState,
                STOCKDETAIL_QUANTITY: text as any
              } as DataType)
            }}
          />
        </View>
      </View>
    </Layout>
  )
}

export default PurchaseReturnDetail
