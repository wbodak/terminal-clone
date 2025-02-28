import React, { useEffect, useState } from 'react'
import { View, ScrollView, FlatList, Image, StyleProp, ViewStyle } from 'react-native'
import { DataTable } from 'react-native-paper'
import MyText from '../Elements/MyText'
import { DeleteButton, EditButton, SelectButton } from './gridButtons'
import { V_StockMaster } from '@/types/db/V_StockMaster'
import { icons } from '@/assets/icons'
import MyButton from '../Elements/MyButton'
import { useGlobalContext } from '@/hooks/useGlobalContext'
import MyInput from '../Elements/MyInput'
import { useDebounce } from '@/hooks/useDebaounce'
import useStore from '@/store/useStore'

type Column = {
  dataField: string
  caption: string
  dataType?: 'date' | 'string' | 'number' | 'boolean'
  visible?: boolean
  width?: number
}

type Props = {
  data?: any[]
  updateData?: React.Dispatch<React.SetStateAction<V_StockMaster[]>>
  columns?: Column[]
  onSelect?: Function
  searchedField?: string
  deletePath?: string
  deleteQueryParams?: any
  editPage?: string
  editPageFields?: {
    sourceField: string
    targetField: string
  }[]
  gridStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const MyDataGrid = ({
  data = [],
  updateData,
  columns = [],
  onSelect,
  searchedField,
  deletePath,
  deleteQueryParams,
  editPage,
  editPageFields = [],
  gridStyle,
  containerStyle
}: Props) => {
  // const gridSelectedElement = useStore(state => state.gridSelectedElement)

  const { showSnackeBar } = useGlobalContext()
  const [tableData, setTableData] = useState<any>(data.slice(0, 15))
  const [keyword, setKeyword] = useState('')
  const debaouncedValue = useDebounce(keyword, 300)
  const [selectedRowMap, setSelectedRowMap] = useState<any>({})

  useEffect(() => {
    if (searchedField) {
      setTableData(
        data
          .filter(x => x[searchedField].toLocaleLowerCase('tr-TR').includes(debaouncedValue.toLocaleLowerCase('tr-TR')))
          .slice(0, 15) || []
      )
    }
  }, [debaouncedValue])

  const deleteRowFromState = (id: number) => {
    const filtredData = data.filter(item => {
      return item.ID != id
    })
    if (updateData) updateData(filtredData || [])
  }

  const visibleColumns = columns.filter(column => column.visible != false)

  useEffect(() => {
    setSelectedRowMap({})
    setTableData(data.slice(0, 15))
  }, [data])

  return (
    <>
      {data.length == 0 ? (
        <View style={{ flex: 1, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={icons['not-found']} style={{ width: 64, height: 64, marginBottom: 12 }} resizeMode='contain' />
          <MyText>Kayıtlı veri bulunamadı</MyText>
        </View>
      ) : (
        <View style={[containerStyle]}>
          {!!searchedField && (
            <MyInput
              label={'Arama'}
              containerStyle={{ flex: 1, maxHeight: 48, marginTop: 12 }}
              returnKeyType='next'
              value={keyword}
              onChangeText={text => {
                setKeyword(text)
              }}
            />
          )}
          <View style={[{ flex: 1, maxHeight: 300 }, gridStyle]}>
            <ScrollView horizontal nestedScrollEnabled>
              <FlatList
                nestedScrollEnabled
                data={tableData}
                keyExtractor={_ => Math.random().toString()}
                ListHeaderComponent={
                  <DataTable.Header>
                    {(editPage || deletePath || onSelect) && (
                      <DataTable.Title style={{ width: 75 }}>
                        <MyText>İşlemler</MyText>
                      </DataTable.Title>
                    )}
                    {visibleColumns.map((column, i) => {
                      return (
                        <DataTable.Title key={i} style={{ width: column?.width || 100 }}>
                          <MyText>{column.caption}</MyText>
                        </DataTable.Title>
                      )
                    })}
                  </DataTable.Header>
                }
                renderItem={item => {
                  const columnValues = visibleColumns.map(column => {
                    if (Object.keys(item.item).includes(column.dataField)) {
                      return {
                        value:
                          column.dataType == 'date'
                            ? new Date(item.item[column.dataField]).toLocaleDateString()
                            : column.dataType == 'boolean'
                              ? item.item[column.dataField] == true
                                ? 'Evet'
                                : 'Hayır'
                              : item.item[column.dataField],
                        width: column?.width
                      }
                    }
                  })
                  const editPageProps: any = {}
                  editPageFields.forEach(f => {
                    editPageProps[f.targetField] = item.item[f.sourceField]
                  })

                  const isSelected = selectedRowMap[item.item.ID] != undefined

                  return (
                    <DataTable.Row key={item.index} style={{ padding: 0 }}>
                      {(editPage || deletePath || onSelect) && (
                        <DataTable.Title
                          style={{
                            marginRight: 10,
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'row',
                            width: 75,
                            padding: 0
                          }}
                        >
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              height: '100%',
                              justifyContent: 'flex-start',
                              marginTop: 10,
                              alignItems: 'center',
                              gap: 10
                            }}
                          >
                            {!!onSelect && <SelectButton data={item.item} />}
                            {deletePath && (
                              <DeleteButton
                                deletePath={deletePath}
                                queryParams={deleteQueryParams}
                                masterId={item.item.ID}
                                onScuccess={() => deleteRowFromState(item.item.ID)}
                              />
                            )}
                            {editPage && <EditButton editPage={editPage} data={editPageProps} />}
                          </View>
                        </DataTable.Title>
                      )}
                      {columnValues.map((column: any, j) => {
                        return (
                          <DataTable.Title
                            key={Math.random()}
                            style={{ marginRight: 10, marginVertical: 'auto', flex: 2, width: column?.width || 100 }}
                          >
                            <MyText ellipsizeMode='tail' style={{ fontSize: 14 }}>
                              {column?.value}
                            </MyText>
                          </DataTable.Title>
                        )
                      })}
                    </DataTable.Row>
                  )
                }}
              />
            </ScrollView>
            {!!onSelect && <SaveButton onSelect={onSelect} />}
          </View>
        </View>
      )}
    </>
  )
}

const SaveButton = ({ onSelect }: any) => {
  const gridSelectedElement = useStore(state => state.gridSelectedElement)
  const { showSnackeBar } = useGlobalContext()

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'flex-end'
      }}
    >
      <MyButton
        containerStyle={{ width: 80, marginTop: 16, marginRight: 8 }}
        style={{ backgroundColor: 'green', height: 40 }}
        onPress={() => {
          if (Object.keys(gridSelectedElement).length == 0) {
            showSnackeBar({
              dialogName: 'Dlg_ErrorProcess',
              message: 'Lütfen bir seçim yapınız.'
            })
            return
          } else {
            onSelect({ data: Object.values(gridSelectedElement) })
          }
        }}
      >
        <MyText>Kaydet</MyText>
      </MyButton>
    </View>
  )
}

export default MyDataGrid
