import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="booking/service/[serviceId]" />
        <Stack.Screen name="booking/address" />
        <Stack.Screen name="booking/urgency" />
        <Stack.Screen name="booking/summary" />
        <Stack.Screen name="booking/payment" />
        <Stack.Screen name="booking/create-account" />
        <Stack.Screen name="booking/confirmation" />
        <Stack.Screen name="booking-status/[bookingId]" />
        <Stack.Screen name="tracking/[bookingId]" />
      </Stack>
    </>
  );
}
