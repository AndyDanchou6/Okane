import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import Entry from "../components/Entry";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { router } from "expo-router";

const Home = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const STORAGE_KEY = "records";
  const [records, setRecords] = useState([]);
  const [expenses, setExpenses] = useState(0);
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isNegativeBalance, setIsNegativeBalance] = useState(false);
  const [isRecordPressed, setIsRecordPressed] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState([]);

  const loadRecords = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        let parsed = JSON.parse(data);
        setRecords(parsed);
        compute(parsed);
      }
    } catch (e) {
      console.error("Failed to load items.", e);
      alert("Failed to load records. Please restart the app.");
    }
  };

  const compute = (recordLists) => {
    let totalExpenses = 0;
    let totalIncome = 0;

    recordLists.forEach((record) => {
      const amount = parseFloat(record.amount);

      if (record.category === "expense") {
        totalExpenses += amount;
      } else if (record.category === "income") {
        totalIncome += amount;
      }
    });

    let balance = totalIncome - totalExpenses;

    setIsNegativeBalance(balance < 0);
    setExpenses(totalExpenses);
    setBudget(totalIncome);
    setBalance(balance);
  };

  const handleRecordPress = (pressed) => {
    setIsRecordPressed(true);
    setSelectedRecord(pressed);

    router.push({
      pathname: "update_record",
      params: { record: JSON.stringify(pressed) },
    });
  };

  useFocusEffect(() => {
    loadRecords();
  });

  // debug
  useEffect(() => {
    console.log(isRecordPressed, selectedRecord);
  }, [isRecordPressed, selectedRecord]);

  return (
    <View style={[styles.main, { backgroundColor: theme.background }]}>
      <View style={[styles.overview, { backgroundColor: theme.navBackground }]}>
        <View style={[styles.summary]}>
          <Text style={[{ color: theme.text }]}>Expenses</Text>
          <Text style={[styles.text, { color: theme.text }]}>{expenses}</Text>
        </View>
        <View style={[styles.summary]}>
          <Text style={[{ color: theme.text }]}>Budget</Text>
          <Text style={[styles.text, { color: theme.text }]}>{budget}</Text>
        </View>
        <View style={[styles.summary]}>
          <Text style={[{ color: theme.text }]}>Balance</Text>
          <Text
            style={[
              styles.text,
              { color: theme.text },
              isNegativeBalance && { color: Colors.danger },
            ]}
          >
            {balance}
          </Text>
        </View>
      </View>
      <ScrollView>
        {records.map((record, index) => (
          <Entry
            key={index}
            description={record.description}
            icon={record.icon}
            amount={record.amount}
            category={record.category}
            onPress={() => handleRecordPress(record)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  overview: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  summary: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  text: {
    fontSize: 20,
    fontWeight: 400,
  },
});
