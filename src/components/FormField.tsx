import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

type Props = TextInputProps & {
  label: string;
};

export function FormField({ label, style, ...props }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor={colors.mutedLight} style={[styles.input, style]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  label: { ...typography.smallMedium, color: colors.navy, fontFamily: typography.family },
  input: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.surface,
    color: colors.navy,
    paddingHorizontal: 15,
    ...typography.body,
    fontFamily: typography.family,
  },
});
