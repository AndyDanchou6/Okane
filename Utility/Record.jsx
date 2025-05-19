import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "records";

export const LoadRecords = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load items.", e);
    return [];
  }
};

export const SaveRecords = async (recordList) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recordList));
    return true;
  } catch (e) {
    console.error("Failed to save items.", e);
    return false;
  }
};
