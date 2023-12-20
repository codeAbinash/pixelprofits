import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { Text, View } from 'react-native'
import OneSignal from 'react-native-onesignal'
import Test from './components/Test'
import Home from './screens/Home'
import InstallAndEarn from './screens/InstallAndEarn'
import Notifications from './screens/Notifications'
import RewardAdScreen from './screens/RewardAdScreen'
import Splash from './screens/Splash'
import EditProfile from './screens/Tabs/Profile/EditProfile'
import ReferHistory from './screens/Tabs/Refer/ReferHistory'
import Promotions from './screens/Tabs/others/Promotion'
import Spin from './screens/Tasks/Spin'
import TaskTutorial from './screens/Tasks/TaskTutorial'
import YouTubeTask from './screens/Tasks/YouTubeTask'
import DailyLimit from './screens/checkDailyLimit/DailyLimit'
import Login from './screens/login/Login'
import OTP from './screens/login/OTP'
import SignUp from './screens/login/SignUp'
import Onboarding from './screens/onboarding/Onboarding'
import Wallet from './screens/wallet/Wallet'

import { ImpressionData, ImpressionDataEvents, IronSource } from 'ironsource-mediation'
import Questions from './screens/Tasks/Questions'
import Update from './screens/Update'

const Stack = createNativeStackNavigator()

function Sample() {
  return (
    <View>
      <Text className='font-bold text-[#ff0000]'>Sample</Text>
    </View>
  )
}
function setImpressionDataListener() {
  ImpressionDataEvents.onImpressionSuccess.setListener((data?: ImpressionData) =>
    console.log(`ImpressionData: ${JSON.stringify(data)}`),
  )
}

const App = () => {
  async function initIronSource() {
    try {
      await IronSource.validateIntegration().catch((e) => console.log(e))
      setImpressionDataListener()

      await IronSource.setAdaptersDebug(true)
      await IronSource.shouldTrackNetworkState(true)
      await IronSource.setConsent(true)

      // await IronSource.setMetaData('is_child_directed', ['false'])

      // await IronSource.setSegment(createSegment())
      const advertiserId = await IronSource.getAdvertiserId()

      console.log(`AdvertiserID: ${advertiserId}`)
      // await IronSource.setUserId('APP_USER_ID')

      await IronSource.init('1999f103d', ['OFFERWALL'])
    } catch (e) {
      console.log(e)
    }
  }

  // useEffect(() => {
  //   // InitializationListener
  //   InitEvent.onInitializationComplete.setListener(() =>
  //     console.log('onInitializationComplete')
  //   )

  //   // init the SDK after all child components mounted
  //   //   and the app becomes active
  //   const subscription = AppState.addEventListener(
  //     'change',
  //     (state: AppStateStatus) => {
  //       if (state === 'active') {
  //         initIronSource()
  //         subscription.remove()
  //       }
  //     }
  //   )

  //   return () => {
  //     InitEvent.removeAllListeners()
  //     subscription.remove()
  //   }
  // }, [])

  useEffect(() => {
    OneSignal.setAppId('925887a2-fc42-47ed-96ca-88a84eff554c')

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
      console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent)
      let notification = notificationReceivedEvent.getNotification()
      console.log('notification: ', notification)
      const data = notification.additionalData
      console.log('additionalData: ', data)
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification)
    })

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log('OneSignal: notification opened:', notification)
    })

    // Prompt notification
    OneSignal.promptForPushNotificationsWithUserResponse()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name='LogIn' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ title: 'Welcome', headerShown: false }} />
        <Stack.Screen name='OTP' component={OTP} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Terms" component={TermsAndConditions} options={{ title: 'Terms & Conditions' }} /> */}
        {/* <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ title: 'Privacy Policy' }} /> */}
        <Stack.Screen name='Notifications' component={Notifications} options={{ title: 'Notifications' }} />
        <Stack.Screen name='Wallet' component={Wallet} options={{ title: 'Wallet', headerShown: false }} />
        <Stack.Screen name='Withdraw' component={Wallet} options={{ title: 'Wallet', headerShown: false }} />
        <Stack.Screen name='Promotions' component={Promotions} options={{ title: 'Promotions' }} />
        <Stack.Screen name='ReferHistory' component={ReferHistory} options={{ title: 'Refer History' }} />
        {/* <Stack.Screen name="About" component={About} options={{ title: 'About Us' }} /> */}
        <Stack.Screen name='Test' component={Test} options={{ title: 'Test' }} />
        <Stack.Screen
          name='YouTubeTask'
          component={YouTubeTask}
          options={{ title: 'YouTube Check-In', headerShown: false }}
        />
        <Stack.Screen
          name='TaskTutorial'
          component={TaskTutorial}
          options={{ title: 'YouTube Check-In Tutorial', headerShown: false }}
        />
        <Stack.Screen name='Spin' component={Spin} options={{ headerShown: false }} />
        <Stack.Screen name='RewardAd' component={RewardAdScreen} options={{ title: 'RewardAd', headerShown: false }} />
        <Stack.Screen name='DailyLimit' component={DailyLimit} options={{ title: 'DailyLimit', headerShown: false }} />
        <Stack.Screen name='EditProfile' component={EditProfile} options={{ title: 'Edit Profile' }} />
        <Stack.Screen
          name='InstallAndEarn'
          component={InstallAndEarn}
          options={{ title: 'Install and Earn', headerShown: false }}
        />
        <Stack.Screen name='Update' component={Update} options={{ title: 'Update Available', headerShown: false }} />
        <Stack.Screen name='questions' component={Questions} options={{ title: 'Questions', headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
