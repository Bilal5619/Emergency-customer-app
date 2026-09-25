import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, shadows } from '@/constants/colors';
import { formatCurrency } from '@/constants/mockData';
import { typography } from '@/constants/typography';
import type { Booking } from '@/types/booking';

import { StatusBadge } from './StatusBadge';

type Props = {
  booking: Booking;
  label?: string;
  onPress?: () => void;
};

export function BookingCard({ booking, label, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text style={styles.title}>{booking.service}</Text>
          <Text style={styles.reference}>{booking.reference}</Text>
        </View>
        <StatusBadge status={booking.status} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.meta}>{booking.issue}</Text>
        <Text style={styles.total}>{formatCurrency(booking.total)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    gap: 13,
    ...shadows.soft,
  },
  pressed: { opacity: 0.82, transform: [{ scale: 0.995 }] },
  label: { ...typography.smallMedium, color: colors.orange, fontFamily: typography.family, textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  copy: { flex: 1, gap: 4 },
  title: { ...typography.bodyStrong, color: colors.navy, fontFamily: typography.family },
  reference: { ...typography.small, color: colors.muted, fontFamily: typography.family },
  footer: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  meta: { ...typography.body, flex: 1, color: colors.muted, fontFamily: typography.family },
  total: { ...typography.bodyMedium, color: colors.navy, fontFamily: typography.family },
});
