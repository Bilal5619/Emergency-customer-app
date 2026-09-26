import { router } from "expo-router";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, shadows } from "@/constants/colors";
import { typography } from "@/constants/typography";

const loggedIn = false;

const accountOptions: {
  id: string;
  title: string;
  description: string;
  icon: SymbolViewProps["name"];
}[] = [
  {
    id: "addresses",
    title: "Saved addresses",
    description: "Manage your service locations",
    icon: {
      ios: "house.fill",
      android: "home",
      web: "home",
    },
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage booking alerts and updates",
    icon: {
      ios: "bell.fill",
      android: "notifications",
      web: "notifications",
    },
  },
  {
    id: "privacy",
    title: "Privacy",
    description: "Manage your privacy preferences",
    icon: {
      ios: "lock.fill",
      android: "lock",
      web: "lock",
    },
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    description: "View service terms",
    icon: {
      ios: "doc.text.fill",
      android: "description",
      web: "description",
    },
  },
];

export default function AccountScreen() {
  return (
    <Screen>
      <AppHeader
        title="Account"
        subtitle="Manage your details and preferences."
      />

      {loggedIn ? <LoggedInState /> : <GuestState />}
    </Screen>
  );
}

function GuestState() {
  return (
    <View style={styles.section}>
      <View style={styles.guestCard}>
        <View style={styles.guestIconGlow}>
          <View style={styles.guestIcon}>
            <SymbolView
              name={{
                ios: "person.fill",
                android: "person",
                web: "person",
              }}
              size={30}
              tintColor={colors.orange}
            />
          </View>
        </View>

        <Text style={styles.guestTitle}>Your Emergency Angel account</Text>

        <Text style={styles.guestText}>
          Create an account to save your details, manage addresses and keep
          track of your bookings.
        </Text>

        <View style={styles.actions}>
          <PrimaryButton onPress={() => router.push("/auth/create-account")}>
            Create account
          </PrimaryButton>

          <SecondaryButton onPress={() => router.push("/auth/sign-in")}>
            Sign in
          </SecondaryButton>
        </View>
      </View>

      <View style={styles.benefitsCard}>
        <Text style={styles.sectionTitle}>Why create an account?</Text>

        <BenefitRow
          icon={{
            ios: "clock.fill",
            android: "schedule",
            web: "schedule",
          }}
          title="Faster bookings"
          description="Reuse your saved contact and address details."
        />

        <BenefitRow
          icon={{
            ios: "location.fill",
            android: "location_on",
            web: "location_on",
          }}
          title="Saved addresses"
          description="Keep frequently used properties ready."
        />

        <BenefitRow
          icon={{
            ios: "doc.text.fill",
            android: "description",
            web: "description",
          }}
          title="Booking history"
          description="View current and previous Emergency Angel jobs."
        />
      </View>

      <Text style={styles.footerText}>
        You can still make emergency bookings without creating an account.
      </Text>
    </View>
  );
}

function LoggedInState() {
  return (
    <View style={styles.section}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <SymbolView
            name={{
              ios: "person.fill",
              android: "person",
              web: "person",
            }}
            size={30}
            tintColor={colors.orange}
          />
        </View>

        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>Sarah Ahmed</Text>

          <Text style={styles.profileMeta}>sarah@example.com</Text>

          <Text style={styles.profileMeta}>07123 456789</Text>
        </View>

        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>Account</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {accountOptions.map((option) => (
          <Pressable
            key={option.id}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.menuIcon}>
              <SymbolView
                name={option.icon}
                size={20}
                tintColor={colors.orange}
              />
            </View>

            <View style={styles.menuCopy}>
              <Text style={styles.menuTitle}>{option.title}</Text>

              <Text style={styles.menuDescription}>{option.description}</Text>
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

      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.pressed,
        ]}
      >
        <SymbolView
          name={{
            ios: "rectangle.portrait.and.arrow.right",
            android: "logout",
            web: "logout",
          }}
          size={19}
          tintColor="#D9382B"
        />

        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

function BenefitRow({
  icon,
  title,
  description,
}: {
  icon: SymbolViewProps["name"];
  title: string;
  description: string;
}) {
  return (
    <View style={styles.benefitRow}>
      <View style={styles.benefitIcon}>
        <SymbolView name={icon} size={18} tintColor={colors.orange} />
      </View>

      <View style={styles.benefitCopy}>
        <Text style={styles.benefitTitle}>{title}</Text>

        <Text style={styles.benefitText}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 14,
    paddingBottom: 18,
  },

  guestCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 22,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  guestIconGlow: {
    width: 82,
    height: 82,

    borderRadius: 41,

    backgroundColor: "#FFF2DB",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 13,
  },

  guestIcon: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  guestTitle: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,

    textAlign: "center",
  },

  guestText: {
    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,

    textAlign: "center",

    marginTop: 6,

    maxWidth: 360,
  },

  actions: {
    width: "100%",
    gap: 10,
    marginTop: 20,
  },

  benefitsCard: {
    backgroundColor: "#FFF8EE",

    borderRadius: 20,

    padding: 17,

    gap: 15,

    borderWidth: 1,
    borderColor: "#FFE6BF",
  },

  sectionTitle: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,
  },

  benefitRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 12,
  },

  benefitIcon: {
    width: 40,
    height: 40,

    borderRadius: 12,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  benefitCopy: {
    flex: 1,
  },

  benefitTitle: {
    ...typography.bodyMedium,

    color: colors.navy,
    fontFamily: typography.family,
  },

  benefitText: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 2,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",

    gap: 13,

    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 18,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  avatar: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: "#FFF4E5",

    alignItems: "center",
    justifyContent: "center",
  },

  profileCopy: {
    flex: 1,
  },

  profileName: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,
  },

  profileMeta: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 2,
  },

  verifiedBadge: {
    backgroundColor: "#FFF4E5",

    borderRadius: 999,

    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  verifiedText: {
    ...typography.smallMedium,

    color: colors.orange,
    fontFamily: typography.family,
  },

  menu: {
    gap: 10,
  },

  menuItem: {
    minHeight: 72,

    flexDirection: "row",
    alignItems: "center",

    gap: 12,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 14,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.995 }],
  },

  menuIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    backgroundColor: "#FFF4E5",

    alignItems: "center",
    justifyContent: "center",
  },

  menuCopy: {
    flex: 1,
  },

  menuTitle: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  menuDescription: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 2,
  },

  logoutButton: {
    minHeight: 54,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    backgroundColor: "#FFF7F6",

    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#FCE3DF",
  },

  logoutText: {
    ...typography.button,

    color: "#D9382B",
    fontFamily: typography.family,
  },

  footerText: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    textAlign: "center",

    paddingHorizontal: 20,
  },
});
