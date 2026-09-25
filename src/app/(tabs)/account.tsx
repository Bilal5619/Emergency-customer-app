import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { SecondaryButton } from '@/components/SecondaryButton';
import { colors, shadows } from '@/constants/colors';
import { typography } from '@/constants/typography';

const loggedIn = false;

export default function AccountScreen() {
  return (
    <Screen>
      <AppHeader title="Account" subtitle="Save details for faster bookings." />
      {loggedIn ? <LoggedInState /> : <GuestState />}
    </Screen>
  );
}

function GuestState() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Continue as guest</Text>
      <Text style={styles.meta}>Create an account when you are ready to save details and track jobs faster.</Text>
      <SecondaryButton>Sign in</SecondaryButton>
      <SecondaryButton>Create account</SecondaryButton>
    </View>
  );
}

function LoggedInState() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Sarah Ahmed</Text>
      <Text style={styles.meta}>07123 456789</Text>
      <Text style={styles.meta}>sarah@example.com</Text>
      {['Saved addresses', 'Notifications', 'Privacy', 'Terms & Conditions', 'Logout'].map((item) => (
        <SecondaryButton key={item}>{item}</SecondaryButton>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    gap: 12,
    ...shadows.soft,
  },
  heading: { ...typography.sectionTitle, color: colors.navy, fontFamily: typography.family },
  meta: { ...typography.body, color: colors.muted, fontFamily: typography.family },
});
