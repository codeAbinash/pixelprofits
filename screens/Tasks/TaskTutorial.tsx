import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'
import icons from '../../assets/icons/icons'
import ButtonFull from '../../components/ButtonFull'
import { colors } from '../../styles/colors'
import { fonts } from '../../styles/fonts'
import { video_url } from '../../appData'


function steps(taskType: string) {
  switch (taskType) {
    case 'youtube':
      return (
        <>
          <Text style={styles.stepsStyle}>1. First Click On Start Task</Text>
          <Text style={styles.stepsStyle}>2. It will redirect you to Youtube</Text>
          <Text style={styles.stepsStyle}>3. Watch the video completely.</Text>
          <Text style={styles.stepsStyle}>4. After watching the video return to the app.</Text>
          <Text style={styles.stepsStyle}>5. Answer the questions asked in the app.</Text>
          <Text style={styles.stepsStyle}>6. Then click on the Submit Answers button.</Text>
          <Text style={styles.stepsStyle}>7. Now your should get your reward.</Text>
        </>
      )
    case 'instagram':
      return (
        <>
          <Text style={styles.stepsStyle}>1. First Click On Start Task</Text>
          <Text style={styles.stepsStyle}>2. It will redirect you to Instagram</Text>
          <Text style={styles.stepsStyle}>3. Watch the video/reel/post completely.</Text>
          <Text style={styles.stepsStyle}>4. Like, comment and share.</Text>
          <Text style={styles.stepsStyle}>5. Then return to the app.</Text>
          <Text style={styles.stepsStyle}>6. Answer the questions asked in the app.</Text>
          <Text style={styles.stepsStyle}>7. Then click on the Submit Answers button.</Text>
          <Text style={styles.stepsStyle}>8. Now your should get your reward.</Text>
        </>
      )
    case 'website_check_in':
      return (
        <>
          <Text style={styles.stepsStyle}>1. First Click On Start Task</Text>
          <Text style={styles.stepsStyle}>2. It will redirect you to Website</Text>
          <Text style={styles.stepsStyle}>3. Read the article or content completely.</Text>
          <Text style={styles.stepsStyle}>4. Then return to the app.</Text>
          <Text style={styles.stepsStyle}>5. Answer the questions asked in the app.</Text>
          <Text style={styles.stepsStyle}>6. Then click on the submit answers button.</Text>
          <Text style={styles.stepsStyle}>7. Now your should get your reward.</Text>
        </>
      )
  }
}

function CheckBox({ checked, onClick = () => {} }: { checked: boolean; onClick?: Function }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        onClick()
      }}
    >
      <View
        style={{
          width: 23,
          height: 23,
          borderRadius: 5,
          borderWidth: 1,
          backgroundColor: checked ? colors.accent : '#c5c5c5',
          borderColor: checked ? colors.accent : '#c5c5c5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <Image
            source={icons.check}
            style={{
              width: 11,
              height: 11,
              resizeMode: 'contain',
              tintColor: 'white',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const TaskTutorial = ({ route, navigation }: any) => {
  const { isFromHome } = route.params
  const taskType: string = route.params.taskType
  console.log(taskType)

  const { width, height } = Dimensions.get('window')
  const [dontShowAgainChecked, setDontShowAgainChecked] = React.useState(false)

  const [isLoading, setIsLoading] = React.useState(true)

  useEffect(() => {
    AsyncStorage.getItem('dontShowTaskTutorial').then((value) => {
      setDontShowAgainChecked(value === 'true')
    })
  }, [])

  return (
    <ScrollView
      style={{
        height: height,
        width: '100%',
        display: 'flex',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <StatusBar backgroundColor='white' barStyle='dark-content' />
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: fonts.semiBold,
            color: colors.text,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Get Money Steps Tutorial
        </Text>
        <View
          style={{
            position: 'relative',
          }}
        >
          <Video
            resizeMode='cover'
            onLoad={() => {
              setIsLoading(false)
            }}
            controls={true}
            // paused={true}
            source={{ uri: video_url[taskType] }}
            style={{
              // width: width - 40, height: (width - 40) * 9 / 16, marginLeft: 'auto', marginRight: 'auto',
              width: width,
              height: (width * 9) / 16,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20,
              //  borderRadius: 20,
              backgroundColor: 'black',
            }}
          />
          <Text
            style={{
              position: 'absolute',
              top: '70%',
              left: '46%',
              transform: [{ translateX: -50 }, { translateY: -50 }],
              color: 'white',
              display: isLoading ? 'flex' : 'none',
            }}
          >
            Loading Tutorial Video...
          </Text>
        </View>
      </View>
      <TaskRules taskType={taskType} />
      <View
        style={{
          padding: 20,
          width: '100%',
          gap: 10,
          paddingBottom: 15,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              marginBottom: 10,
            }}
          >
            <CheckBox
              checked={dontShowAgainChecked}
              onClick={() => {
                setDontShowAgainChecked(!dontShowAgainChecked)
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setDontShowAgainChecked(!dontShowAgainChecked)
              }}
            >
              <Text
                style={{
                  fontSize: 16.5,
                  fontFamily: fonts.regular,
                  color: colors.text,
                  textAlign: 'center',
                }}
              >
                Don't show this tutorial again
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ButtonFull
          title='View Available Tasks'
          onPress={() => {
            AsyncStorage.setItem('dontShowTaskTutorial', dontShowAgainChecked.toString()).then(() => {
              if (isFromHome)
                navigation.replace('YouTubeTask', {
                  taskType: taskType,
                  isFromHome: false,
                })
              else navigation.goBack()
            })
          }}
        />
      </View>
    </ScrollView>
  )
}

function TaskRules({ taskType }: { taskType: string }) {
  return (
    <View style={{ padding: 20, gap: 5 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 5,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 25, fontFamily: fonts.medium, color: colors.text }}> Get Money Steps </Text>
        {/* <WatchTutorial /> */}
      </View>
      <View
        style={{
          backgroundColor: '#f5f5f5',
          padding: 20,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#c5c5c5',
        }}
      >
        {steps(taskType)}
      </View>
      {/* <Text style={styles.stepsStyle}>7. Video's Screen Recording b. Like Screenshot c. Comment Screenshot d. Valid Paytm Number</Text> */}
    </View>
  )
}

export default TaskTutorial

const styles = StyleSheet.create({
  stepsStyle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text,
    paddingLeft: 10,
    marginTop: 10,
  },
})
