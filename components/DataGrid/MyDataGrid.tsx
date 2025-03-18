import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Vibration,
  TouchableOpacity,
} from "react-native";
import { DataTable, Icon } from "react-native-paper";
import MyText from "../Elements/MyText";
import { DeleteButton, EditButton, SelectButton } from "./gridButtons";
import { V_StockMaster } from "@/types/db/V_StockMaster";
import { icons } from "@/assets/icons";
import MyButton from "../Elements/MyButton";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import MyInput from "../Elements/MyInput";
import { useDebounce } from "@/hooks/useDebaounce";
import useStore from "@/store/useStore";
import { colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomModal from "../CustomModal/CustomModal";
import {
  GestureDetector,
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
type Column = {
  dataField: string;
  caption: string;
  dataType?: "date" | "string" | "number" | "boolean";
  visible?: boolean;
  width?: number;
};

type Props = {
  data?: any[];
  updateData?: React.Dispatch<React.SetStateAction<V_StockMaster[]>>;
  columns?: Column[];
  onSelect?: Function;
  searchedField?: string;
  deletePath?: string;
  deleteQueryParams?: any;
  editPage?: string;
  editPageFields?: {
    sourceField: string;
    targetField: string;
  }[];
  gridStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  multiple?: boolean;
  detailColumns?: any;
};

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
  containerStyle,
  multiple = false,
  detailColumns,
}: Props) => {
  const { showSnackeBar } = useGlobalContext();
  const [tableData, setTableData] = useState<any>(data.slice(0, 15));
  const [keyword, setKeyword] = useState("");
  // const debaouncedValue = useDebounce(keyword, 300);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTableItem, setSelectedTableItem] = useState(undefined);

  const handleSelect = (tableItem: any) => {
    const isExist = selectedItems.some((item: any) => item.ID === tableItem.ID);
    if (multiple) {
      if (isExist) {
        setSelectedItems((prev) =>
          prev.filter((item: any) => item.ID !== tableItem.ID)
        );
      } else {
        setSelectedItems((prev) => [...prev, tableItem]);
      }
    } else {
      if (isExist) {
        setSelectedItems([]);
        return;
      }
      setSelectedItems([tableItem]);
    }
  };

  useEffect(() => {
    if (searchedField) {
      setTableData(
        data
          .filter((x) =>
            x[searchedField]
              .toLocaleLowerCase("tr-TR")
              .includes(keyword.toLocaleLowerCase("tr-TR"))
          )
          .slice(0, 15) || []
      );
    }
  }, [keyword]);

  const deleteRowFromState = (id: number) => {
    const filtredData = data.filter((item) => {
      return item.ID != id;
    });
    if (updateData) updateData(filtredData || []);
  };

  const visibleColumns = columns.filter((column) => column.visible != false);

  useEffect(() => {
    setTableData(data.slice(0, 15));
  }, [data]);

  const isSelected = (id: number) => {
    return selectedItems.some((item: any) => item.ID === id);
  };

  return (
    <>
      {data.length === 0 ? (
        <View style={styles.emptyDataContainer}>
          <Image
            source={icons["not-found"]}
            style={{ width: 64, height: 64, marginBottom: 12 }}
            resizeMode="contain"
          />
          <MyText>Kayıtlı veri bulunamadı</MyText>
        </View>
      ) : (
        <View style={[{ flex: 1 }, gridStyle]}>
          {!!searchedField && (
            <MyInput
              label="Arama"
              containerStyle={{
                marginTop: 12,
              }}
              returnKeyType="next"
              value={keyword}
              onChangeText={setKeyword}
            />
          )}
          <View style={[{ flex: 1, minHeight: 200 }, gridStyle]}>
            <GestureHandlerRootView>
              <FlatList
                nestedScrollEnabled
                data={tableData}
                keyExtractor={(_) => Math.random().toString()}
                ListHeaderComponent={
                  <DataTable.Header>
                    {visibleColumns.map((column, i) => {
                      return (
                        <DataTable.Title
                          key={i}
                          style={{ width: column?.width || 100 }}
                        >
                          <MyText>{column.caption}</MyText>
                        </DataTable.Title>
                      );
                    })}
                  </DataTable.Header>
                }
                renderItem={(item) => {
                  const renderActions = () => {
                    return (
                      <View style={styles.acionButtonsContainer}>
                        <TouchableOpacity>
                          {/* <Feather
                            name="edit"
                            size={24}
                            color={colors.accent}
                          /> */}
                          {editPage && (
                            <EditButton
                              editPage={editPage}
                              data={editPageProps}
                            />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity>
                          {deletePath && (
                            <DeleteButton
                              deletePath={deletePath}
                              queryParams={deleteQueryParams}
                              masterId={item.item.ID}
                              onScuccess={() =>
                                deleteRowFromState(item.item.ID)
                              }
                            />
                          )}
                          {/* <AntDesign name="delete" size={24} color="red" /> */}
                        </TouchableOpacity>
                      </View>
                    );
                  };

                  const columnValues = visibleColumns.map((column) => {
                    if (Object.keys(item.item).includes(column.dataField)) {
                      return {
                        value:
                          column.dataType == "date"
                            ? new Date(
                                item.item[column.dataField]
                              ).toLocaleDateString()
                            : column.dataType == "boolean"
                            ? item.item[column.dataField] == true
                              ? "Evet"
                              : "Hayır"
                            : item.item[column.dataField],
                        width: column?.width,
                      };
                    }
                  });
                  const editPageProps: any = {};
                  editPageFields.forEach((f) => {
                    editPageProps[f.targetField] = item.item[f.sourceField];
                  });
                  return (
                    <Swipeable renderRightActions={renderActions}>
                      <DataTable.Row
                        onLongPress={() => {
                          Vibration.vibrate();
                          setModalVisible(true);
                          setSelectedTableItem(item.item);
                        }}
                        key={item.index}
                        style={
                          isSelected(item.item.ID)
                            ? styles.selectedRow
                            : styles.row
                        }
                        onPress={() => {
                          handleSelect(item.item);
                        }}
                      >
                        {/* {(editPage || deletePath || onSelect) && (
                        <DataTable.Title
                          style={{
                            marginRight: 10,
                            marginTop: 5,
                            display: "flex",
                            flexDirection: "row",
                            width: 75,
                            padding: 0,
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: "100%",
                              justifyContent: "flex-start",
                              marginTop: 10,
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            {deletePath && (
                              <DeleteButton
                                deletePath={deletePath}
                                queryParams={deleteQueryParams}
                                masterId={item.item.ID}
                                onScuccess={() =>
                                  deleteRowFromState(item.item.ID)
                                }
                              />
                            )}
                            {editPage && (
                              <EditButton
                                editPage={editPage}
                                data={editPageProps}
                              />
                            )}
                          </View>
                        </DataTable.Title>
                      )} */}
                        {columnValues.map((column: any, j) => {
                          return (
                            <DataTable.Title
                              key={Math.random()}
                              style={{
                                marginRight: 10,
                                marginVertical: "auto",
                                flex: 2,
                                width: column?.width || 100,
                              }}
                            >
                              <MyText
                                ellipsizeMode="tail"
                                style={{ fontSize: 14 }}
                              >
                                {column?.value}
                              </MyText>
                            </DataTable.Title>
                          );
                        })}
                      </DataTable.Row>
                    </Swipeable>
                  );
                }}
              />
            </GestureHandlerRootView>
            {!!onSelect && (
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <MyButton
                  containerStyle={{
                    width: "100%",
                  }}
                  style={{ backgroundColor: "green" }}
                  onPress={() => {
                    if (selectedItems.length == 0) {
                      showSnackeBar({
                        dialogName: "Dlg_ErrorProcess",
                        message: "Lütfen bir seçim yapınız.",
                      });
                      return;
                    } else {
                      onSelect({
                        data: selectedItems,
                      });
                    }
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                    <MyText style={{ fontSize: 16, fontWeight: "bold" }}>
                      Tamam
                    </MyText>
                  </View>
                </MyButton>
              </View>
            )}
          </View>
        </View>
      )}
      {modalVisible && detailColumns && (
        <CustomModal
          detailColumns={detailColumns}
          selectedTableItem={selectedTableItem}
          isOpen={modalVisible}
          handleClose={() => setModalVisible(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: "transparent",
  },
  selectedRow: {
    backgroundColor: colors.accent,
  },
  acionButtonsContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  emptyDataContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default MyDataGrid;
