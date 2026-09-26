import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, shadows } from "@/constants/colors";
import { formatCurrency } from "@/constants/mockData";
import { typography } from "@/constants/typography";
import type { Booking } from "@/types/booking";

import { StatusBadge } from "./StatusBadge";

type Props = {
  booking: Booking;
  label?: string;
  onPress?: () => void;
};

export function BookingCard({ booking, label, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.topRow}>
        <View style={styles.copy}>
          <Text style={styles.title}>{booking.service}</Text>
          <Text style={styles.reference}>{booking.reference}</Text>
        </View>

        <StatusBadge status={booking.status} />
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View style={styles.issueWrap}>
          <Text style={styles.issueLabel}>Issue</Text>
          <Text style={styles.meta} numberOfLines={1}>
            {booking.issue}
          </Text>
        </View>

        <View style={styles.totalWrap}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>{formatCurrency(booking.total)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,

    borderRadius: 18,

    paddingHorizontal: 18,
    paddingVertical: 17,

    gap: 13,

    ...shadows.soft,
  },

  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.995 }],
  },

  label: {
    ...typography.smallMedium,

    color: colors.orange,
    fontFamily: typography.family,

    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  copy: {
    flex: 1,
    gap: 4,
  },

  title: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,

    fontSize: 16,
  },

  reference: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF1F4",
  },

  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",

    gap: 16,
  },

  issueWrap: {
    flex: 1,
    gap: 3,
  },

  totalWrap: {
    alignItems: "flex-end",
    gap: 3,
  },

  issueLabel: {
    fontSize: 11,
    color: colors.mutedLight,
    fontFamily: typography.family,
  },

  totalLabel: {
    fontSize: 11,
    color: colors.mutedLight,
    fontFamily: typography.family,
  },

  meta: {
    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,
  },

  total: {
    ...typography.bodyMedium,

    color: colors.navy,
    fontFamily: typography.family,

    fontSize: 16,
  },
});
