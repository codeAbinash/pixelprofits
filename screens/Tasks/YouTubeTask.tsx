import React, { useEffect, useState } from 'react'
import {
  // Alert,
  // BackHandler,
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  ScrollView,
  // StatusBar,
  // StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors } from '../../styles/colors'
import { fonts } from '../../styles/fonts'
// import images from '../../assets/images/images'
// import { Touchable } from 'react-native'
import icons from '../../assets/icons/icons'
import ButtonFull from '../../components/ButtonFull'
// import Video from 'react-native-video'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../../appData'
import CustomModal from '../../components/CustomModal'
import Loading from '../../components/Loading'
import buttons from '../../styles/buttons'
import { getDefaultHeader } from '../methods'
// import { Clipboard } from 'react-native'
import {
  SwipeUp,
  TaskAmount,
  // GoBtn,
  TaskRejectedUI,
  TaskStatusUI,
  // WatchTutorial,
  // Uploading,
  WatchHelp,
  copyToClipboard,
} from './Components'

const { height, width } = Dimensions.get('window')

const API_LINKS: any = {
  youtube: API_URL.get_yt_task,
  yt_shorts: API_URL.get_yt_shorts_task,
  instagram: API_URL.get_insta_task,
}

// async function restartApp() {
//   await AsyncStorage.setItem('refresh', 'true')
//   RNRestart.Restart()
// }

export default function YouTubeTask({ route, navigation }: any) {
  const [bottomSwipeIcon] = useState(new Animated.Value(0))
  const [topSwipeIcon] = useState(new Animated.Value(10))
  const [modalVisible, setModalVisible] = useState(false)

  const [modals, setModals] = useState<any>([])
  const [tasks, setTasks] = useState<any>(null)
  const taskType = route.params.taskType

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bottomSwipeIcon, {
          toValue: 10,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(bottomSwipeIcon, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
      ]),
    ).start()
  }, [])

  async function getTasks(taskType: string) {
    const headers = getDefaultHeader(await AsyncStorage.getItem('token'))
    const res = await fetch(API_LINKS[taskType], {
      method: 'POST',
      headers: headers,
    })
    const data = await res.json()
    setTasks(data.data)
    console.log(data.data)
  }
  useEffect(() => {
    getTasks(taskType)
  }, [])

  function startTask(index: number, id: number, url: string) {
    // Linking.openURL(url)
    navigation.replace('questions', { taskType: taskType, index: index, id: id })
  }

  if (tasks === null) return <Loading />

  if (tasks.length === 0) {
    return (
      <View className='flex-1 items-center justify-center bg-white'>
        <Text style={{ fontFamily: fonts.medium, color: colors.text }}>No tasks available for today</Text>
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <CustomModal modals={modals} updater={setModals} />

      <Modal animationType='fade' transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.15)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 25,
              borderRadius: 25,
              gap: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={icons.swipe_up_finger} />
            <Text
              style={{
                fontSize: 20,
                fontFamily: fonts.regular,
                color: colors.text,
                textAlign: 'center',
              }}
            >
              Swipe Up To View Next Task
            </Text>
            <ButtonFull
              title='Ok, Got it'
              onPress={() => {
                setModalVisible(false)
              }}
            />
          </View>
        </View>
      </Modal>
      <ScrollView pagingEnabled={true} showsHorizontalScrollIndicator={false}>
        {tasks.map((task: any, index: number) => {
          return <Task task={task} index={index} key={index} />
        })}
      </ScrollView>
    </View>
  )

  function Task({ task, index }: { task: any; index: number }) {
    const task_name = task.data.task_name
    const title = task.data.title
    const reward_coin = task.data.reward_coin
    const thumbnail_image = task.data.thumbnail_image
    const publisher = task.data.publisher
    const action_url = task.data.action_url
    const ends_at = task.data.expire_at
    const id = task.data.id
    const [s, ss] = useState(task.status)
    // const [status, setStatus] = useMemo(() => [s, ss], [s])
    const now = new Date()
    const end = new Date(ends_at)
    const isExpired = now > end
    const [isCopied, setIsCopied] = useState(false)
    // const isExpired = false

    return (
      <View
        style={{
          height: height,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        key={index}
      >
        <View>
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: fonts.semiBold,
                color: colors.text,
                textAlign: 'center',
              }}
            >
              {task_name}
            </Text>
          </View>
          <View>
            {/*16 : 9 Video Thumbnail*/}
            {taskType === 'youtube' ? (
              <Image
                source={{ uri: thumbnail_image }}
                style={{
                  width: width - 40,
                  height: ((width - 40) * 9) / 16,
                  alignSelf: 'center',
                  borderRadius: 25,
                }}
              ></Image>
            ) : (
              <View>
                <Image
                  blurRadius={10}
                  source={{ uri: thumbnail_image }}
                  style={{
                    width: width - 40,
                    height: ((width - 40) * 12) / 16,
                    alignSelf: 'center',
                    borderRadius: 25,
                  }}
                ></Image>
                <Image
                  source={{ uri: thumbnail_image }}
                  style={{
                    width: width - 40,
                    height: ((width - 40) * 12) / 16,
                    position: 'absolute',
                    resizeMode: 'contain',
                  }}
                ></Image>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                width: width - 50,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
                gap: 10,
              }}
            >
              <View
                style={{
                  padding: 10,
                  paddingTop: 0,
                  paddingBottom: 0,
                  width: width - 100,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModals([
                      ...modals,
                      {
                        title: 'Task Title',
                        description: title,
                        type: 'info',
                        active: true,
                        buttons: [
                          {
                            text: 'Ok',
                          },
                          {
                            text: 'Copy',
                            positive: true,
                            onPress: () => {
                              copyToClipboard(title), setIsCopied(true)
                              setTimeout(() => {
                                setIsCopied(false)
                              }, 5000)
                            },
                          },
                        ],
                      },
                    ])
                  }}
                >
                  <Text
                    numberOfLines={3}
                    style={{
                      fontSize: 16,
                      fontFamily: fonts.medium,
                      color: colors.text,
                    }}
                  >
                    {title}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: fonts.regular,
                    marginTop: 10,
                  }}
                >
                  Publisher : <Text style={{ fontFamily: fonts.medium, color: colors.accent }}>{publisher}</Text>
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  borderColor: '#e5e5e5',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard(title), setIsCopied(true)
                    setTimeout(() => {
                      setIsCopied(false)
                    }, 5000)
                  }}
                >
                  <Image
                    source={isCopied ? icons.check : icons.copy}
                    style={{
                      width: 23,
                      height: 23,
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      tintColor: isCopied ? 'limegreen' : colors.text,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <TaskAmount coins={reward_coin} endTime={ends_at} />
        <WatchHelp navigation={navigation} taskType={taskType} />
        <View style={{ width: '100%' }}>
          {s === 'rejected' ? <TaskRejectedUI reason={task.remarks} retry={ss} /> : null}
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 10,
              width: '100%',
              gap: 15,
            }}
          >
            {s === 'complete' || s === 'processing' ? (
              <TaskStatusUI status={s} />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                {isExpired ? null : (
                  <>
                    <TouchableOpacity
                      style={[buttons.full, { width: width - 40 }]}
                      activeOpacity={0.8}
                      onPress={() => startTask(index, id, action_url)}
                    >
                      <Text
                        style={[
                          {
                            textAlign: 'center',
                            fontSize: 15,
                            color: 'white',
                            fontFamily: fonts.medium,
                          },
                        ]}
                      >
                        {s === 'rejected' ? 'Retry Task' : 'Start Task'}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}
          </View>
          <SwipeUp
            bottomSwipeIcon={bottomSwipeIcon}
            topSwipeIcon={topSwipeIcon}
            isVisible={index == tasks.length - 1 ? false : true}
          />
        </View>
      </View>
    )
  }
}
