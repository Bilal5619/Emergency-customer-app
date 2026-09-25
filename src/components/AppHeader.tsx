import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

type Props = {
  title?: string;
  subtitle?: string;
};

export function AppHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/emergency-angel-logo.png')} style={styles.logo} contentFit="contain" />
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    gap: 7,
    paddingTop: 4,
    paddingBottom: 10,
  },
  logo: {
    width: 148,
    height: 46,
    marginBottom: 2,
  },
  title: {
    ...typography.title,
    color: colors.navy,
    fontFamily: typography.family,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    fontFamily: typography.family,
  },
});
