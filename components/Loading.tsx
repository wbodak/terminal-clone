import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Image, View } from 'react-native'

const Loading = (props: any, ref: any) => {
  const [loading, setLoading] = useState(0)

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        const loadingCount = loading + 1
        setLoading(loadingCount)
      },
      stop: () => {
        const loadingCount = loading > 0 ? loading - 1 : 0
        setLoading(loadingCount)
      },
      isLoading: () => loading >= 1
    }),
    []
  )

  if (!loading) {
    return null
  }

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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 2001
      }}
    >
      <View
        style={{
          width: 124,
          height: 124,
          borderRadius: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.9)'
        }}
      >
        <Image
          source={require('../assets/images/wbloading.gif')}
          style={{ width: 125, height: 125, marginRight: 2, marginBottom: 2 }}
          resizeMode='contain'
        />
      </View>
    </View>
  )
}

export default forwardRef(Loading)
