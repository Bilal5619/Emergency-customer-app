import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Keep web rendering deterministic while still following the user's scheme when available.
 */
export function useColorScheme() {
  return useRNColorScheme() ?? 'light';
}
