import { Tabs } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import UpdateRecord from "./update_record";

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors["light"];

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          paddingTop: 10,
          height: 120,
        },
        headerStyle: {
          backgroundColor: theme.navBackground,
        },
        headerTintColor: theme.text,
        tabBarInactiveTintColor: theme.iconColor,
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Records",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "document" : "document-outline"}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          href: null,
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "bar-chart" : "bar-chart-outline"}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add_record"
        options={{
          title: "Add record",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={28}
              name={focused ? "add-circle" : "add-circle-outline"}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="charts"
        options={{
          title: "Charts",
          href: null,
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "pie-chart" : "pie-chart-outline"}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          href: null,
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "settings" : "settings-outline"}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="update_record"
        options={{
          href: null,
          headerShown: true,
          title: "Update Record",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
