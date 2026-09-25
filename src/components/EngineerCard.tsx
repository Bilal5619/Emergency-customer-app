import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import { colors, shadows } from '@/constants/colors';
import { typography } from '@/constants/typography';
import type { Engineer } from '@/types/engineer';

export function EngineerCard({ engineer }: { engineer: Engineer }) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <SymbolView name={{ ios: 'person.fill', android: 'person', web: 'person' }} size={24} tintColor={colors.orange} fallback={<Text style={styles.initials}>JM</Text>} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.name}>{engineer.name}</Text>
        <Text style={styles.meta}>{engineer.role}</Text>
        <Text style={styles.meta}>{engineer.rating.toFixed(1)} rating · {engineer.vehicle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    ...shadows.soft,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.softOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { color: colors.orange, fontWeight: '600' },
  copy: { flex: 1, gap: 4 },
  name: { ...typography.bodyStrong, color: colors.navy, fontFamily: typography.family },
  meta: { ...typography.small, color: colors.muted, fontFamily: typography.family },
});
