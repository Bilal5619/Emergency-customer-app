import { StyleSheet, Text, View } from 'react-native';

import { colors, shadows } from '@/constants/colors';
import { typography } from '@/constants/typography';
import type { Address } from '@/types/address';

export function AddressCard({ address }: { address: Address }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Saved address</Text>
      <Text style={styles.line}>{address.line1}</Text>
      {address.line2 ? <Text style={styles.line}>{address.line2}</Text> : null}
      <Text style={styles.line}>{address.city}</Text>
      <Text style={styles.line}>{address.postcode}</Text>
      {address.notes ? <Text style={styles.notes}>{address.notes}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    gap: 5,
    ...shadows.soft,
  },
  label: { ...typography.smallMedium, color: colors.orange, fontFamily: typography.family, marginBottom: 4 },
  line: { ...typography.bodyMedium, color: colors.navy, fontFamily: typography.family },
  notes: { ...typography.small, color: colors.muted, fontFamily: typography.family, marginTop: 8 },
});
