import { StyleSheet, Text } from "react-native";

import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { BookingStatus } from "@/types/booking";

const labels: Record<BookingStatus, string> = {
  finding_engineer: "Finding engineer",
  engineer_assigned: "Engineer assigned",
  on_the_way: "On the way",
  arrived: "Arrived",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const complete = status === "completed";
  const cancelled = status === "cancelled";

  return (
    <Text
      style={[
        styles.badge,
        complete && styles.complete,
        cancelled && styles.cancelled,
      ]}
    >
      {labels[status]}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    overflow: "hidden",

    borderRadius: 999,

    backgroundColor: colors.softOrange,

    color: colors.navy,

    paddingHorizontal: 10,
    paddingVertical: 6,

    ...typography.smallMedium,

    fontFamily: typography.family,
  },

  complete: {
    backgroundColor: "#E8F7EE",
    color: "#18863D",
  },

  cancelled: {
    backgroundColor: "#FDECEC",
    color: "#D9382B",
  },
});
