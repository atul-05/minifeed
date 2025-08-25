import { TabIcon } from "@/components/TabIcon";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="feed" color={color} size={size} /> // Using a vector icon
          ),
        }}
      />
      <Tabs.Screen
        name="compose"
        options={{
          title: "Compose",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="edit" color={color} size={size} /> // Using a vector icon
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="user" color={color} size={size} /> // Using a vector icon
          ),
        }}
      />
    </Tabs>
  );
}
