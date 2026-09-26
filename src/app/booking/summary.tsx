import { AddressCard } from "@/components/AddressCard";
import { AppHeader } from "@/components/AppHeader";
import { PriceBreakdown } from "@/components/PriceBreakdown";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { colors, shadows } from "@/constants/colors";
import {
  getProblem,
  getService,
  getUrgency,
  savedAddress,
} from "@/constants/mockData";
import { typography } from "@/constants/typography";
import { useBooking } from "@/context/BookingContext";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, View } from "react-native";

export default function SummaryScreen() {
  const { draft } = useBooking();

  const service = getService(draft.serviceId);

  const problem = getProblem(draft.serviceId, draft.issueId);

  const urgency = getUrgency(draft.urgencyId);

  const address = draft.address ?? savedAddress;

  return (
    <Screen>
      <AppHeader
        title="Booking summary"
        subtitle="Check everything before payment."
      />

      <View style={styles.summaryCard}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <SymbolView
              name={{
                ios: "doc.text.fill",
                android: "description",
                web: "description",
              }}
              size={19}
              tintColor={colors.orange}
            />
          </View>

          <View>
            <Text style={styles.cardTitle}>Job details</Text>

            <Text style={styles.cardSubtitle}>Your emergency booking</Text>
          </View>
        </View>

        <View style={styles.rows}>
          <SummaryRow label="Service" value={service.name} />

          <SummaryRow label="Issue" value={problem.title} />

          <SummaryRow label="Response" value={urgency.title} last />
        </View>
      </View>

      <AddressCard address={address} />

      <PriceBreakdown />

      <View style={styles.notice}>
        <SymbolView
          name={{
            ios: "lock.fill",
            android: "lock",
            web: "lock",
          }}
          size={17}
          tintColor={colors.orange}
        />

        <Text style={styles.noticeText}>
          Your booking and payment information is handled securely.
        </Text>
      </View>

      <PrimaryButton onPress={() => router.push("/booking/payment")}>
        Continue to payment
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
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,

    padding: 18,

    backgroundColor: "#FFFDFC",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,

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

  rows: {
    paddingHorizontal: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,

    paddingVertical: 14,

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

  notice: {
    flexDirection: "row",
    alignItems: "center",

    gap: 9,

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
});
