import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, shadows } from '@/constants/colors';
import { typography } from '@/constants/typography';
import type { EmergencyService } from '@/types/service';

type Props = {
  service: EmergencyService;
  onPress: () => void;
};

export function ServiceRow({ service, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.iconBox}>
        <SymbolView name={service.icon} size={23} tintColor={colors.orange} fallback={<Text style={styles.fallbackIcon}>+</Text>} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.description}>{service.description}</Text>
      </View>
      <SymbolView name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} size={18} tintColor={colors.mutedLight} fallback={<Text style={styles.chevron}>{'>'}</Text>} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 86,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    ...shadows.card,
  },
  pressed: { opacity: 0.82, transform: [{ scale: 0.995 }] },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.softOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, gap: 5 },
  title: { ...typography.bodyStrong, color: colors.navy, fontFamily: typography.family },
  description: { ...typography.small, color: colors.muted, fontFamily: typography.family },
  fallbackIcon: { color: colors.orange, fontSize: 20, fontWeight: '600' },
  chevron: { color: colors.mutedLight, fontSize: 18, lineHeight: 22 },
});
