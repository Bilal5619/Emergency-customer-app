import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";

function TabIcon({
  focused,
  name,
}: {
  focused: boolean;
  name: { ios: string; android: string; web: string };
}) {
  return (
    <SymbolView
      name={name as never}
      size={22}
      tintColor={focused ? colors.orange : colors.muted}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          minHeight: 72,
          height: 72,

          paddingTop: 8,
          paddingBottom: 10,

          borderTopWidth: 1,
          borderTopColor: "#EEF1F4",

          backgroundColor: "#FFFFFF",

          shadowColor: colors.navy,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.03,
          shadowRadius: 8,

          elevation: 4,
        },
        tabBarLabelStyle: {
          ...typography.tab,
          fontFamily: typography.family,
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={{ ios: "house", android: "home", web: "home" }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={{ ios: "doc.text", android: "list_alt", web: "list_alt" }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={{
                ios: "phone",
                android: "support_agent",
                web: "support_agent",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={{
                ios: "person.crop.circle",
                android: "account_circle",
                web: "account_circle",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
