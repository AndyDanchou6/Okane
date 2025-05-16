import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../constants/Colors";

const UpdateRecord = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const { record } = useLocalSearchParams();
  const parsedRecord = JSON.parse(record);
  const category = capitalizeFirst(parsedRecord.category);

  const handleUpdate = () => {};
  const handleDelete = () => {};

  return (
    <View style={[styles.main, { backgroundColor: theme.background }]}>
      <Text
        style={[
          styles.category,
          {
            color:
              parsedRecord.category === "expense"
                ? Colors.danger
                : Colors.primary,
          },
        ]}
      >
        {category}
      </Text>
      <View style={[styles.section]}>
        <Text style={[styles.inputText]}>Amount</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.input }]}
          placeholder={parsedRecord.amount}
          keyboardType="numeric"
        />
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.inputText]}>Description</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.input }]}
          placeholder={parsedRecord.description}
        />
      </View>
      <View style={[styles.buttonSection]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.buttonColor }]}
          onPress={handleUpdate}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Update
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.danger }]}
          onPress={handleDelete}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateRecord;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  category: {
    alignSelf: "center",
    paddingTop: 16,
    fontSize: 24,
  },
  section: {
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  inputText: {
    paddingLeft: 24,
    paddingBottom: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 24,
  },
  buttonSection: {
    marginVertical: 26,
    marginHorizontal: 10,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 30,
  },
});

const capitalizeFirst = (word) => {
  const firstLetter = word[0];
  const rest = word.slice(1);
  return firstLetter.toUpperCase() + rest;
};
