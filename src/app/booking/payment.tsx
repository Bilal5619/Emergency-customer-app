import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Alert, StyleSheet, Text, View } from "react-native";

import { useBooking } from "@/context/BookingContext";

import { AppHeader } from "@/components/AppHeader";
import { FormField } from "@/components/FormField";
import { PriceBreakdown } from "@/components/PriceBreakdown";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";

export default function PaymentScreen() {
  const { createBooking } = useBooking();

  const handlePayment = () => {
    const booking = createBooking();

    if (!booking) {
      Alert.alert(
        "Booking incomplete",
        "Some booking information is missing. Please restart the booking.",
      );

      return;
    }

    router.push({
      pathname: "/booking/create-account",

      params: {
        bookingId: booking.id,
      },
    });
  };

  return (
    <Screen>
      <AppHeader
        title="Secure payment"
        subtitle="Choose how you would like to pay."
      />

      <PriceBreakdown />

      <View style={styles.card}>
        <View style={styles.headingRow}>
          <View style={styles.iconBox}>
            <SymbolView
              name={{
                ios: "creditcard.fill",
                android: "credit_card",
                web: "credit_card",
              }}
              size={20}
              tintColor={colors.orange}
            />
          </View>

          <View>
            <Text style={styles.heading}>Payment method</Text>

            <Text style={styles.subtitle}>Select a secure payment option</Text>
          </View>
        </View>

        <View style={styles.walletButtons}>
          <SecondaryButton>Apple Pay</SecondaryButton>

          <SecondaryButton>Google Pay</SecondaryButton>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR PAY BY CARD</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.form}>
          <FormField
            label="Card number"
            placeholder="1234 1234 1234 1234"
            keyboardType="number-pad"
            textContentType="creditCardNumber"
          />

          <FormField
            label="Expiry date"
            placeholder="MM/YY"
            keyboardType="number-pad"
          />

          <FormField
            label="Security code (CVC)"
            placeholder="123"
            keyboardType="number-pad"
            secureTextEntry
          />
        </View>

        <View style={styles.security}>
          <SymbolView
            name={{
              ios: "lock.fill",
              android: "lock",
              web: "lock",
            }}
            size={15}
            tintColor={colors.muted}
          />

          <Text style={styles.securityText}>Secure encrypted payment</Text>
        </View>
      </View>

      <PrimaryButton onPress={handlePayment}>Pay now</PrimaryButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    width: 42,
    height: 42,

    borderRadius: 13,

    backgroundColor: "#FFF4E5",

    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  subtitle: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 2,
  },

  walletButtons: {
    gap: 10,
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
  },

  form: {
    gap: 14,
  },

  security: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 7,
  },

  securityText: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,
  },
});
