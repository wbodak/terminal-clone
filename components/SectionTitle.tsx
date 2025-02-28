import React from 'react'
import MyText from './Elements/MyText'
import { View } from 'react-native'

type Props = {
  title: string
}
const SectionTitle = ({ title }: Props) => {
  return (
    <>
      <MyText style={{ marginTop: 16, fontSize: 12, paddingHorizontal: 16 }}>{title}</MyText>
      <View style={{ width: '100%', height: 1, marginTop: 5, backgroundColor: '#313236' }} />
    </>
  )
}

export default SectionTitle
