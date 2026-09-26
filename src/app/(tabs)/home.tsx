import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { HomeHeader } from "@/components/HomeHeader";
import { Screen } from "@/components/Screen";
import { ServiceRow } from "@/components/ServiceRow";
import { services } from "@/constants/mockData";

export default function HomeScreen() {
  return (
    <Screen>
      <HomeHeader />
      <View style={styles.list}>
        {services.map((service) => (
          <ServiceRow
            key={service.id}
            service={service}
            onPress={() =>
              router.push({
                pathname: "/booking/service/[serviceId]",
                params: { serviceId: service.id },
              })
            }
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    marginTop: -2,
    paddingBottom: 18,
  },
});
