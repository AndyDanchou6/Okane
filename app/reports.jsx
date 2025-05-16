import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";

const Reports = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors["light"];

  return (
    <View style={[styles.main, { backgroundColor: theme.background }]}>
      <Text>Reports</Text>
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
