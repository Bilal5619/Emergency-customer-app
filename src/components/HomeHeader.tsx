import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";

type Props = {
  greeting?: string;
  subtitle?: string;
};

export function HomeHeader({
  greeting = "Hi Sourav!",
  subtitle = "How can we help you today?",
}: Props) {
  return (
    <View style={styles.container}>
      {/* very soft background glow */}
      <View style={styles.softGlow} />

      {/* soft bottom wave */}
      <View style={styles.waveBack} />
      <View style={styles.waveFront} />

      <View style={styles.content}>
        <Image
          source={require("@/assets/images/emergency-angel-logo.png")}
          style={styles.logo}
          contentFit="contain"
        />

        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    alignItems: "center",

    paddingTop: 20,
    paddingBottom: 34,

    marginBottom: 8,

    backgroundColor: "#FFFDFC",
  },

  content: {
    zIndex: 10,
    alignItems: "center",
    width: "100%",
  },

  logo: {
    width: 205,
    height: 66,
    marginBottom: 12,
  },

  greeting: {
    ...typography.greeting,
    color: colors.navy,
    fontFamily: typography.family,
    textAlign: "center",
  },

  subtitle: {
    ...typography.body,
    color: colors.muted,
    fontFamily: typography.family,
    textAlign: "center",
    marginTop: 5,
  },

  softGlow: {
    position: "absolute",

    width: 170,
    height: 170,

    borderRadius: 85,

    backgroundColor: "#FFF6EA",

    right: -100,
    top: -95,

    opacity: 0.4,
  },

  waveBack: {
    position: "absolute",

    width: "145%",
    height: 95,

    backgroundColor: "#FFF3E3",

    borderRadius: 120,

    bottom: -72,
    left: -70,

    transform: [{ rotate: "-3deg" }],

    opacity: 0.9,
  },

  waveFront: {
    position: "absolute",

    width: "145%",
    height: 58,

    backgroundColor: "#FFDFAE",

    borderRadius: 120,

    bottom: -48,
    right: -75,

    transform: [{ rotate: "3deg" }],

    opacity: 0.55,
  },
});
