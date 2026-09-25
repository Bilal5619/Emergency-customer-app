import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { BookingCard } from '@/components/BookingCard';
import { Screen } from '@/components/Screen';
import { bookings } from '@/constants/mockData';

export default function BookingsScreen() {
  return (
    <Screen>
      <AppHeader title="Bookings" subtitle="Track current jobs and view past visits." />
      <View style={styles.list}>
        <BookingCard label="Active booking" booking={bookings[0]} onPress={() => router.push('/booking-status/active')} />
        <BookingCard label="Past booking" booking={bookings[1]} onPress={() => router.push('/booking-status/past')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: 14 },
});
