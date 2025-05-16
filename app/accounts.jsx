import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

const Accounts = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors['light']

  return (
    <View style={[styles.main, {backgroundColor: theme.background}]}>
      <Text>Accounts</Text>
    </View>
  )
}

export default Accounts

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
})