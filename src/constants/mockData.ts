import type { SymbolViewProps } from 'expo-symbols';

import type { Address } from '@/types/address';
import type { Booking, PriceBreakdownItem } from '@/types/booking';
import type { Engineer } from '@/types/engineer';
import type { EmergencyService } from '@/types/service';

const symbol = (name: SymbolViewProps['name']) => name;

export const services: EmergencyService[] = [
  {
    id: 'plumbing',
    name: 'Emergency Plumbing',
    description: 'Leaks, burst pipes and urgent water issues',
    icon: symbol({ ios: 'wrench.and.screwdriver.fill', android: 'plumbing', web: 'plumbing' } as SymbolViewProps['name']),
    problems: [
      { id: 'burst-pipe', title: 'Burst pipe', description: 'Water escaping or pipe damage' },
      { id: 'water-leak', title: 'Water leak', description: 'Visible leak or damp patch' },
      { id: 'blocked-drain', title: 'Blocked drain', description: 'Drain not clearing' },
      { id: 'blocked-toilet', title: 'Blocked toilet', description: 'Toilet blocked or overflowing' },
      { id: 'no-hot-water', title: 'No hot water', description: 'Hot water has stopped working' },
      { id: 'other-plumbing', title: 'Other issue', description: 'Something else urgent' },
    ],
  },
  {
    id: 'electrician',
    name: 'Emergency Electrician',
    description: 'Power loss, tripping circuits and faults',
    icon: symbol({ ios: 'bolt.fill', android: 'electric_bolt', web: 'electric_bolt' } as SymbolViewProps['name']),
    problems: [
      { id: 'power-loss', title: 'Power loss' },
      { id: 'tripping', title: 'Fuse box keeps tripping' },
      { id: 'socket-fault', title: 'Socket or switch fault' },
      { id: 'other-electrical', title: 'Other electrical issue' },
    ],
  },
  {
    id: 'boiler-heating',
    name: 'Gas & Central Heating',
    description: 'Heating, hot water and gas issues',
    icon: symbol({ ios: 'flame.fill', android: 'heat_pump', web: 'heat_pump' } as SymbolViewProps['name']),
    problems: [
      { id: 'no-heating', title: 'No heating' },
      { id: 'boiler-fault', title: 'Boiler fault' },
      { id: 'radiator-leak', title: 'Radiator leak' },
      { id: 'other-heating', title: 'Other heating issue' },
    ],
  },
  {
    id: 'drainage',
    name: 'Drainage',
    description: 'Blocked drains and urgent drainage problems',
    icon: symbol({ ios: 'drop.fill', android: 'valve', web: 'valve' } as SymbolViewProps['name']),
    problems: [
      { id: 'blocked-outside-drain', title: 'Blocked outside drain' },
      { id: 'bad-smell', title: 'Bad smell' },
      { id: 'overflowing-drain', title: 'Overflowing drain' },
      { id: 'other-drainage', title: 'Other drainage issue' },
    ],
  },
  {
    id: 'locksmith',
    name: 'Locksmith',
    description: 'Locked out, broken locks and access issues',
    icon: symbol({ ios: 'key.fill', android: 'key', web: 'key' } as SymbolViewProps['name']),
    problems: [
      { id: 'locked-out', title: 'Locked out' },
      { id: 'broken-lock', title: 'Broken lock' },
      { id: 'lost-keys', title: 'Lost keys' },
      { id: 'other-locksmith', title: 'Other locksmith issue' },
    ],
  },
  {
    id: 'motor-recovery',
    name: 'Motor Recovery',
    description: 'Breakdowns and urgent vehicle recovery',
    icon: symbol({ ios: 'car.fill', android: 'local_shipping', web: 'local_shipping' } as SymbolViewProps['name']),
    problems: [
      { id: 'breakdown', title: 'Vehicle breakdown' },
      { id: 'flat-battery', title: 'Flat battery' },
      { id: 'puncture', title: 'Puncture' },
      { id: 'other-vehicle', title: 'Other vehicle issue' },
    ],
  },
  {
    id: 'other-emergency',
    name: 'Other Emergency',
    description: 'Tell us what has happened',
    icon: symbol({ ios: 'cross.case.fill', android: 'emergency', web: 'emergency' } as SymbolViewProps['name']),
    problems: [
      { id: 'urgent-help', title: 'Urgent help needed' },
      { id: 'not-sure', title: 'Not sure what I need' },
    ],
  },
];

export const savedAddress: Address = {
  id: 'home',
  line1: '12 Green Lane',
  city: 'Manchester',
  postcode: 'M21 4AB',
  notes: 'Ring the bell twice.',
};

export const urgencyOptions = [
  { id: '2-hours', title: 'Within 2 hours', description: 'Fastest response', priceNote: '+Â£80' },
  { id: '4-hours', title: 'Within 4 hours', description: 'Urgent', priceNote: '+Â£40' },
  { id: 'same-day', title: 'Same day', description: 'Flexible', priceNote: 'Standard' },
] as const;

// Demo-only amounts for UI review. Real pricing must come from the Laravel backend later.
export const priceBreakdown: PriceBreakdownItem[] = [
  { label: 'Booking fee', amount: 100 },
  { label: 'Call-out', amount: 100 },
  { label: 'First hour', amount: 200 },
  { label: 'VAT', amount: 80 },
];

export const engineer: Engineer = {
  id: 'john-m',
  name: 'John M.',
  role: 'Verified Engineer',
  rating: 4.8,
  vehicle: 'Ford Transit',
};

export const bookings: Booking[] = [
  {
    id: 'active',
    reference: 'EA-10452',
    service: 'Emergency Plumbing',
    issue: 'Burst pipe',
    address: savedAddress,
    urgency: 'Within 2 hours',
    status: 'on_the_way',
    paymentStatus: 'Paid',
    total: 480,
    engineer,
  },
  {
    id: 'past',
    reference: 'EA-10310',
    service: 'Emergency Electrician',
    issue: 'Fuse box keeps tripping',
    address: savedAddress,
    urgency: 'Same day',
    status: 'completed',
    paymentStatus: 'Paid',
    total: 240,
  },
];

export function formatCurrency(amount: number) {
  return `Â£${amount.toFixed(0)}`;
}

export function getService(serviceId?: string | string[]) {
  const id = Array.isArray(serviceId) ? serviceId[0] : serviceId;
  return services.find((service) => service.id === id) ?? services[0];
}

export function getProblem(serviceId?: string | string[], problemId?: string | string[]) {
  const service = getService(serviceId);
  const id = Array.isArray(problemId) ? problemId[0] : problemId;
  return service.problems.find((problem) => problem.id === id) ?? service.problems[0];
}

export function getUrgency(urgencyId?: string | string[]) {
  const id = Array.isArray(urgencyId) ? urgencyId[0] : urgencyId;
  return urgencyOptions.find((urgency) => urgency.id === id) ?? urgencyOptions[0];
}

export const mockTotal = priceBreakdown.reduce((sum, item) => sum + item.amount, 0);

