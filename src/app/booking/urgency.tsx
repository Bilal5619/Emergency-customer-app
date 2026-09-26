import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Screen } from "@/components/Screen";
import { colors, shadows } from "@/constants/colors";
import { urgencyOptions } from "@/constants/mockData";
import { typography } from "@/constants/typography";
import { useBooking } from "@/context/BookingContext";
export default function UrgencyScreen() {
  const { setUrgency } = useBooking();

  return (
    <Screen>
      <AppHeader
        title="Choose urgency"
        subtitle="How quickly do you need an engineer?"
      />

      <View style={styles.section}>
        <View style={styles.intro}>
          <Text style={styles.kicker}>RESPONSE TIME</Text>

          <Text style={styles.title}>When do you need help?</Text>

          <Text style={styles.description}>
            Choose the response time that works best for your emergency.
          </Text>
        </View>

        <View style={styles.list}>
          {urgencyOptions.map((urgency, index) => (
            <Pressable
              key={urgency.id}
              accessibilityRole="button"
              onPress={() => {
                setUrgency(urgency.id);

                router.push("/booking/address");
              }}
              style={({ pressed }) => [
                styles.option,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.iconBox}>
                <SymbolView
                  name={{
                    ios:
                      index === 0
                        ? "bolt.fill"
                        : index === 1
                          ? "clock.fill"
                          : "calendar",
                    android:
                      index === 0
                        ? "bolt"
                        : index === 1
                          ? "schedule"
                          : "calendar_month",
                    web:
                      index === 0
                        ? "bolt"
                        : index === 1
                          ? "schedule"
                          : "calendar_month",
                  }}
                  size={21}
                  tintColor={colors.orange}
                />
              </View>

              <View style={styles.copy}>
                <Text style={styles.optionTitle}>{urgency.title}</Text>

                <Text style={styles.optionDescription}>
                  {urgency.description}
                </Text>
              </View>

              <View style={styles.right}>
                <Text style={styles.price}>{urgency.priceNote}</Text>

                <SymbolView
                  name={{
                    ios: "chevron.right",
                    android: "chevron_right",
                    web: "chevron_right",
                  }}
                  size={16}
                  tintColor={colors.mutedLight}
                />
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <SymbolView
              name={{
                ios: "info.circle.fill",
                android: "info",
                web: "info",
              }}
              size={18}
              tintColor={colors.orange}
            />
          </View>

          <Text style={styles.infoText}>
            Faster response options may include an additional urgency charge.
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

    maxWidth: 520,
  },

  list: {
    gap: 12,
  },

  option: {
    minHeight: 82,

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

  optionTitle: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  optionDescription: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "center",

    gap: 6,
  },

  price: {
    ...typography.bodyMedium,

    color: colors.orange,
    fontFamily: typography.family,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    gap: 10,

    backgroundColor: "#FFF8EE",

    borderRadius: 16,

    padding: 14,

    borderWidth: 1,
    borderColor: "#FFE6BF",
  },

  infoIcon: {
    marginTop: 1,
  },

  infoText: {
    flex: 1,

    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    lineHeight: 19,
  },
});
