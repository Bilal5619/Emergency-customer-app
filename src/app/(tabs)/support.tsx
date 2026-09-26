import { SymbolView, type SymbolViewProps } from "expo-symbols";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Screen } from "@/components/Screen";
import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";
const supportOptions: {
  id: string;
  title: string;
  description: string;
  icon: SymbolViewProps["name"];
}[] = [
  {
    id: "call",
    title: "Call Emergency Angel",
    description: "Speak to our support team",
    icon: {
      ios: "phone.fill",
      android: "call",
      web: "call",
    },
  },
  {
    id: "email",
    title: "Email support",
    description: "Send us a message",
    icon: {
      ios: "envelope.fill",
      android: "mail",
      web: "mail",
    },
  },
  {
    id: "faq",
    title: "Frequently asked questions",
    description: "Find quick answers",
    icon: {
      ios: "questionmark.circle.fill",
      android: "help",
      web: "help",
    },
  },
  {
    id: "booking",
    title: "Problem with a booking",
    description: "Report an issue with your job",
    icon: {
      ios: "exclamationmark.circle.fill",
      android: "report_problem",
      web: "report_problem",
    },
  },
];

export default function SupportScreen() {
  const handleSupportOption = async (id: string) => {
    if (id === "call") {
      const phoneUrl = "tel:07824047235";

      const supported = await Linking.canOpenURL(phoneUrl);

      if (supported) {
        await Linking.openURL(phoneUrl);
      }

      return;
    }

    if (id === "email") {
      const emailUrl =
        "mailto:info@emergencyangel.co.uk?subject=Emergency Angel Support";

      const supported = await Linking.canOpenURL(emailUrl);

      if (supported) {
        await Linking.openURL(emailUrl);
      }

      return;
    }

    if (id === "faq") {
      Alert.alert(
        "Frequently asked questions",
        "FAQ content will be connected in the next functionality phase.",
      );

      return;
    }

    if (id === "booking") {
      Alert.alert(
        "Booking support",
        "Booking issue reporting will be connected in the next functionality phase.",
      );
    }
  };

  return (
    <Screen>
      <AppHeader title="Support" subtitle="We're here when you need help." />

      <View style={styles.section}>
        <View style={styles.intro}>
          <Text style={styles.kicker}>HELP & SUPPORT</Text>

          <Text style={styles.title}>How can we help?</Text>

          <Text style={styles.description}>
            Choose an option below and we'll help you with your Emergency Angel
            service.
          </Text>
        </View>

        <View style={styles.list}>
          {supportOptions.map((option) => (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              onPress={() => handleSupportOption(option.id)}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={styles.iconBox}>
                <SymbolView
                  name={option.icon}
                  size={21}
                  tintColor={colors.orange}
                />
              </View>

              <View style={styles.copy}>
                <Text style={styles.cardTitle}>{option.title}</Text>

                <Text style={styles.cardDescription}>{option.description}</Text>
              </View>

              <SymbolView
                name={{
                  ios: "chevron.right",
                  android: "chevron_right",
                  web: "chevron_right",
                }}
                size={17}
                tintColor={colors.mutedLight}
              />
            </Pressable>
          ))}
        </View>

        <View style={styles.emergencyCard}>
          <View style={styles.emergencyIcon}>
            <SymbolView
              name={{
                ios: "bolt.fill",
                android: "bolt",
                web: "bolt",
              }}
              size={20}
              tintColor={colors.orange}
            />
          </View>

          <View style={styles.emergencyCopy}>
            <Text style={styles.emergencyTitle}>
              Already have an active booking?
            </Text>

            <Text style={styles.emergencyText}>
              Open the Bookings tab to see the latest engineer status and job
              progress.
            </Text>
          </View>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactHeading}>
            <View style={styles.contactIcon}>
              <SymbolView
                name={{
                  ios: "headphones",
                  android: "support_agent",
                  web: "support_agent",
                }}
                size={20}
                tintColor={colors.orange}
              />
            </View>

            <View>
              <Text style={styles.contactTitle}>Emergency Angel Support</Text>

              <Text style={styles.contactSubtitle}>Customer assistance</Text>
            </View>
          </View>

          <View style={styles.contactDivider} />

          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Email</Text>

            <Text style={styles.contactValue}>info@emergencyangel.co.uk</Text>
          </View>

          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Service</Text>

            <Text style={styles.contactValue}>Emergency assistance</Text>
          </View>
        </View>

        <Text style={styles.footerText}>
          For life-threatening emergencies, contact the appropriate emergency
          service.
        </Text>
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

  cardTitle: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  cardDescription: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,
  },

  emergencyCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    gap: 12,

    backgroundColor: "#FFF8EE",

    borderRadius: 18,

    padding: 15,

    borderWidth: 1,
    borderColor: "#FFE6BF",
  },

  emergencyIcon: {
    width: 40,
    height: 40,

    borderRadius: 12,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  emergencyCopy: {
    flex: 1,
  },

  emergencyTitle: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  emergencyText: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 3,

    lineHeight: 19,
  },

  contactCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 17,

    gap: 13,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  contactHeading: {
    flexDirection: "row",
    alignItems: "center",

    gap: 12,
  },

  contactIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    backgroundColor: "#FFF4E5",

    alignItems: "center",
    justifyContent: "center",
  },

  contactTitle: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  contactSubtitle: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 2,
  },

  contactDivider: {
    height: 1,
    backgroundColor: "#EEF1F4",
  },

  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    gap: 18,
  },

  contactLabel: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,
  },

  contactValue: {
    flex: 1,

    ...typography.smallMedium,

    color: colors.navy,
    fontFamily: typography.family,

    textAlign: "right",
  },

  footerText: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    textAlign: "center",

    paddingHorizontal: 14,

    lineHeight: 19,
  },
});
