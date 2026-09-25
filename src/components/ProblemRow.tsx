import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, shadows } from '@/constants/colors';
import { typography } from '@/constants/typography';
import type { Problem } from '@/types/service';

type Props = {
  problem: Problem;
  onPress: () => void;
};

export function ProblemRow({ problem, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.copy}>
        <Text style={styles.title}>{problem.title}</Text>
        {problem.description ? <Text style={styles.description}>{problem.description}</Text> : null}
      </View>
      <SymbolView name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} size={18} tintColor={colors.mutedLight} fallback={<Text style={styles.chevron}>{'>'}</Text>} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    ...shadows.soft,
  },
  pressed: { opacity: 0.82, transform: [{ scale: 0.995 }] },
  copy: { flex: 1, gap: 4 },
  title: { ...typography.bodyStrong, color: colors.navy, fontFamily: typography.family },
  description: { ...typography.small, color: colors.muted, fontFamily: typography.family },
  chevron: { color: colors.mutedLight, fontSize: 18, lineHeight: 22 },
});
