import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { SecondaryButton } from '@/components/SecondaryButton';

export default function CreateAccountScreen() {
  const continueToConfirmation = () => router.push('/booking/confirmation');

  return (
    <Screen>
      <AppHeader title="Save your details" subtitle="Create an account to track your job and book faster next time." />
      <View style={styles.card}>
        <FormField label="Full name" placeholder="Your full name" textContentType="name" />
        <FormField label="Mobile number" placeholder="07123 456789" keyboardType="phone-pad" textContentType="telephoneNumber" />
        <FormField label="Email address" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" textContentType="emailAddress" />
      </View>
      <PrimaryButton onPress={continueToConfirmation}>Create account & continue</PrimaryButton>
      <SecondaryButton onPress={continueToConfirmation}>Not now</SecondaryButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 12 },
});
