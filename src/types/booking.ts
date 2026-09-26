import type { Address } from "./address";
import type { Engineer } from "./engineer";

export type BookingStatus =
  | "finding_engineer"
  | "engineer_assigned"
  | "on_the_way"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled";

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

  paymentStatus: "Paid" | "Pending" | "Refunded";

  total: number;

  engineer?: Engineer;

  completedAt?: string;
  engineerArrivedAt?: string;

  cancellationReason?: string;
  refundEta?: string;
};
