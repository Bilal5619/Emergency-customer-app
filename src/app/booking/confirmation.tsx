import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AddressCard } from '@/components/AddressCard';
import { AppHeader } from '@/components/AppHeader';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { StatusBadge } from '@/components/StatusBadge';
import { colors, shadows } from '@/constants/colors';
import { formatCurrency, mockTotal, savedAddress } from '@/constants/mockData';
import { typography } from '@/constants/typography';

export default function ConfirmationScreen() {
  return (
    <Screen>
      <AppHeader title="Booking confirmed" subtitle="Reference EA-10452" />
      <View style={styles.card}>
        <SummaryRow label="Service" value="Emergency Plumbing" />
        <SummaryRow label="Amount" value={formatCurrency(mockTotal)} />
        <View style={styles.badgeRow}>
          <Text style={styles.label}>Status</Text>
          <StatusBadge status="finding_engineer" />
        </View>
      </View>
      <AddressCard address={savedAddress} />
      <PrimaryButton onPress={() => router.push('/booking-status/active')}>View booking</PrimaryButton>
    </Screen>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 18, gap: 13, ...shadows.soft },
  row: { gap: 4 },
  badgeRow: { gap: 8, alignItems: 'flex-start' },
  label: { ...typography.small, color: colors.muted, fontFamily: typography.family },
  value: { ...typography.bodyStrong, color: colors.navy, fontFamily: typography.family },
});
