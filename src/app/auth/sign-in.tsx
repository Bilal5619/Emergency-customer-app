import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { FormField } from "@/components/FormField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";

export default function SignInScreen() {
  return (
    <Screen>
      <AppHeader
        title="Welcome back"
        subtitle="Sign in to your Emergency Angel account."
      />

      <View style={styles.section}>
        <View style={styles.intro}>
          <Text style={styles.kicker}>CUSTOMER ACCOUNT</Text>

          <Text style={styles.title}>Sign in</Text>

          <Text style={styles.description}>
            Access your bookings, saved addresses and account details.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconRow}>
            <View style={styles.iconBox}>
              <SymbolView
                name={{
                  ios: "person.fill",
                  android: "person",
                  web: "person",
                }}
                size={22}
                tintColor={colors.orange}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>Your account</Text>

              <Text style={styles.cardSubtitle}>Enter your login details</Text>
            </View>
          </View>

          <View style={styles.form}>
            <FormField
              label="Email address"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />

            <FormField
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              textContentType="password"
            />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/auth/forgot-password")}
            style={({ pressed }) => [
              styles.forgotButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>
        </View>

        <PrimaryButton>Sign in</PrimaryButton>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>NEW TO EMERGENCY ANGEL?</Text>
          <View style={styles.divider} />
        </View>

        <SecondaryButton onPress={() => router.push("/auth/create-account")}>
          Create an account
        </SecondaryButton>

        <View style={styles.guestCard}>
          <SymbolView
            name={{
              ios: "info.circle.fill",
              android: "info",
              web: "info",
            }}
            size={18}
            tintColor={colors.orange}
          />

          <Text style={styles.guestText}>
            You can still book emergency help without signing in.
          </Text>
        </View>
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

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    gap: 18,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  iconRow: {
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

  forgotButton: {
    alignSelf: "flex-end",
  },

  forgotText: {
    ...typography.smallMedium,
    color: colors.orange,
    fontFamily: typography.family,
  },

  pressed: {
    opacity: 0.7,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    fontSize: 11,
  },

  guestCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    gap: 9,

    backgroundColor: "#FFF8EE",

    borderRadius: 15,

    padding: 13,

    borderWidth: 1,
    borderColor: "#FFE6BF",
  },

  guestText: {
    flex: 1,

    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    lineHeight: 19,
  },
});
