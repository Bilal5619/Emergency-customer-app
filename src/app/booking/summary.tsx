import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AddressCard } from '@/components/AddressCard';
import { AppHeader } from '@/components/AppHeader';
import { PriceBreakdown } from '@/components/PriceBreakdown';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors, shadows } from '@/constants/colors';
import { getProblem, getService, getUrgency, savedAddress } from '@/constants/mockData';
import { typography } from '@/constants/typography';

export default function SummaryScreen() {
  const params = useLocalSearchParams<{ serviceId: string; issueId: string; urgencyId: string }>();
  const service = getService(params.serviceId);
  const problem = getProblem(params.serviceId, params.issueId);
  const urgency = getUrgency(params.urgencyId);

  return (
    <Screen>
      <AppHeader title="Booking summary" />
      <View style={styles.card}>
        <SummaryRow label="Service" value={service.name} />
        <SummaryRow label="Issue" value={problem.title} />
        <SummaryRow label="Urgency" value={urgency.title} />
      </View>
      <AddressCard address={savedAddress} />
      <PriceBreakdown />
      <PrimaryButton onPress={() => router.push({ pathname: '/booking/payment', params })}>Continue to payment</PrimaryButton>
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
  label: { ...typography.small, color: colors.muted, fontFamily: typography.family },
  value: { ...typography.bodyStrong, color: colors.navy, fontFamily: typography.family },
});
