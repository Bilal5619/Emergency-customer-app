import type { SymbolViewProps } from 'expo-symbols';

export type Problem = {
  id: string;
  title: string;
  description?: string;
};

export type EmergencyService = {
  id: string;
  name: string;
  description: string;
  icon: SymbolViewProps['name'];
  problems: Problem[];
};
