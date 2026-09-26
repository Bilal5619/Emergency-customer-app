import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { EmergencyService } from "@/types/service";

type Props = {
  service: EmergencyService;
  onPress: () => void;
};

export function ServiceRow({ service, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconBox}>
        <SymbolView
          name={service.icon}
          size={22}
          tintColor={colors.orange}
          fallback={<Text style={styles.fallbackIcon}>+</Text>}
        />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={1}>
          {service.name}
        </Text>

        <Text style={styles.description} numberOfLines={1}>
          {service.description}
        </Text>
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
          fallback={<Text style={styles.chevron}>{"›"}</Text>}
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

    backgroundColor: colors.surface,

    borderRadius: 18,

    paddingVertical: 14,
    paddingHorizontal: 14,

    gap: 13,

    ...shadows.card,
  },

  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },

  iconBox: {
    width: 48,
    height: 48,

    borderRadius: 15,

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

    fontSize: 16,
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

  fallbackIcon: {
    color: colors.orange,
    fontSize: 20,
    fontWeight: "600",
  },

  chevron: {
    color: colors.mutedLight,
    fontSize: 24,
    lineHeight: 26,
  },
});
