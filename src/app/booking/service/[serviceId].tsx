import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { ProblemRow } from '@/components/ProblemRow';
import { Screen } from '@/components/Screen';
import { getService } from '@/constants/mockData';

export default function ServiceIssueScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId: string }>();
  const service = getService(serviceId);

  return (
    <Screen>
      <AppHeader title={service.name} subtitle="What is the problem?" />
      <View style={styles.list}>
        {service.problems.map((problem) => (
          <ProblemRow
            key={problem.id}
            problem={problem}
            onPress={() => router.push({ pathname: '/booking/address', params: { serviceId: service.id, issueId: problem.id } })}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12 },
});
