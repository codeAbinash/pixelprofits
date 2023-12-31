import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import { colors } from '../../styles/colors'

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{ padding: 20 }}>
        <Text className='mb-3 text-2xl font-bold text-[#000]'>Terms and Conditions</Text>
        <Text style={styles.para}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae nisl nec nunc aliquet lacinia. Sed
          euismod, nisl eget aliquam tincidunt, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
          Nulla facilisi.
        </Text>
        <Text style={styles.para}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae nisl nec nunc aliquet lacinia. Sed
          euismod, nisl eget aliquam tincidunt, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
          Nulla facilisi.
        </Text>
        <Text style={styles.para}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae nisl nec nunc aliquet lacinia. Sed
          euismod, nisl eget aliquam tincidunt, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
          Nulla facilisi.
        </Text>
        <Text style={styles.para}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae nisl nec nunc aliquet lacinia. Sed
          euismod, nisl eget aliquam tincidunt, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
          Nulla facilisi.
        </Text>
        <Text style={styles.para}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae nisl nec nunc aliquet lacinia. Sed
          euismod, nisl eget aliquam tincidunt, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
          Nulla facilisi.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TermsAndConditions

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    flex: 1,
  },
  para: {
    color: colors.gray,
    marginTop: 10,
  },
})
