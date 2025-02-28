import React from 'react'
import { Image } from 'react-native'
import { icons } from '@/assets/icons'
import MyText from '../Elements/MyText'
import MyButton, { MyButtonProps } from '../Elements/MyButton'

interface Props extends MyButtonProps {
  text: string
  icon: keyof typeof icons
}

const BottomButton = ({ text, icon, ...props }: Props) => {
  return (
    <MyButton
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: props.disabled ? 0.5 : 1
      }}
      containerStyle={{
        marginHorizontal: 'auto'
      }}
    >
      <Image source={icons[icon]} style={{ width: 32, height: 32, marginBottom: 2 }} resizeMode='contain' />
      <MyText style={{ fontSize: 10 }}>{text}</MyText>
    </MyButton>
  )
}

export default BottomButton
