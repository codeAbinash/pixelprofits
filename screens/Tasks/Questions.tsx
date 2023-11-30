import { ScrollView, Text, TextInput, View } from 'react-native'
import styles from '../login/styles'
import { useState } from 'react'
import { fonts } from '../../styles/fonts'
import ButtonFull from '../../components/ButtonFull'

type Question = {
  id: number
  question: string
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
  },
  {
    id: 2,
    question: 'Who is CEO of Tesla?',
  },
  {
    id: 3,
    question: 'The iPhone was created by which company?',
  },
  {
    id: 4,
    question: 'How many Harry Potter books are there?',
  },
  {
    id: 5,
    question: 'What is the capital of France?',
  },
  // {
  //   id: 6,
  //   question: 'Who is CEO of Tesla?',
  // },
  // {
  //   id: 7,
  //   question: 'The iPhone was created by which company?',
  // },
  // {
  //   id: 8,
  //   question: 'How many Harry Potter books are there?',
  // },
  // {
  //   id: 9,
  //   question: 'What is the capital of France?',
  // },
  // {
  //   id: 10,
  //   question: 'Who is CEO of Tesla?',
  // },
  // {
  //   id: 11,
  //   question: 'The iPhone was created by which company?',
  // },
  // {
  //   id: 12,
  //   question: 'How many Harry Potter books are there?',
  // },
]

export default function Questions() {
  return (
    <View className='flex-1 items-center bg-white'>
      <ScrollView className='w-full flex-1 p-5 pt-0'>
        {questions.map((question, index) => (
          <Question key={question.id} question={question} index={index} />
        ))}
      </ScrollView>
      <View className='w-full flex-none gap-1 p-5 pb-1'>
        <ButtonFull
          title='Submit Answers'
          onPress={() => {}}
          style={{ backgroundColor: '#000', borderRadius: 10 }}
          textStyle={{ fontFamily: fonts.bold }}
        />
        <Text className='text-center'>For multiple answers separate them with a comma.</Text>
      </View>
    </View>
  )
}

function Question({ question, index }: { question: Question; index: number }) {
  const [answer, setAnswer] = useState<string>('')
  return (
    <View className='flex-none gap-1.5 pt-5'>
      <Text className='text-black' style={{ fontFamily: fonts.regular, fontSize: 16 }}>
        {index + 1}. {question.question}
      </Text>
      <TextInput
        className='rounded-xl bg-black/5 p-3 px-5 text-black'
        value={answer}
        onChangeText={(text) => setAnswer(text)}
        placeholder='Enter your answer here'
        style={{ fontFamily: fonts.regular }}
      />
    </View>
  )
}
