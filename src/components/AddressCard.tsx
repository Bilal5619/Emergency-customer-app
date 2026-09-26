import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, View } from "react-native";

import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { Address } from "@/types/address";

export function AddressCard({ address }: { address: Address }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <SymbolView
            name={{
              ios: "mappin.and.ellipse",
              android: "location_on",
              web: "location_on",
            }}
            size={20}
            tintColor={colors.orange}
          />
        </View>

        <View>
          <Text style={styles.label}>Service address</Text>

          <Text style={styles.small}>Engineer attendance location</Text>
        </View>
      </View>

      <View style={styles.address}>
        <Text style={styles.line}>{address.line1}</Text>

        {address.line2 ? (
          <Text style={styles.line}>{address.line2}</Text>
        ) : null}

        <Text style={styles.line}>{address.city}</Text>

        <Text style={styles.postcode}>{address.postcode}</Text>
      </View>

      {address.notes ? (
        <View style={styles.notesBox}>
          <Text style={styles.notesLabel}>Access note</Text>

          <Text style={styles.notes}>{address.notes}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 18,

    gap: 15,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  header: {
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

  label: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  small: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 2,
  },

  address: {
    gap: 4,
  },

  line: {
    ...typography.bodyMedium,

    color: colors.navy,
    fontFamily: typography.family,
  },

  postcode: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,

    marginTop: 2,
  },

  notesBox: {
    backgroundColor: "#F8FAFC",

    borderRadius: 13,

    padding: 12,
  },

  notesLabel: {
    ...typography.smallMedium,

    color: colors.muted,
    fontFamily: typography.family,

    marginBottom: 3,
  },

  notes: {
    ...typography.small,

    color: colors.navy,
    fontFamily: typography.family,
  },
});
