import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { API_URL } from '../../appData'
import ButtonFull from '../../components/ButtonFull'
import CongratulationModal from '../../components/CongratulationModel'
import CustomModal from '../../components/CustomModal'
import { fonts } from '../../styles/fonts'
import { getDefaultHeader } from '../methods'
import { QuestionT } from '../types'

function getAnswersObj(questions: QuestionT[]) {
  const answers: { [key: number]: string } = {}
  questions.forEach((question, index) => {
    if (question.required === 'yes') {
      answers[index] = ''
    }
  })
  return answers
}

function isAllRequiredFilled(requiredAnswers: { [key: number]: string }) {
  let allRequiredAnswersFilled = true
  Object.values(requiredAnswers).forEach((answer) => {
    answer = answer.trim()
    if (!answer) allRequiredAnswersFilled = false
  })
  return allRequiredAnswersFilled
}

function generateSubmitObject(requiredAnswers: { [key: number]: string }, task_id: number) {
  const answers: { [key: string]: string } = {
    task_id: task_id.toString(),
  }
  const keys = Object.keys(requiredAnswers)
  keys.forEach((key, index) => {
    const i = Number(key) + 1
    answers['answer_' + (index + 1)] = requiredAnswers[i - 1]
  })
  return answers
}

export default function Questions({ navigation, route }: { navigation: any; route: any }) {
  const questions = route.params.question as QuestionT[]
  const task_id = route.params.id as number
  const [requiredAnswers, setRequiredAnswers] = useState(getAnswersObj(questions))
  const [modals, setModals] = useState<any>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [congratulationModal, setCongratulationModal] = useState({
    visible: false,
    coins: 0,
    text: '',
    onPress: () => {},
  })
  console.log(requiredAnswers)

  async function handelSubmit() {
    // Check if all required answers are filled
    let allRequiredAnswersFilled = isAllRequiredFilled(requiredAnswers)
    if (!allRequiredAnswersFilled)
      return setModals([
        {
          title: 'Required Answers',
          description: 'Please fill all the required answers. Required answers are marked with *.',
          type: 'error',
          active: true,
        },
      ])

    setIsSubmitting(true)

    try {
      const data = await fetch(API_URL.submit_answers, {
        method: 'POST',
        headers: getDefaultHeader(await AsyncStorage.getItem('token')),
        body: JSON.stringify(generateSubmitObject(requiredAnswers, task_id)),
      })

      const response = await data.json()
      setIsSubmitting(false)
      console.log(response)

      if (response.status === false) {
        setModals([
          {
            title: <Text className='text-red'>Wrong Answer</Text>,
            description: 'The answer you submitted is wrong. Please try again.',
            type: 'error',
            active: true,
          },
        ])
      } else if (response.status === true) {
        setCongratulationModal({
          visible: true,
          coins: response.reward,
          text: `You have successfully claimed ${response.reward} coins.`,
          onPress: () => {
            navigation.goBack()
          },
        })
      }
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
      setModals([
        {
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          type: 'error',
          active: true,
        },
      ])
    }
  }

  useEffect(() => {
    console.log(questions)
  }, [questions])

  return (
    <View className='flex-1 items-center bg-white'>
      <CustomModal modals={modals} updater={setModals} />
      <ScrollView className='w-full flex-1 p-5 pt-0'>
        {questions.map((question, index) => {
          return (
            <Question
              key={question.id}
              question={question}
              index={index}
              setAnswer={(text) => {
                if (question.required === 'yes') setRequiredAnswers((prev) => ({ ...prev, [index]: text }))
              }}
            />
          )
        })}
      </ScrollView>

      <View className='w-full flex-none gap-1 p-5 pb-1'>
        <ButtonFull
          title={isSubmitting ? 'Submitting...' : 'Submit Answers'}
          onPress={handelSubmit}
          style={{ backgroundColor: '#000', borderRadius: 10 }}
          textStyle={{ fontFamily: fonts.bold }}
          disabled={isSubmitting}
        />
        <Text className='text-center'>For multiple answers separate them with a comma.</Text>
      </View>
      <CongratulationModal congratulationModal={congratulationModal} setCongratulationModal={setCongratulationModal} />
    </View>
  )
}

function Question({
  question,
  index,
  setAnswer,
}: {
  question: QuestionT
  index: number
  setAnswer: (text: string) => void
}) {
  return (
    <View className='flex-none gap-1.5 pt-5'>
      <Text className='text-black' style={{ fontFamily: fonts.regular, fontSize: 16 }}>
        {index + 1}. {question.question} {question.required === 'yes' && ' *'}
      </Text>
      <TextInput
        className='rounded-xl bg-black/5 p-3 px-5 text-black'
        onChangeText={setAnswer}
        // value={answer}
        placeholder='Enter your answer here'
        style={{ fontFamily: fonts.regular }}
        placeholderTextColor={'gray'}
      />
    </View>
  )
}
