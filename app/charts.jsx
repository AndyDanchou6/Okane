import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const Charts = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors["light"];

  return (
    <View style={[styles.main, { backgroundColor: theme.background }]}>
      <Text>Under Development</Text>
    </View>
  );
};

export default Charts;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
