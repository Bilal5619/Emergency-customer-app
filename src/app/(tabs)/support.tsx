import { StyleSheet, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";

const options = [
  "Call Emergency Angel",
  "Email Support",
  "Frequently Asked Questions",
  "Report a problem with booking",
];

export default function SupportScreen() {
  return (
    <Screen>
      <AppHeader title="Support" subtitle="We're here when you need help." />
      <View style={styles.card}>
        {options.map((option) => (
          <SecondaryButton key={option}>{option}</SecondaryButton>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 12 },
});
