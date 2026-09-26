import { createContext, ReactNode, useContext, useState } from "react";

import {
  bookings as demoBookings,
  getProblem,
  getService,
  getUrgency,
  mockTotal,
} from "@/constants/mockData";

import type { Address } from "@/types/address";
import type { Booking } from "@/types/booking";

type BookingDraft = {
  serviceId?: string;
  issueId?: string;
  urgencyId?: string;
  address?: Address;
};

type BookingContextValue = {
  draft: BookingDraft;
  bookings: Booking[];
  lastCreatedBookingId?: string;

  startBooking: (serviceId: string, issueId: string) => void;

  setUrgency: (urgencyId: string) => void;

  setAddress: (address: Address) => void;

  createBooking: () => Booking | null;

  getBookingById: (bookingId?: string) => Booking | undefined;

  resetDraft: () => void;
};

const BookingContext = createContext<BookingContextValue | undefined>(
  undefined,
);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft>({});

  const [bookings, setBookings] = useState<Booking[]>(demoBookings);

  const [lastCreatedBookingId, setLastCreatedBookingId] = useState<string>();

  const startBooking = (serviceId: string, issueId: string) => {
    setDraft({
      serviceId,
      issueId,
    });
  };

  const setUrgency = (urgencyId: string) => {
    setDraft((current) => ({
      ...current,
      urgencyId,
    }));
  };

  const setAddress = (address: Address) => {
    setDraft((current) => ({
      ...current,
      address,
    }));
  };

  const createBooking = (): Booking | null => {
    if (
      !draft.serviceId ||
      !draft.issueId ||
      !draft.urgencyId ||
      !draft.address
    ) {
      return null;
    }

    const service = getService(draft.serviceId);

    const problem = getProblem(draft.serviceId, draft.issueId);

    const urgency = getUrgency(draft.urgencyId);

    const timestamp = Date.now();

    const referenceNumber = String(timestamp).slice(-5);

    const booking: Booking = {
      id: `local-${timestamp}`,

      reference: `EA-${referenceNumber}`,

      service: service.name,

      issue: problem.title,

      address: draft.address,

      urgency: urgency.title,

      status: "finding_engineer",

      paymentStatus: "Paid",

      total: mockTotal,
    };

    setBookings((current) => [booking, ...current]);

    setLastCreatedBookingId(booking.id);

    return booking;
  };

  const getBookingById = (bookingId?: string) => {
    if (!bookingId) {
      return undefined;
    }

    return bookings.find((booking) => booking.id === bookingId);
  };

  const resetDraft = () => {
    setDraft({});
  };

  return (
    <BookingContext.Provider
      value={{
        draft,
        bookings,
        lastCreatedBookingId,
        startBooking,
        setUrgency,
        setAddress,
        createBooking,
        getBookingById,
        resetDraft,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }

  return context;
}
