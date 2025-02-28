import React, { forwardRef } from 'react'
import {
  StyleSheet,
  TextInput as DefaultText,
  TextInputProps,
  View,
  ViewStyle,
  StyleProp,
  Keyboard
} from 'react-native'
import MyText from './MyText'

interface Props extends Omit<TextInputProps, 'value'> {
  value: string | number | undefined
  label: string
  theme?: 'dark' | 'light'
  containerStyle?: StyleProp<ViewStyle>
  icons?: React.JSX.Element
  onChangeText?: (text: string) => void
}

const formatNumber = (text: string | number = '') => {
  if (typeof text == 'number') {
    text = text.toString().replace('.', ',')
  }
  let cleanText = text.replace(/\./g, '').replace(/[^0-9,]/g, '')

  if (cleanText === '') {
    return ''
  }

  if (text.endsWith('.')) {
    cleanText += ','
  }

  // Tam ve ondalık kısmı ayır (eğer virgül varsa)
  const [integerPart, decimalPart] = cleanText.split(',')

  // Binlik ayracı ekle (sadece tam kısmına)
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  // Eğer ondalık kısım varsa birleştir, yoksa sadece tam kısmı göster
  const formattedText = decimalPart !== undefined ? `${formattedInteger},${decimalPart}` : formattedInteger

  return formattedText
}

export const parseToNumber = (text: number | string) => {
  if (!text || typeof text == 'number') return text

  // Formatlanmış metni sayıya dönüştür
  const number = parseFloat(text.replace(/\./g, '').replace(/,/g, '.'))
  return isNaN(number) ? 0 : number
}

const MyNumberInput = forwardRef<DefaultText, Props>(
  ({ label = '', theme = 'dark', icons, readOnly, onChangeText = () => {}, ...props }, ref) => {
    const styles = theme === 'dark' ? darkStyles : lightStyles

    return (
      <View style={[styles.wrapper, props.containerStyle]} aria-disabled>
        <MyText style={[styles.label, readOnly ? styles.readOnlyLabel : {}]}>{label}:</MyText>
        <DefaultText
          {...props}
          editable={!readOnly}
          showSoftInputOnFocus={!readOnly}
          onPress={readOnly ? Keyboard.dismiss : undefined}
          onChangeText={text => onChangeText(formatNumber(text))}
          value={typeof props.value == 'number' ? formatNumber(props.value as any) : props.value}
          keyboardType={'decimal-pad'}
          ref={ref}
          style={[
            styles.input,
            props.style,
            readOnly ? styles.readOnlyInput : {},
            props.multiline ? { textAlignVertical: 'top' } : {}
          ]}
          placeholderTextColor={styles.placeholder.color}
          cursorColor={styles.cursorColor.color}
        />
        {icons}
      </View>
    )
  }
)

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
    textAlign: 'justify',
    fontSize: 14,
    borderWidth: 0,
    paddingBottom: 4,
    paddingTop: 20,
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
    maxHeight: 200,
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 14,
    borderWidth: 0,
    paddingBottom: 4,
    paddingTop: 20,
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

export default MyNumberInput
