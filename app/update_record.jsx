import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useLocalSearchParams, router } from "expo-router";
import { Colors } from "../constants/Colors";
import { useCallback, useEffect, useState } from "react";
import { LoadRecords, SaveRecords } from "../Utility/Record";

const UpdateRecord = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const params = useLocalSearchParams();
  const parsedRecord = JSON.parse(params.record);
  const category = capitalizeFirst(parsedRecord.category);

  const [getRecords, setGetRecords] = useState([]);
  const [amountInput, setAmountInput] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await LoadRecords();
      setGetRecords(data);
    };

    load();
  }, [params.id, params.record]);

  const saveAndUpdateRecords = async (updatedRecords, operation) => {
    const response = await SaveRecords(updatedRecords);

    if (response) {
      setGetRecords(updatedRecords);
      setAmountInput(null);
      setDescriptionInput(null);

      if (operation === "delete") alert("Record Deleted");
      if (operation === "update") alert("Record Updated");

      router.push({
        pathname: "/",
      });
    } else {
      alert("Record not deleted");
    }
  };

  const handleUpdate = () => {
    const index = parseInt(params.id);
    let newRecord = [...getRecords];

    newRecord[index] = {
      ...newRecord[index],
      ...(amountInput && { amount: amountInput }),
      ...(descriptionInput && { description: descriptionInput }),
    };

    saveAndUpdateRecords(newRecord, "update");
  };

  const handleDelete = () => {
    const recordCopy = [...getRecords];
    const index = parseInt(params.id);

    recordCopy.splice(index, 1);
    saveAndUpdateRecords(recordCopy, "delete");
  };

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
        <Text style={[styles.inputText, { color: theme.text }]}>Amount</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: Colors.white, color: Colors.black },
          ]}
          placeholder={parsedRecord.amount}
          placeholderTextColor={Colors.black}
          keyboardType="numeric"
          value={amountInput}
          onChangeText={setAmountInput}
        />
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.inputText, { color: theme.text }]}>
          Description
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: Colors.white, color: Colors.black },
          ]}
          placeholder={parsedRecord.description}
          placeholderTextColor={Colors.black}
          value={descriptionInput}
          onChangeText={setDescriptionInput}
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
