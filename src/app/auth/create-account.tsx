import { router } from "expo-router";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { FormField } from "@/components/FormField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";

export default function CreateAccountScreen() {
  return (
    <Screen>
      <AppHeader
        title="Create account"
        subtitle="Set up your Emergency Angel account."
      />

      <View style={styles.section}>
        <View style={styles.intro}>
          <Text style={styles.kicker}>GET STARTED</Text>

          <Text style={styles.title}>Create your account</Text>

          <Text style={styles.description}>
            Save your details, manage bookings and make future emergency
            requests faster.
          </Text>
        </View>

        <View style={styles.benefitsCard}>
          <BenefitRow
            icon={{
              ios: "clock.fill",
              android: "schedule",
              web: "schedule",
            }}
            title="Faster bookings"
            description="Reuse your saved details."
          />

          <BenefitRow
            icon={{
              ios: "location.fill",
              android: "location_on",
              web: "location_on",
            }}
            title="Saved addresses"
            description="Keep your regular properties ready."
          />

          <BenefitRow
            icon={{
              ios: "doc.text.fill",
              android: "description",
              web: "description",
            }}
            title="Booking history"
            description="View your previous and active jobs."
          />
        </View>

        <View style={styles.card}>
          <View style={styles.headingRow}>
            <View style={styles.iconBox}>
              <SymbolView
                name={{
                  ios: "person.crop.circle.badge.plus",
                  android: "person_add",
                  web: "person_add",
                }}
                size={22}
                tintColor={colors.orange}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>Your details</Text>

              <Text style={styles.cardSubtitle}>
                Enter your account information
              </Text>
            </View>
          </View>

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

            <FormField
              label="Password"
              placeholder="Create a password"
              secureTextEntry
              textContentType="newPassword"
            />

            <FormField
              label="Confirm password"
              placeholder="Enter password again"
              secureTextEntry
              textContentType="newPassword"
            />
          </View>
        </View>

        <View style={styles.notice}>
          <SymbolView
            name={{
              ios: "lock.fill",
              android: "lock",
              web: "lock",
            }}
            size={16}
            tintColor={colors.orange}
          />

          <Text style={styles.noticeText}>
            Your account details will be protected securely.
          </Text>
        </View>

        <PrimaryButton>Create account</PrimaryButton>

        <SecondaryButton onPress={() => router.push("/auth/sign-in")}>
          Already have an account? Sign in
        </SecondaryButton>

        <Text style={styles.termsText}>
          By creating an account, you agree to the Emergency Angel Terms &
          Conditions and Privacy Policy.
        </Text>
      </View>
    </Screen>
  );
}

function BenefitRow({
  icon,
  title,
  description,
}: {
  icon: SymbolViewProps["name"];
  title: string;
  description: string;
}) {
  return (
    <View style={styles.benefitRow}>
      <View style={styles.benefitIcon}>
        <SymbolView name={icon} size={18} tintColor={colors.orange} />
      </View>

      <View style={styles.benefitCopy}>
        <Text style={styles.benefitTitle}>{title}</Text>

        <Text style={styles.benefitDescription}>{description}</Text>
      </View>
    </View>
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

  benefitsCard: {
    backgroundColor: "#FFF8EE",

    borderRadius: 20,

    padding: 16,

    gap: 14,

    borderWidth: 1,
    borderColor: "#FFE6BF",
  },

  benefitRow: {
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

  benefitDescription: {
    ...typography.small,
    color: colors.muted,
    fontFamily: typography.family,
    marginTop: 2,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 18,

    gap: 18,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 12,
  },

  iconBox: {
    width: 44,
    height: 44,

    borderRadius: 14,

    backgroundColor: "#FFF4E5",

    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    ...typography.bodyStrong,
    color: colors.navy,
    fontFamily: typography.family,
  },

  cardSubtitle: {
    ...typography.small,
    color: colors.muted,
    fontFamily: typography.family,
    marginTop: 2,
  },

  form: {
    gap: 14,
  },

  notice: {
    flexDirection: "row",
    alignItems: "center",

    gap: 8,

    backgroundColor: "#FFF8EE",

    borderRadius: 15,

    padding: 13,

    borderWidth: 1,
    borderColor: "#FFE6BF",
  },

  noticeText: {
    flex: 1,

    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,
  },

  termsText: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    textAlign: "center",

    paddingHorizontal: 12,

    lineHeight: 19,
  },
});
