import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AddressCard } from '@/components/AddressCard';
import { AppHeader } from '@/components/AppHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { SecondaryButton } from '@/components/SecondaryButton';
import { colors } from '@/constants/colors';
import { savedAddress } from '@/constants/mockData';
import { typography } from '@/constants/typography';

export default function AddressScreen() {
  const params = useLocalSearchParams<{ serviceId: string; issueId: string }>();
  const next = () => router.push({ pathname: '/booking/urgency', params });

  return (
    <Screen>
      <AppHeader title="Where do you need help?" />
      <AddressCard address={savedAddress} />
      <PrimaryButton onPress={next}>Use this address</PrimaryButton>
      <Text style={styles.heading}>Add another address</Text>
      <View style={styles.form}>
        <FormField label="Postcode" placeholder="M21 4AB" autoCapitalize="characters" />
        <FormField label="Address line 1" placeholder="House number and street" />
        <FormField label="Address line 2 optional" placeholder="Flat, building or floor" />
        <FormField label="Town / City" placeholder="Manchester" />
        <FormField label="Notes optional" placeholder="Access notes for engineer" multiline style={styles.notesInput} />
      </View>
      <SecondaryButton onPress={next}>Continue</SecondaryButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { ...typography.sectionTitle, color: colors.navy, fontFamily: typography.family, marginTop: 4 },
  form: { gap: 12 },
  notesInput: { minHeight: 88, textAlignVertical: 'top', paddingTop: 14 },
});
