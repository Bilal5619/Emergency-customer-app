import { Platform } from "react-native";

export const typography = {
  family: Platform.select({
    ios: "System",
    android: "sans-serif",
    web: "system-ui",
  }),

  greeting: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "500" as const,
    letterSpacing: 0,
  },

  title: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "600" as const,
    letterSpacing: 0,
  },

  sectionTitle: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "600" as const,
    letterSpacing: 0,
  },

  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400" as const,
    letterSpacing: 0,
  },

  bodyMedium: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500" as const,
    letterSpacing: 0,
  },

  bodyStrong: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500" as const,
    letterSpacing: 0,
  },

  small: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "400" as const,
    letterSpacing: 0,
  },

  smallMedium: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500" as const,
    letterSpacing: 0,
  },

  button: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600" as const,
    letterSpacing: 0,
  },

  tab: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "500" as const,
    letterSpacing: 0,
  },
} as const;
