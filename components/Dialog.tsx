import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Image, View } from 'react-native'
import MyButton, { MyButtonOnPress } from './Elements/MyButton'
import MyText from './Elements/MyText'
import { icons } from '@/assets/icons'

export type DialogProps = {
  title: string
  message: string
  type: 'danger' | 'info' | 'success'
  callback?: MyButtonOnPress
}

const configs = {
  danger: {
    icon: icons['alert-dialog'],
    color: '#FF9C9E'
  },
  info: {
    icon: icons['info-dialog'],
    color: '#9CCEFF'
  },
  success: {
    icon: icons['info-dialog'],
    color: '#9CFFBA'
  }
}

const MyDialog = (props: any, ref: any) => {
  const [isShowing, setIsShowing] = useState<boolean>(false)
  const [dialog, setDialog] = useState<DialogProps>({
    type: 'info',
    title: 'Bilgilendirme',
    message: 'Bu bir bilgilendirme mesajıdır. Lütfen dikkate almayınız.',
    callback: () => {}
  })

  useImperativeHandle(
    ref,
    () => ({
      show: (dialog: DialogProps) => {
        setDialog(dialog)
        setIsShowing(true)
      }
    }),
    []
  )

  if (!isShowing) return null

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2001
      }}
    >
      <View
        style={{
          width: '90%',
          height: 200,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: configs[dialog.type].color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#12263A'
        }}
      >
        <View
          style={{
            width: '100%',
            padding: 24,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Image
            source={configs[dialog.type].icon}
            style={{ width: 32, height: 32, marginRight: 12 }}
            width={32}
            height={32}
          />
          <MyText style={{ color: 'white' }}>{dialog?.title}</MyText>
        </View>
        <MyText style={{ color: 'white', marginLeft: 12, marginBottom: 48, marginRight: 12 }}>{dialog?.message}</MyText>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 10,
            marginRight: 24
          }}
        >
          <MyButton
            style={{
              paddingHorizontal: 12,
              paddingVertical: 4,
              height: 'auto'
            }}
            onPress={e => {
              setIsShowing(false)
            }}
          >
            <MyText>Hayır</MyText>
          </MyButton>
          <MyButton
            style={{
              backgroundColor: configs[dialog.type].color,
              paddingHorizontal: 12,
              paddingVertical: 4,
              height: 'auto'
            }}
            onPress={e => {
              setIsShowing(false)
              dialog?.callback && dialog.callback(e)
            }}
          >
            <MyText>Evet</MyText>
          </MyButton>
        </View>
      </View>
    </View>
  )
}

export default forwardRef(MyDialog)
