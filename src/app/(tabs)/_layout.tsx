import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

function TabIcon({ focused, name }: { focused: boolean; name: { ios: string; android: string; web: string } }) {
  return <SymbolView name={name as never} size={21} tintColor={focused ? colors.orange : colors.muted} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          minHeight: 68,
          paddingTop: 7,
          paddingBottom: 9,
          borderTopWidth: 0,
          backgroundColor: colors.white,
          shadowColor: colors.navy,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.04,
          shadowRadius: 12,
          elevation: 6,
        },
        tabBarLabelStyle: {
          ...typography.tab,
          fontFamily: typography.family,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={{ ios: 'house', android: 'home', web: 'home' }} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={{ ios: 'doc.text', android: 'list_alt', web: 'list_alt' }} />,
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Support',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={{ ios: 'phone', android: 'support_agent', web: 'support_agent' }} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={{ ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' }} />,
        }}
      />
    </Tabs>
  );
}
