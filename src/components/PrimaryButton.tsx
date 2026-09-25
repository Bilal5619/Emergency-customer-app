import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, shadows } from '@/constants/colors';
import { typography } from '@/constants/typography';

type Props = PropsWithChildren<{
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}>;

export function PrimaryButton({ children, onPress, disabled = false, style }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, disabled && styles.disabled, pressed && styles.pressed, style]}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    ...shadows.soft,
  },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  text: {
    ...typography.button,
    color: colors.navy,
    fontFamily: typography.family,
  },
});
