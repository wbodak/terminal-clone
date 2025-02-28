import React from 'react'
import { StyleSheet } from 'react-native'
import { Text as DefaultText } from 'react-native-paper'

const MyText: React.FC<React.ComponentProps<typeof DefaultText>> = props => {
  return <DefaultText {...props} style={[styles.text, props.style]} />
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Inter'
  }
})

export default MyText
