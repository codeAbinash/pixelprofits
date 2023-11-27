import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import images from '../../assets/images/images'
import Loading from '../../components/Loading'

const Withdraw = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <Image
          source={images.withdraw}
          style={{
            width: '80%',
            // backgroundColor: 'red',
            resizeMode: 'contain',
            maxHeight: 250,
            alignSelf: 'center',
          }}
        />
      </ScrollView>
      <Loading />
    </View>
  )
}

export default Withdraw

const styles = StyleSheet.create({})
