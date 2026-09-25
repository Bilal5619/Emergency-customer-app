import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

type Props = {
  greeting?: string;
  subtitle?: string;
};

export function HomeHeader({ greeting = 'Hi Sourav!', subtitle = 'How can we help you today?' }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/emergency-angel-logo.png')} style={styles.logo} contentFit="contain" />
      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 12,
    gap: 6,
  },
  logo: {
    width: 170,
    height: 54,
    marginBottom: 6,
  },
  greeting: {
    ...typography.greeting,
    color: colors.navy,
    fontFamily: typography.family,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    fontFamily: typography.family,
    textAlign: 'center',
  },
});
