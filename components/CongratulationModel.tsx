import { Dimensions, Image, Modal, Text, View } from 'react-native'
import images from '../assets/images/images'
import icons from '../assets/icons/icons'
import ButtonFull from './ButtonFull'
import { fonts } from '../styles/fonts'

const { width, height } = Dimensions.get('window')

export default function CongratulationModal({
  congratulationModal,
  setCongratulationModal,
}: {
  congratulationModal: {
    visible: boolean
    coins: number
    text: string
    onPress?: () => void
  }
  setCongratulationModal: any
}) {
  return (
    <Modal animationType='fade' transparent={true} visible={congratulationModal.visible}>
      <View
        className='flex-1 items-center justify-center bg-[#00000044]'
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.15)',
          width: '100%',
        }}
      >
        <View
          className='overflow-hidden rounded-2xl bg-white'
          style={{
            width: width * 0.85,
            overflow: 'hidden',
            borderRadius: 20,
            backgroundColor: '#fff',
            shadowColor: '#000',
          }}
        >
          <Image
            source={images.congrats}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: (561 / 1000) * width * 0.85,
            }}
            className=' mx-auto'
          />
          <View
            className='mt-5 flex-row items-center justify-center'
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <View
              className='flex-row items-center justify-center rounded-xl bg-[#00000010] p-3 px-4'
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: '#00000010',
                padding: 10,
                paddingHorizontal: 20,
                gap: 10,
              }}
            >
              <Image source={icons.coin} style={{ resizeMode: 'contain', width: 30, height: 30 }} />
              <Text
                className='ml-3 text-center text-3xl text-[#000]'
                style={{ fontFamily: fonts.bold, fontSize: 30, color: '#000', textAlign: 'center' }}
              >
                {congratulationModal.coins || ''}
              </Text>
            </View>
          </View>

          <View
            className='p-10'
            style={{
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <Text
              className='mb-5 text-center text-base text-[#000]'
              style={{ fontFamily: fonts.medium, fontSize: 16, color: '#000', textAlign: 'center' }}
            >
              {congratulationModal.text}
            </Text>
            <ButtonFull
              title='Ok'
              onPress={() => {
                setCongratulationModal({
                  visible: false,
                  coins: 0,
                  text: 'You have successfully claimed 100 coins.',
                })

                if (congratulationModal.onPress) congratulationModal.onPress()
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
