import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, View } from "react-native";

import { AddressCard } from "@/components/AddressCard";
import { AppHeader } from "@/components/AppHeader";
import { FormField } from "@/components/FormField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, shadows } from "@/constants/colors";
import { savedAddress } from "@/constants/mockData";
import { typography } from "@/constants/typography";

export default function AddressScreen() {
  const params = useLocalSearchParams<{
    serviceId: string;
    issueId: string;
    urgencyId: string;
  }>();

  const next = () =>
    router.push({
      pathname: "/booking/summary",
      params,
    });

  return (
    <Screen>
      <AppHeader
        title="Service address"
        subtitle="Where should the engineer attend?"
      />

      <View style={styles.section}>
        <View style={styles.intro}>
          <Text style={styles.kicker}>YOUR LOCATION</Text>

          <Text style={styles.title}>Where do you need help?</Text>

          <Text style={styles.description}>
            Use your saved address or enter another property below.
          </Text>
        </View>

        <AddressCard address={savedAddress} />

        <PrimaryButton onPress={next}>Use this address</PrimaryButton>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.formCard}>
          <View style={styles.formHeadingRow}>
            <View style={styles.iconBox}>
              <SymbolView
                name={{
                  ios: "house.fill",
                  android: "home",
                  web: "home",
                }}
                size={19}
                tintColor={colors.orange}
              />
            </View>

            <View>
              <Text style={styles.formTitle}>Add another address</Text>

              <Text style={styles.formSubtitle}>
                Enter the property details
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            <FormField
              label="Postcode"
              placeholder="M21 4AB"
              autoCapitalize="characters"
            />

            <FormField
              label="Address line 1"
              placeholder="House number and street"
            />

            <FormField
              label="Address line 2 (optional)"
              placeholder="Flat, building or floor"
            />

            <FormField label="Town / City" placeholder="Manchester" />

            <FormField
              label="Access notes (optional)"
              placeholder="Anything the engineer should know"
              multiline
              style={styles.notesInput}
            />
          </View>
        </View>

        <SecondaryButton onPress={next}>
          Continue with this address
        </SecondaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 14,
    paddingBottom: 18,
  },

  intro: {
    paddingHorizontal: 4,
    gap: 5,
  },

  kicker: {
    ...typography.smallMedium,
    color: colors.orange,
    fontFamily: typography.family,
    letterSpacing: 0.5,
  },

  title: {
    ...typography.sectionTitle,
    color: colors.navy,
    fontFamily: typography.family,
  },

  description: {
    ...typography.body,
    color: colors.muted,
    fontFamily: typography.family,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 2,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E7EBEF",
  },

  dividerText: {
    ...typography.smallMedium,
    color: colors.mutedLight,
    fontFamily: typography.family,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    gap: 18,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  formHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FFF4E5",
    alignItems: "center",
    justifyContent: "center",
  },

  formTitle: {
    ...typography.bodyStrong,
    color: colors.navy,
    fontFamily: typography.family,
  },

  formSubtitle: {
    ...typography.small,
    color: colors.muted,
    fontFamily: typography.family,
    marginTop: 2,
  },

  form: {
    gap: 14,
  },

  notesInput: {
    minHeight: 95,
    textAlignVertical: "top",
    paddingTop: 14,
  },
});
