import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { FormField } from "@/components/FormField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";

export default function CreateAccountScreen() {
  const { bookingId } = useLocalSearchParams<{
    bookingId: string;
  }>();

  const continueToConfirmation = () =>
    router.push({
      pathname: "/booking/confirmation",

      params: {
        bookingId,
      },
    });

  return (
    <Screen>
      <AppHeader
        title="Save your details"
        subtitle="Track this job and book faster next time."
      />

      <View style={styles.benefitsCard}>
        <View style={styles.benefit}>
          <BenefitIcon name="schedule" />

          <View style={styles.benefitCopy}>
            <Text style={styles.benefitTitle}>Track your booking</Text>

            <Text style={styles.benefitText}>
              Quickly return to your active job.
            </Text>
          </View>
        </View>

        <View style={styles.benefit}>
          <BenefitIcon name="home" />

          <View style={styles.benefitCopy}>
            <Text style={styles.benefitTitle}>Save your address</Text>

            <Text style={styles.benefitText}>
              Faster checkout on future emergencies.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.heading}>Create your account</Text>

        <View style={styles.form}>
          <FormField
            label="Full name"
            placeholder="Your full name"
            textContentType="name"
          />

          <FormField
            label="Mobile number"
            placeholder="07123 456789"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />

          <FormField
            label="Email address"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
          />
        </View>
      </View>

      <PrimaryButton onPress={continueToConfirmation}>
        Create account & continue
      </PrimaryButton>

      <SecondaryButton onPress={continueToConfirmation}>
        Continue without account
      </SecondaryButton>
    </Screen>
  );
}

function BenefitIcon({ name }: { name: "schedule" | "home" }) {
  return (
    <View style={styles.benefitIcon}>
      <SymbolView
        name={{
          ios: name === "home" ? "house.fill" : "clock.fill",

          android: name,
          web: name,
        }}
        size={18}
        tintColor={colors.orange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  benefitsCard: {
    backgroundColor: "#FFF8EE",

    borderRadius: 20,

    padding: 16,

    gap: 14,

    borderWidth: 1,
    borderColor: "#FFE6BF",
  },

  benefit: {
    flexDirection: "row",
    alignItems: "center",

    gap: 12,
  },

  benefitIcon: {
    width: 38,
    height: 38,

    borderRadius: 12,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  benefitCopy: {
    flex: 1,
  },

  benefitTitle: {
    ...typography.bodyMedium,

    color: colors.navy,
    fontFamily: typography.family,
  },

  benefitText: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 2,
  },

  formCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 18,

    gap: 16,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  heading: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,
  },

  form: {
    gap: 14,
  },
});
