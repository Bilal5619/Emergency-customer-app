import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { BookingCard } from "@/components/BookingCard";
import { Screen } from "@/components/Screen";
import { useBooking } from "@/context/BookingContext";

export default function BookingsScreen() {
  const { bookings } = useBooking();
  return (
    <Screen>
      <AppHeader
        title="Bookings"
        subtitle="Track current jobs and view past visits."
      />
      <View style={styles.list}>
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            label={
              booking.status === "completed"
                ? "Past booking"
                : booking.status === "cancelled"
                  ? "Cancelled booking"
                  : "Active booking"
            }
            booking={booking}
            onPress={() => router.push(`/booking-status/${booking.id}`)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingBottom: 18,
  },
});
