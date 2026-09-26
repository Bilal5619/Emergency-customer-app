import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, View } from "react-native";

import { AddressCard } from "@/components/AddressCard";
import { AppHeader } from "@/components/AppHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { StatusBadge } from "@/components/StatusBadge";
import { colors, shadows } from "@/constants/colors";
import {
  formatCurrency,
  getProblem,
  getService,
  getUrgency,
  mockTotal,
  savedAddress,
} from "@/constants/mockData";
import { typography } from "@/constants/typography";

export default function ConfirmationScreen() {
  const params = useLocalSearchParams<{
    serviceId: string;
    issueId: string;
    urgencyId: string;
  }>();

  const service = getService(params.serviceId);
  const problem = getProblem(params.serviceId, params.issueId);
  const urgency = getUrgency(params.urgencyId);

  return (
    <Screen>
      <AppHeader
        title="Booking confirmed"
        subtitle="Your emergency request has been received."
      />

      <View style={styles.successCard}>
        <View style={styles.successGlow}>
          <View style={styles.successIcon}>
            <SymbolView
              name={{
                ios: "checkmark",
                android: "check",
                web: "check",
              }}
              size={32}
              tintColor="#FFFFFF"
            />
          </View>
        </View>

        <Text style={styles.successTitle}>You're booked</Text>

        <Text style={styles.reference}>Reference EA-10452</Text>

        <StatusBadge status="finding_engineer" />

        <Text style={styles.message}>
          We're now looking for the nearest available engineer.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Booking details</Text>

        <SummaryRow label="Service" value={service.name} />

        <SummaryRow label="Issue" value={problem.title} />

        <SummaryRow label="Response" value={urgency.title} />

        <SummaryRow
          label="Amount paid"
          value={formatCurrency(mockTotal)}
          last
        />
      </View>

      <AddressCard address={savedAddress} />

      <PrimaryButton onPress={() => router.push("/booking-status/searching")}>
        Track my booking
      </PrimaryButton>
    </Screen>
  );
}

function SummaryRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  successCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    paddingVertical: 26,
    paddingHorizontal: 18,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#EEF1F4",

    ...shadows.soft,
  },

  successGlow: {
    width: 88,
    height: 88,

    borderRadius: 44,

    backgroundColor: "#FFF2DB",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 12,
  },

  successIcon: {
    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor: colors.orange,

    alignItems: "center",
    justifyContent: "center",
  },

  successTitle: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,

    fontSize: 20,

    marginBottom: 3,
  },

  reference: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginBottom: 12,
  },

  message: {
    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,

    textAlign: "center",

    marginTop: 12,

    maxWidth: 320,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    paddingHorizontal: 18,
    paddingTop: 18,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  heading: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,

    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",

    gap: 20,

    paddingVertical: 13,

    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F4",
  },

  rowLast: {
    borderBottomWidth: 0,
  },

  label: {
    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,
  },

  value: {
    flex: 1,

    ...typography.bodyMedium,

    color: colors.navy,
    fontFamily: typography.family,

    textAlign: "right",
  },
});
