import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import { colors } from '../../styles/colors'

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 15,
            color: colors.text,
          }}
        >
          Terms and Conditions
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

export default PrivacyPolicy

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
