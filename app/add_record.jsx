import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Colors";
import Category from "../components/Category";
import { Expense } from "../constants/Expense";
import { Income } from "../constants/Income";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useEffect } from "react";
import { LoadRecords, SaveRecords } from "../Utility/Record";

const expenseCategories = Expense;
const incomeCategories = Income;

const AddRecord = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amountValue, setAmountValue] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState(null);
  const [records, setRecords] = useState([]);

  const handleCategorySelect = (item) => {
    setIsCategorySelected(true);
    setSelectedCategory(item);

    if (
      selectedCategory?.name === item.name &&
      selectedCategory?.category === item.category
    ) {
      setIsCategorySelected(false);
      setSelectedCategory(null);
    }
  };

  const checkIfSelectedCategory = (item) => {
    return (
      selectedCategory?.name === item.name &&
      selectedCategory?.category === item.category
    );
  };

  const addRecord = async () => {
    let newRecord = {
      icon: selectedCategory.icon,
      iconIndex: selectedCategory.iconIndex,
      description: descriptionValue ?? "N/A",
      category: selectedCategory.category,
      amount: amountValue,
    };
    let newRecords = [...records, newRecord];
    const response = await SaveRecords(newRecords);

    if (response) {
      setRecords(newRecords);
      alert("Success");
    } else {
      alert("Error saving data");
    }
  };

  const handleSubmit = () => {
    if (amountValue) {
      addRecord();
      setIsCategorySelected(false);
      setSelectedCategory(null);
      setAmountValue(null);
      setDescriptionValue(null);
    } else {
      alert("Please add amount");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await LoadRecords();
        setRecords(data);
      };

      load();
    }, [])
  );

  return (
    <View style={styles.main}>
      <ScrollView
        style={[styles.categories, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.sectionTitle, { color: theme.title }]}>
          Expense Categories
        </Text>
        <View style={styles.categorySection}>
          {expenseCategories.map((item, index) => (
            <Category
              key={index}
              name={item.name}
              iconIndex={index}
              icon={item.icon}
              onPress={() => handleCategorySelect(item)}
              isSelected={checkIfSelectedCategory(item)}
            />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.title }]}>
          Income Categories
        </Text>
        <View style={styles.categorySection}>
          {incomeCategories.map((item, index) => (
            <Category
              key={index}
              name={item.name}
              iconIndex={index}
              icon={item.icon}
              onPress={() => handleCategorySelect(item)}
              isSelected={checkIfSelectedCategory(item)}
            />
          ))}
        </View>
      </ScrollView>

      {/* input section */}
      {isCategorySelected && (
        <View style={[styles.amount, { backgroundColor: theme.inputBg }]}>
          <TextInput
            style={[styles.amountInput, { backgroundColor: theme.input }]}
            placeholder="0.00"
            keyboardType="numeric"
            onChangeText={setAmountValue}
          />
          <TextInput
            style={[
              styles.amountDescription,
              { backgroundColor: theme.input, color: theme.text },
            ]}
            placeholder="Description"
            onChangeText={setDescriptionValue}
          />
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: theme.buttonColor },
            ]}
            onPress={handleSubmit}
          >
            <Text style={[{ color: theme.buttonText }]}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddRecord;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  categories: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  categorySection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  amount: {
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  amountInput: {
    paddingHorizontal: 16,
    margin: 10,
    borderRadius: 20,
  },
  amountDescription: {
    paddingHorizontal: 16,
    margin: 10,
    borderRadius: 20,
  },
  submitButton: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    fontSize: 14,
  },
});
