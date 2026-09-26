import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { Problem } from "@/types/service";

type Props = {
  problem: Problem;
  onPress: () => void;
};

export function ProblemRow({ problem, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconBox}>
        <SymbolView
          name={{
            ios: "exclamationmark.circle.fill",
            android: "error_outline",
            web: "error_outline",
          }}
          size={21}
          tintColor={colors.orange}
        />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={2}>
          {problem.title}
        </Text>

        {problem.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {problem.description}
          </Text>
        ) : null}
      </View>

      <View style={styles.chevronBox}>
        <SymbolView
          name={{
            ios: "chevron.right",
            android: "chevron_right",
            web: "chevron_right",
          }}
          size={17}
          tintColor={colors.mutedLight}
          fallback={<Text style={styles.chevron}>›</Text>}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 78,

    flexDirection: "row",
    alignItems: "center",

    gap: 13,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    paddingVertical: 14,
    paddingHorizontal: 14,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.995 }],
  },

  iconBox: {
    width: 46,
    height: 46,

    borderRadius: 14,

    backgroundColor: "#FFF4E5",

    alignItems: "center",
    justifyContent: "center",
  },

  copy: {
    flex: 1,
    gap: 4,
  },

  title: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  description: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    lineHeight: 18,
  },

  chevronBox: {
    width: 24,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
  },

  chevron: {
    color: colors.mutedLight,
    fontSize: 22,
  },
});
