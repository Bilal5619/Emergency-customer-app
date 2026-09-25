import type { Address } from './address';
import type { Engineer } from './engineer';

export type BookingStatus =
  | 'finding_engineer'
  | 'engineer_assigned'
  | 'on_the_way'
  | 'arrived'
  | 'completed';

export type PriceBreakdownItem = {
  label: string;
  amount: number;
};

export type Booking = {
  id: string;
  reference: string;
  service: string;
  issue: string;
  address: Address;
  urgency: string;
  status: BookingStatus;
  paymentStatus: 'Paid' | 'Pending';
  total: number;
  engineer?: Engineer;
};
