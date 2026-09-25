export const colors = {
  navy: '#071B3D',
  orange: '#FF9900',
  white: '#FFFFFF',
  background: '#F6F7F9',
  surface: '#FFFFFF',
  surfaceSoft: '#F8F9FB',
  success: '#16A34A',
  error: '#DC2626',
  ink: '#10233F',
  muted: '#687386',
  mutedLight: '#9AA4B2',
  border: '#EEF1F5',
  borderStrong: '#DDE3EB',
  softOrange: '#FFF4E3',
  softNavy: '#EEF3FA',
} as const;

export const shadows = {
  card: {
    shadowColor: '#071B3D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  soft: {
    shadowColor: '#071B3D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
} as const;
