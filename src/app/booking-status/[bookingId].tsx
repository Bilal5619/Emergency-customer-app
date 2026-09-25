import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AddressCard } from '@/components/AddressCard';
import { AppHeader } from '@/components/AppHeader';
import { EngineerCard } from '@/components/EngineerCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { SecondaryButton } from '@/components/SecondaryButton';
import { StatusBadge } from '@/components/StatusBadge';
import { colors, shadows } from '@/constants/colors';
import { bookings, formatCurrency } from '@/constants/mockData';
import { typography } from '@/constants/typography';
import type { BookingStatus } from '@/types/booking';

const timeline: { status: BookingStatus; label: string }[] = [
  { status: 'finding_engineer', label: 'Booking received' },
  { status: 'engineer_assigned', label: 'Engineer assigned' },
  { status: 'on_the_way', label: 'On the way' },
  { status: 'arrived', label: 'Arrived' },
  { status: 'completed', label: 'Job completed' },
];

const statusIndex: Record<BookingStatus, number> = {
  finding_engineer: 0,
  engineer_assigned: 1,
  on_the_way: 2,
  arrived: 3,
  completed: 4,
};

export default function BookingStatusScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const booking = bookings.find((item) => item.id === bookingId) ?? bookings[0];
  const activeIndex = statusIndex[booking.status];

  return (
    <Screen>
      <AppHeader title={booking.reference} subtitle={`${booking.service} · ${booking.issue}`} />
      <View style={styles.card}>
        <Info label="Payment status" value={booking.paymentStatus} />
        <Info label="Total" value={formatCurrency(booking.total)} />
        <View style={styles.statusWrap}>
          <Text style={styles.label}>Status</Text>
          <StatusBadge status={booking.status} />
        </View>
      </View>
      <AddressCard address={booking.address} />
      <View style={styles.card}>
        <Text style={styles.heading}>Progress</Text>
        {timeline.map((item, index) => (
          <View key={item.status} style={styles.timelineRow}>
            <View style={[styles.dot, index <= activeIndex && styles.dotActive]} />
            <Text style={[styles.timelineText, index <= activeIndex && styles.timelineTextActive]}>{item.label}</Text>
          </View>
        ))}
      </View>
      {booking.engineer ? (
        <>
          <EngineerCard engineer={booking.engineer} />
          <View style={styles.actions}>
            <SecondaryButton style={styles.action}>Call Engineer</SecondaryButton>
            <SecondaryButton style={styles.action}>Message</SecondaryButton>
          </View>
          <PrimaryButton onPress={() => router.push(`/tracking/${booking.id}`)}>View live tracking</PrimaryButton>
        </>
      ) : null}
    </Screen>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 18, gap: 13, ...shadows.soft },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  label: { ...typography.small, color: colors.muted, fontFamily: typography.family },
  value: { ...typography.bodyMedium, color: colors.navy, fontFamily: typography.family },
  statusWrap: { gap: 8, alignItems: 'flex-start' },
  heading: { ...typography.sectionTitle, color: colors.navy, fontFamily: typography.family },
  timelineRow: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 36 },
  dot: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.borderStrong },
  dotActive: { backgroundColor: colors.orange },
  timelineText: { ...typography.body, color: colors.muted, fontFamily: typography.family },
  timelineTextActive: { color: colors.navy, fontWeight: '500' },
  actions: { flexDirection: 'row', gap: 10 },
  action: { flex: 1 },
});
