import { Platform } from 'react-native';

export const typography = {
  family: Platform.select({ ios: 'System', android: 'sans-serif', web: 'system-ui' }),
  greeting: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  title: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '500' as const,
    letterSpacing: 0,
  },
  bodyStrong: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  small: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  smallMedium: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: 0,
  },
  button: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  tab: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500' as const,
    letterSpacing: 0,
  },
} as const;
