import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { FormField } from '@/components/FormField';
import { PriceBreakdown } from '@/components/PriceBreakdown';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { SecondaryButton } from '@/components/SecondaryButton';
import { colors, shadows } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function PaymentScreen() {
  const params = useLocalSearchParams<{ serviceId: string; issueId: string; urgencyId: string }>();

  return (
    <Screen>
      <AppHeader title="Payment" subtitle="Choose how you would like to pay." />
      <PriceBreakdown />
      <View style={styles.card}>
        <Text style={styles.heading}>Payment method</Text>
        <SecondaryButton>Apple Pay</SecondaryButton>
        <SecondaryButton>Google Pay</SecondaryButton>
        <View style={styles.form}>
          <FormField label="Card number" placeholder="1234 1234 1234 1234" keyboardType="number-pad" textContentType="creditCardNumber" />
          <View style={styles.row}>
            <FormField label="Expiry" placeholder="MM/YY" keyboardType="number-pad" style={styles.halfInput} />
            <FormField label="CVC" placeholder="123" keyboardType="number-pad" secureTextEntry style={styles.halfInput} />
          </View>
        </View>
      </View>
      <PrimaryButton onPress={() => router.push({ pathname: '/booking/create-account', params })}>Pay now</PrimaryButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 18, gap: 12, ...shadows.soft },
  heading: { ...typography.sectionTitle, color: colors.navy, fontFamily: typography.family },
  form: { gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  halfInput: { flex: 1 },
});
