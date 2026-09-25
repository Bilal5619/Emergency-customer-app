import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

type Props = PropsWithChildren<{
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}>;

export function SecondaryButton({ children, onPress, disabled = false, style }: Props) {
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
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
  text: {
    ...typography.button,
    color: colors.navy,
    fontFamily: typography.family,
  },
});
