import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const Entry = (props) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors["light"];

  return (
    <TouchableOpacity style={[styles.entry]} onPress={props.onPress}>
      <Ionicons
        style={[styles.category]}
        name={props.icon}
        size={32}
        color={Colors.primary}
      />
      <View style={[styles.entryDetails]}>
        <Text style={[styles.description, { color: theme.text }]}>
          {props.description}
        </Text>
        <Text
          style={[
            styles.amount,
            { color: props.category == "income" ? theme.text : Colors.danger },
          ]}
        >
          {props.category == "income" ? props.amount : "- " + props.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Entry;

const styles = StyleSheet.create({
  entry: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  category: {
    width: 40,
  },

  entryDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  description: {
    paddingLeft: 10,
  },

  amount: {
    paddingRight: 10,
  },
});
