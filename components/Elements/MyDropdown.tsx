import { SelectBoxDto } from '@/types/dtos/SelectBoxDto'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Dropdown as DropdownComp } from 'react-native-element-dropdown'
import MyText from './MyText'

type Props = {
  value: number | SelectBoxDto | boolean
  setValue: (value: any) => void
  label: string
  placeholder: string
  data: SelectBoxDto[]
  theme?: 'dark' | 'light'
  containerStyle?: StyleProp<ViewStyle>
}

const MyDropdown = ({ placeholder, label, value, setValue, data, theme = 'dark', containerStyle }: Props) => {
  const styles = theme === 'dark' ? darkStyles : lightStyles

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <MyText style={[styles.label]}>{label}:</MyText>
      <DropdownComp
        selectedTextProps={{ numberOfLines: 1 }}
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={{ marginBottom: 10 }}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={{ borderWidth: 0 }}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={{ fontSize: 14 }}
        renderItem={item => <MyText style={styles.item}>{item.text}</MyText>}
        placeholder={placeholder}
        data={data}
        labelField='text'
        valueField='value'
        value={data.find(x => x.value === value)}
        onChange={item => {
          setValue(item.value)
        }}
      />
    </View>
  )
}

export default MyDropdown

const lightStyles = StyleSheet.create({
  wrapper: { position: 'relative', height: 48 },
  dropdown: {
    backgroundColor: 'white',
    height: 48,
    borderRadius: 4,
    paddingBottom: 8,
    paddingTop: 24,
    paddingHorizontal: 16
  },
  label: {
    letterSpacing: 0.15,
    zIndex: 1,
    position: 'absolute',
    top: 8,
    left: 16,
    fontSize: 10,
    fontWeight: '700',
    color: 'black'
  },
  placeholderStyle: {
    fontFamily: 'Inter',
    fontSize: 14
  },
  selectedTextStyle: {
    fontFamily: 'Inter',
    fontSize: 14,
    overflow: 'hidden'
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: 'black'
  },
  itemContainer: {
    backgroundColor: 'white'
  }
})

const darkStyles = StyleSheet.create({
  wrapper: { position: 'relative', height: 48 },
  dropdown: {
    backgroundColor: '#262B30',
    height: 48,
    borderRadius: 4,
    paddingBottom: 8,
    paddingTop: 24,
    paddingHorizontal: 16
  },
  label: {
    letterSpacing: 0.15,
    zIndex: 1,
    position: 'absolute',
    top: 8,
    left: 16,
    fontSize: 10,
    fontWeight: '700',
    color: 'white'
  },
  placeholderStyle: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#99A0A3'
  },
  selectedTextStyle: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: 'white',
    overflow: 'hidden'
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: 'white',
    backgroundColor: '#262B30',
    borderWidth: 0,
    margin: 0,
    borderColor: 'white'
  },
  itemContainer: {
    padding: 0,
    backgroundColor: '#262B30',
    borderWidth: 0
  }
})
