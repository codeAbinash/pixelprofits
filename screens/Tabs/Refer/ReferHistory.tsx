import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { API_URL } from '../../../appData'
import icons from '../../../assets/icons/icons'
import Loading from '../../../components/Loading'
import { colors } from '../../../styles/colors'
import { fonts } from '../../../styles/fonts'
import { getDefaultHeader } from '../../methods'

const { width, height } = Dimensions.get('window')

const ReferHistory = () => {
  const [history, setHistory] = React.useState<any>(null)

  async function loadHistory() {
    // Fetch data from server
    const headers = await getDefaultHeader(await AsyncStorage.getItem('token'))
    const data = await fetch(API_URL.refer_history, {
      headers: headers,
      method: 'POST',
    })
    const res = await data.json()
    setHistory(res.data)
    console.log(res)

    // console.log(headers)
  }

  useEffect(() => {
    loadHistory()
  }, [])

  if (history === null) return <Loading />
  if (history.length === 0)
    return (
      <View className='flex-1 items-center justify-center bg-white'>
        <Text style={{ fontFamily: fonts.medium, color: colors.gray }}>No refer history</Text>
      </View>
    )

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='p-4 pt-1'>
        {history.map((item: any, index: number) => {
          return <ReferAccount key={index} data={item} />
        })}
      </View>
    </ScrollView>
  )
}

function getStatusColor(status: string) {
  if (status === 'pending') return 'orange'
  else if (status === 'success') return 'limegreen'
  else return 'red'
}

function ReferAccount({ data }: any) {
  const name = data.get_name.name
  const pp = data.get_name.profile_pic
  const status = data.status
  const coins = data.reward_coin
  const time = data.created_at

  console.log(data.get_name)

  return (
    <View
      className='mt-4 flex-row items-center justify-between p-5'
      style={{
        backgroundColor: '#fafafa',
        borderRadius: 20,
        borderColor: '#e5e5e5',
        borderWidth: 0.5,
      }}
    >
      <View className='flex-row items-center'>
        <View>
          <Image
            source={pp == null ? icons.user_icon : { uri: pp }}
            style={{
              height: 50,
              aspectRatio: 1,
              resizeMode: 'contain',
              borderRadius: 100,
            }}
          />
        </View>
        <View className='justify-center gap-1 pl-5'>
          <Text
            style={{
              fontFamily: fonts.medium,
              color: colors.text,
              fontSize: 16,
            }}
          >
            {name}
          </Text>
          <View className='flex-row justify-between' style={{}}>
            <View className='flex-row items-center justify-center gap-2'>
              <Image
                source={icons.coins}
                style={{
                  height: 20,
                  width: 20,
                  aspectRatio: 1,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.medium,
                  color: colors.text,
                  fontSize: 14,
                }}
              >
                {coins} coins
              </Text>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  color: getStatusColor(status),
                  fontSize: 14,
                }}
              >
                •
              </Text>

              <Text
                style={{
                  fontFamily: fonts.medium,
                  color: getStatusColor(status),
                  fontSize: 14,
                }}
              >
                {status}
              </Text>
            </View>
            <View></View>
          </View>
        </View>
      </View>

      <View>
        <Text
          style={{
            fontFamily: fonts.medium,
            color: colors.textLight,
            fontSize: 12,
            textAlign: 'right',
          }}
        >
          {new Date(time).toLocaleDateString() + '\n'} {new Date(time).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  )
}

export default ReferHistory

const styles = StyleSheet.create({})
