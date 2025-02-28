import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import MyText from './MyText'
import MyButton from './MyButton'

interface Props {
  label: string
  theme?: 'dark' | 'light'
  containerStyle?: StyleProp<ViewStyle>
  value?: string | Date
  onCahnge?: (value: Date) => void
  readOnly?: boolean
}

const MyDateInput = ({ label, theme = 'dark', readOnly, value, onCahnge, containerStyle }: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const styles = theme === 'dark' ? darkStyles : lightStyles

  return (
    <>
      {showDatePicker && (
        // <DateTimePicker
        //   value={new Date()}
        //   mode={'date'}
        //   display='default'
        //   onChange={(_, selectedDate) => {
        //     setShowDatePicker(false)
        //     onCahnge && selectedDate && onCahnge(selectedDate)
        //   }}
        // />
        null
      )}
      <MyButton
        style={[styles.wrapper, containerStyle]}
        containerStyle={containerStyle}
        onPress={() => {
          if (!readOnly) setShowDatePicker(true)
        }}
      >
        <MyText style={[styles.label, styles.readOnlyLabel]}>{label}:</MyText>
        <MyText style={[styles.input, readOnly ? styles.readOnlyInput : {}]}>
          {typeof value == 'string' ? new Date(value).toLocaleDateString() : value?.toLocaleDateString()}
        </MyText>
      </MyButton>
    </>
  )
}

const lightStyles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 16,
    zIndex: 1,
    fontSize: 10,
    fontWeight: '700',
    color: 'black'
  },
  readOnlyLabel: { color: '#16171A' },
  input: {
    height: 48,
    color: '#16171A',
    fontFamily: 'Inter',
    fontSize: 14,
    borderWidth: 0,
    paddingBottom: 6,
    paddingTop: 24,
    paddingHorizontal: 16,
    flex: 1
  },
  readOnlyInput: { color: '#16171A' },
  placeholder: {
    color: '#16171A'
  },
  cursorColor: {
    color: 'black'
  }
})

const darkStyles = StyleSheet.create({
  wrapper: {
    height: 50,
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262B30',
    borderRadius: 4
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 16,
    zIndex: 1,
    fontSize: 10,
    letterSpacing: 0.5,
    fontWeight: '700',
    color: 'white'
  },
  readOnlyLabel: { color: '#99A0A3' },
  input: {
    height: 48,
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 14,
    borderWidth: 0,
    paddingTop: 24,
    paddingHorizontal: 16,
    flex: 1
  },
  readOnlyInput: { color: '#99A0A3' },
  placeholder: {
    color: '#99A0A3'
  },
  cursorColor: {
    color: 'white'
  }
})

export default MyDateInput
