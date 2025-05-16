import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/Colors";

const Category = (props) => (
  <TouchableOpacity
    style={[
      styles.categoryItem,
      props.isSelected && { backgroundColor: Colors.primary },
    ]}
    onPress={props.onPress}
  >
    <Ionicons name={props.icon} size={24} color="#444" />
    <Text>{props.name}</Text>
  </TouchableOpacity>
);

export default Category;

const styles = StyleSheet.create({
  categoryItem: {
    width: "30%",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
