import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { colors, shadows } from '@/constants/colors';
import { urgencyOptions } from '@/constants/mockData';
import { typography } from '@/constants/typography';

export default function UrgencyScreen() {
  const params = useLocalSearchParams<{ serviceId: string; issueId: string }>();

  return (
    <Screen>
      <AppHeader title="When do you need help?" />
      <View style={styles.list}>
        {urgencyOptions.map((urgency) => (
          <Pressable
            key={urgency.id}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/booking/summary', params: { ...params, urgencyId: urgency.id } })}
            style={({ pressed }) => [styles.option, pressed && styles.pressed]}>
            <View style={styles.copy}>
              <Text style={styles.title}>{urgency.title}</Text>
              <Text style={styles.description}>{urgency.description}</Text>
            </View>
            <Text style={styles.price}>{urgency.priceNote}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: 14 },
  option: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 17,
    paddingHorizontal: 18,
    ...shadows.soft,
  },
  pressed: { opacity: 0.82, transform: [{ scale: 0.995 }] },
  copy: { flex: 1, gap: 4 },
  title: { ...typography.bodyStrong, color: colors.navy, fontFamily: typography.family },
  description: { ...typography.body, color: colors.muted, fontFamily: typography.family },
  price: { ...typography.bodyMedium, color: colors.orange, fontFamily: typography.family },
});
