import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { ProblemRow } from "@/components/ProblemRow";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/colors";
import { getService } from "@/constants/mockData";
import { typography } from "@/constants/typography";

export default function ServiceIssueScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId: string }>();

  const service = getService(serviceId);

  return (
    <Screen>
      <AppHeader title={service.name} subtitle="Tell us what is happening." />

      <View style={styles.section}>
        <View style={styles.intro}>
          <Text style={styles.kicker}>SELECT THE ISSUE</Text>

          <Text style={styles.title}>What do you need help with?</Text>

          <Text style={styles.description}>
            Choose the option that best matches the problem. You can provide
            more details later.
          </Text>
        </View>

        <View style={styles.list}>
          {service.problems.map((problem) => (
            <ProblemRow
              key={problem.id}
              problem={problem}
              onPress={() =>
                router.push({
                  pathname: "/booking/address",
                  params: {
                    serviceId: service.id,
                    issueId: problem.id,
                  },
                })
              }
            />
          ))}
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
});
