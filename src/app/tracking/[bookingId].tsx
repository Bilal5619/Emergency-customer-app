import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { EngineerCard } from "@/components/EngineerCard";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { useBooking } from "@/context/BookingContext";

export default function TrackingScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { bookings, getBookingById } = useBooking();
  const booking = getBookingById(bookingId) ?? bookings[0];
  const assignedEngineer = booking.engineer ?? bookings[0].engineer;

  return (
    <Screen>
      <AppHeader title="John is on the way" subtitle="ETA 18 minutes" />
      <View style={styles.map}>
        <View style={[styles.point, styles.engineerPoint]}>
          <Text style={styles.pointText}>Engineer</Text>
        </View>
        <View style={styles.route} />
        <View style={[styles.point, styles.customerPoint]}>
          <Text style={styles.pointText}>Customer</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>ETA</Text>
          <Text style={styles.statValue}>18 minutes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={styles.statValue}>4.2 miles</Text>
        </View>
      </View>
      {assignedEngineer ? <EngineerCard engineer={assignedEngineer} /> : null}
      <View style={styles.actions}>
        <SecondaryButton style={styles.action}>Call</SecondaryButton>
        <SecondaryButton style={styles.action}>Message</SecondaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 292,
    borderRadius: 22,
    backgroundColor: "#EEF4F3",
    overflow: "hidden",
    padding: 22,
    justifyContent: "space-between",
    ...shadows.soft,
  },
  point: {
    width: 116,
    minHeight: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  engineerPoint: { alignSelf: "flex-start", backgroundColor: colors.orange },
  customerPoint: { alignSelf: "flex-end", backgroundColor: colors.navy },
  pointText: {
    ...typography.smallMedium,
    color: colors.white,
    fontFamily: typography.family,
  },
  route: {
    position: "absolute",
    left: "28%",
    right: "28%",
    top: "48%",
    height: 5,
    borderRadius: 6,
    backgroundColor: colors.white,
    transform: [{ rotate: "-28deg" }],
  },
  stats: { flexDirection: "row", gap: 12 },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    gap: 5,
    ...shadows.soft,
  },
  statLabel: {
    ...typography.small,
    color: colors.muted,
    fontFamily: typography.family,
  },
  statValue: {
    ...typography.bodyStrong,
    color: colors.navy,
    fontFamily: typography.family,
  },
  actions: { flexDirection: "row", gap: 10 },
  action: { flex: 1 },
});
