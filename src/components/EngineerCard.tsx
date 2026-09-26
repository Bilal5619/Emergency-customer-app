import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { Engineer } from "@/types/engineer";

type Props = {
  engineer: Engineer;
  showActions?: boolean;
  onCall?: () => void;
  onMessage?: () => void;
};

export function EngineerCard({
  engineer,
  showActions = false,
  onCall,
  onMessage,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <SymbolView
            name={{
              ios: "person.fill",
              android: "person",
              web: "person",
            }}
            size={26}
            tintColor={colors.orange}
            fallback={<Text style={styles.initials}>JM</Text>}
          />
        </View>

        <View style={styles.copy}>
          <Text style={styles.name}>{engineer.name}</Text>

          <View style={styles.verifiedRow}>
            <SymbolView
              name={{
                ios: "star.fill",
                android: "star",
                web: "star",
              }}
              size={15}
              tintColor={colors.orange}
            />

            <Text style={styles.meta}>
              {engineer.role} · {engineer.rating.toFixed(1)} rating
            </Text>
          </View>

          <View style={styles.vehicleRow}>
            <SymbolView
              name={{
                ios: "car.fill",
                android: "directions_car",
                web: "directions_car",
              }}
              size={14}
              tintColor={colors.muted}
            />

            <Text style={styles.vehicle}>{engineer.vehicle}</Text>
          </View>
        </View>
      </View>

      {showActions ? (
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={onCall}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionPressed,
            ]}
          >
            <SymbolView
              name={{
                ios: "phone.fill",
                android: "call",
                web: "call",
              }}
              size={18}
              tintColor={colors.orange}
            />

            <Text style={styles.actionText}>Call</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={onMessage}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionPressed,
            ]}
          >
            <SymbolView
              name={{
                ios: "message.fill",
                android: "chat",
                web: "chat",
              }}
              size={18}
              tintColor={colors.orange}
            />

            <Text style={styles.actionText}>Message</Text>
          </Pressable>
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

    borderWidth: 1,
    borderColor: "#F1F3F5",

    gap: 16,

    ...shadows.soft,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 14,
  },

  avatar: {
    width: 58,
    height: 58,

    borderRadius: 18,

    backgroundColor: "#FFF4E5",

    alignItems: "center",
    justifyContent: "center",
  },

  initials: {
    color: colors.orange,
    fontWeight: "700",
  },

  copy: {
    flex: 1,
    gap: 5,
  },

  name: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,

    fontSize: 17,
  },

  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 6,

    flexWrap: "wrap",
  },

  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 6,
  },

  meta: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,
  },

  vehicle: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,
  },

  actions: {
    flexDirection: "row",

    gap: 10,

    paddingTop: 2,
  },

  actionButton: {
    flex: 1,

    minHeight: 46,

    borderRadius: 14,

    backgroundColor: "#FFF8EE",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    borderWidth: 1,
    borderColor: "#FFE4BA",
  },

  actionPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  actionText: {
    ...typography.button,

    color: colors.orange,
    fontFamily: typography.family,
  },
});
