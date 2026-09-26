import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { FormField } from "@/components/FormField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";

export default function ForgotPasswordScreen() {
  return (
    <Screen>
      <AppHeader
        title="Reset password"
        subtitle="We'll help you get back into your account."
      />

      <View style={styles.section}>
        <View style={styles.hero}>
          <View style={styles.iconGlow}>
            <View style={styles.icon}>
              <SymbolView
                name={{
                  ios: "key.fill",
                  android: "key",
                  web: "key",
                }}
                size={28}
                tintColor={colors.orange}
              />
            </View>
          </View>

          <Text style={styles.title}>Forgot your password?</Text>

          <Text style={styles.description}>
            Enter the email address linked to your Emergency Angel account.
            We'll send you instructions to reset your password.
          </Text>
        </View>

        <View style={styles.card}>
          <FormField
            label="Email address"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
          />

          <PrimaryButton>Send reset instructions</PrimaryButton>
        </View>

        <View style={styles.infoCard}>
          <SymbolView
            name={{
              ios: "envelope.fill",
              android: "mail",
              web: "mail",
            }}
            size={18}
            tintColor={colors.orange}
          />

          <Text style={styles.infoText}>
            Check your inbox and spam folder after requesting a password reset.
          </Text>
        </View>

        <SecondaryButton onPress={() => router.push("/auth/sign-in")}>
          Back to sign in
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

  hero: {
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 22,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  iconGlow: {
    width: 82,
    height: 82,

    borderRadius: 41,

    backgroundColor: "#FFF2DB",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 13,
  },

  icon: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,

    textAlign: "center",
  },

  description: {
    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,

    textAlign: "center",

    marginTop: 6,

    maxWidth: 360,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 18,

    gap: 16,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    gap: 9,

    backgroundColor: "#FFF8EE",

    borderRadius: 15,

    padding: 13,

    borderWidth: 1,
    borderColor: "#FFE6BF",
  },

  infoText: {
    flex: 1,

    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    lineHeight: 19,
  },
});
