import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

const Settings = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors['light']

  return (
    <View style={[styles.main, {backgroundColor: theme.background}]}>
      <Text>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
})