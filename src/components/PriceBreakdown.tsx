import { StyleSheet, Text, View } from 'react-native';

import { colors, shadows } from '@/constants/colors';
import { formatCurrency, mockTotal, priceBreakdown } from '@/constants/mockData';
import { typography } from '@/constants/typography';

export function PriceBreakdown() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Price breakdown</Text>
      {priceBreakdown.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
        </View>
      ))}
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>{formatCurrency(mockTotal)}</Text>
      </View>
    </View>
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
  heading: { ...typography.sectionTitle, color: colors.navy, fontFamily: typography.family, marginBottom: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  label: { ...typography.body, color: colors.muted, fontFamily: typography.family },
  amount: { ...typography.bodyMedium, color: colors.navy, fontFamily: typography.family },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 2 },
  totalLabel: { ...typography.bodyStrong, color: colors.navy, fontFamily: typography.family },
  total: { ...typography.title, color: colors.navy, fontFamily: typography.family },
});
