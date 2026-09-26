import { useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { EngineerCard } from "@/components/EngineerCard";
import { Screen } from "@/components/Screen";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, shadows } from "@/constants/colors";
import { formatCurrency } from "@/constants/mockData";

import { typography } from "@/constants/typography";
import { useBooking } from "@/context/BookingContext";
import type { Booking, BookingStatus } from "@/types/booking";

const timeline: {
  status: BookingStatus;
  label: string;
  time?: string;
}[] = [
  {
    status: "finding_engineer",
    label: "Booking received",
    time: "Today, 10:14 AM",
  },
  {
    status: "engineer_assigned",
    label: "Engineer assigned",
    time: "Today, 10:22 AM",
  },
  {
    status: "on_the_way",
    label: "On the way",
    time: "Today, 10:35 AM",
  },
  {
    status: "arrived",
    label: "Arrived",
    time: "Today, 11:02 AM",
  },
  {
    status: "in_progress",
    label: "Service in progress",
    time: "Engineer working",
  },
  {
    status: "completed",
    label: "Job completed",
    time: "Today, 5:32 PM",
  },
];

const statusIndex: Partial<Record<BookingStatus, number>> = {
  finding_engineer: 0,
  engineer_assigned: 1,
  on_the_way: 2,
  arrived: 3,
  in_progress: 4,
  completed: 5,
};

export default function BookingStatusScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();

  const { bookings, getBookingById } = useBooking();

  const booking = getBookingById(bookingId) ?? bookings[0];

  const isCompleted = booking.status === "completed";
  const isCancelled = booking.status === "cancelled";
  const isInProgress = booking.status === "in_progress";

  return (
    <Screen>
      <AppHeader
        title={
          isCompleted
            ? "Booking complete"
            : isCancelled
              ? "Booking cancelled"
              : isInProgress
                ? "Service in progress"
                : "Track booking"
        }
        subtitle={booking.service}
      />

      {isCancelled ? (
        <CancelledCard />
      ) : isCompleted ? (
        <CompletedCard booking={booking} />
      ) : isInProgress ? (
        <InProgressCard booking={booking} />
      ) : (
        <TrackingCard status={booking.status} />
      )}

      {booking.engineer && !isCancelled ? (
        <EngineerCard engineer={booking.engineer} showActions={!isCompleted} />
      ) : null}

      {!isCancelled ? (
        <ProgressCard booking={booking} />
      ) : (
        <CancelledProgress />
      )}

      <BookingDetails booking={booking} />

      {isCancelled ? <CancellationDetails booking={booking} /> : null}

      {isCompleted ? <CompletedActions /> : null}

      {isCancelled ? <CancelledActions /> : null}
    </Screen>
  );
}

/* =========================================================
   TRACKING / MAP
   ========================================================= */

function TrackingCard({ status }: { status: BookingStatus }) {
  const finding = status === "finding_engineer";
  const assigned = status === "engineer_assigned";
  const arrived = status === "arrived";

  let statusText = "On the way";
  let etaText = "ETA 18 mins";

  if (finding) {
    statusText = "Searching for engineer";
    etaText = "Finding engineer";
  }

  if (assigned) {
    statusText = "Engineer assigned";
    etaText = "ETA confirming";
  }

  if (arrived) {
    statusText = "Engineer is at your property";
    etaText = "Arrived now";
  }

  return (
    <View style={styles.mapCard}>
      <View style={styles.fakeMap}>
        <View style={styles.mapGreenOne} />
        <View style={styles.mapGreenTwo} />

        <View style={styles.mapWater} />

        <View style={[styles.road, styles.roadOne]} />
        <View style={[styles.road, styles.roadTwo]} />
        <View style={[styles.road, styles.roadThree]} />
        <View style={[styles.road, styles.roadFour]} />
        <View style={[styles.road, styles.roadFive]} />
        <View style={[styles.road, styles.roadSix]} />

        <View style={styles.mapTopRow}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />

            <Text style={styles.liveText}>
              {finding ? "Searching live" : "Live tracking"}
            </Text>
          </View>

          <View style={styles.etaBadge}>
            <SymbolView
              name={{
                ios: "clock.fill",
                android: "schedule",
                web: "schedule",
              }}
              size={16}
              tintColor={colors.orange}
            />

            <Text style={styles.etaText}>{etaText}</Text>
          </View>
        </View>

        <Text style={styles.cityLabel}>Manchester</Text>

        <Text style={styles.hulmeLabel}>Hulme</Text>

        <Text style={styles.longsightLabel}>Longsight</Text>

        {!finding ? (
          <>
            {!assigned ? (
              <>
                <View style={[styles.route, styles.routeOne]} />

                <View style={[styles.route, styles.routeTwo]} />

                <View style={[styles.route, styles.routeThree]} />

                <View style={[styles.route, styles.routeFour]} />
              </>
            ) : null}

            <View
              style={[
                styles.engineerGlow,

                arrived && styles.engineerGlowArrived,
              ]}
            >
              <View style={styles.engineerMarker}>
                <SymbolView
                  name={{
                    ios: "car.fill",
                    android: "local_shipping",
                    web: "local_shipping",
                  }}
                  size={19}
                  tintColor={colors.navy}
                />
              </View>
            </View>
          </>
        ) : null}

        <View style={styles.homeGlow}>
          <View style={styles.homeMarker}>
            <SymbolView
              name={{
                ios: "house.fill",
                android: "home",
                web: "home",
              }}
              size={19}
              tintColor={colors.navy}
            />
          </View>
        </View>

        <View style={styles.mapStatusPill}>
          <SymbolView
            name={{
              ios: finding
                ? "magnifyingglass"
                : arrived
                  ? "mappin.circle.fill"
                  : "location.fill",

              android: finding
                ? "search"
                : arrived
                  ? "location_on"
                  : "navigation",

              web: finding ? "search" : arrived ? "location_on" : "navigation",
            }}
            size={18}
            tintColor={colors.orange}
          />

          <Text style={styles.mapStatusText}>{statusText}</Text>
        </View>
      </View>
    </View>
  );
}

/* =========================================================
   IN PROGRESS
   ========================================================= */

function InProgressCard({ booking }: { booking: Booking }) {
  return (
    <View style={styles.progressHero}>
      <View style={styles.progressHeroIcon}>
        <SymbolView
          name={{
            ios: "wrench.and.screwdriver.fill",
            android: "construction",
            web: "construction",
          }}
          size={30}
          tintColor={colors.orange}
        />
      </View>

      <View style={styles.inProgressBadge}>
        <View style={styles.liveDot} />

        <Text style={styles.inProgressBadgeText}>In progress</Text>
      </View>

      <Text style={styles.progressHeroTitle}>Service in progress</Text>

      <Text style={styles.progressHeroSubtitle}>
        {booking.engineer?.name ?? "Your engineer"} is currently working on the
        issue.
      </Text>
    </View>
  );
}

/* =========================================================
   COMPLETED
   ========================================================= */

function CompletedCard({ booking }: { booking: Booking }) {
  return (
    <View style={styles.completedCard}>
      <View style={styles.completedGlow}>
        <View style={styles.completedIcon}>
          <SymbolView
            name={{
              ios: "checkmark",
              android: "check",
              web: "check",
            }}
            size={34}
            tintColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.completedBadge}>
        <Text style={styles.completedBadgeText}>Completed</Text>
      </View>

      <Text style={styles.completedTitle}>Job completed successfully</Text>

      <Text style={styles.completedTime}>
        Today • {booking.completedAt ?? "5:32 PM"}
      </Text>
    </View>
  );
}

/* =========================================================
   CANCELLED
   ========================================================= */

function CancelledCard() {
  return (
    <View style={styles.cancelledCard}>
      <View style={styles.cancelledGlow}>
        <View style={styles.cancelledIcon}>
          <SymbolView
            name={{
              ios: "xmark",
              android: "close",
              web: "close",
            }}
            size={32}
            tintColor="#E6493D"
          />
        </View>
      </View>

      <View style={styles.cancelledBadge}>
        <View style={styles.cancelledDot} />

        <Text style={styles.cancelledBadgeText}>Cancelled</Text>
      </View>

      <Text style={styles.cancelledTitle}>This booking has been cancelled</Text>

      <Text style={styles.cancelledSubtitle}>
        No engineer is currently assigned.
      </Text>
    </View>
  );
}

/* =========================================================
   TIMELINE
   ========================================================= */

function ProgressCard({ booking }: { booking: Booking }) {
  const activeIndex = statusIndex[booking.status] ?? 0;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Progress</Text>

      <View style={styles.timeline}>
        {timeline.map((item, index) => {
          const completed =
            booking.status === "completed" ? true : index < activeIndex;

          const current =
            booking.status !== "completed" && index === activeIndex;

          const upcoming =
            booking.status !== "completed" && index > activeIndex;

          return (
            <View key={item.status} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineDot,

                    completed && styles.timelineDotCompleted,

                    current && styles.timelineDotCurrent,
                  ]}
                >
                  {completed ? (
                    <SymbolView
                      name={{
                        ios: "checkmark",
                        android: "check",
                        web: "check",
                      }}
                      size={12}
                      tintColor="#FFFFFF"
                    />
                  ) : null}
                </View>

                {index !== timeline.length - 1 ? (
                  <View
                    style={[
                      styles.timelineLine,

                      completed && styles.timelineLineCompleted,
                    ]}
                  />
                ) : null}
              </View>

              <View style={styles.timelineCopy}>
                <Text
                  style={[
                    styles.timelineTitle,

                    upcoming && styles.timelineTitleUpcoming,
                  ]}
                >
                  {item.label}
                </Text>

                {!upcoming && item.time ? (
                  <Text style={styles.timelineTime}>{item.time}</Text>
                ) : null}

                {current && booking.status === "finding_engineer" ? (
                  <Text style={styles.timelineTime}>
                    Searching for the nearest engineer...
                  </Text>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function CancelledProgress() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Progress</Text>

      <View style={styles.cancelledTimelineRow}>
        <View style={[styles.timelineDot, styles.timelineDotCompleted]}>
          <SymbolView
            name={{
              ios: "checkmark",
              android: "check",
              web: "check",
            }}
            size={12}
            tintColor="#FFFFFF"
          />
        </View>

        <View>
          <Text style={styles.timelineTitle}>Booking received</Text>

          <Text style={styles.timelineTime}>Today, 10:14 AM</Text>
        </View>
      </View>

      {[
        "Engineer assigned",
        "On the way",
        "Arrived",
        "Service in progress",
        "Job completed",
      ].map((label) => (
        <View key={label} style={styles.cancelledTimelineRow}>
          <View style={styles.timelineDot} />

          <Text style={styles.timelineTitleUpcoming}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

/* =========================================================
   BOOKING DETAILS
   ========================================================= */

function BookingDetails({ booking }: { booking: Booking }) {
  return (
    <View style={styles.detailsCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIcon}>
          <SymbolView
            name={{
              ios: "doc.text.fill",
              android: "description",
              web: "description",
            }}
            size={18}
            tintColor={colors.orange}
          />
        </View>

        <View>
          <Text style={styles.heading}>Booking details</Text>

          <Text style={styles.sectionSubtitle}>
            Reference {booking.reference}
          </Text>
        </View>
      </View>

      <View style={styles.detailsBody}>
        <DetailRow label="Service" value={booking.service} />

        <DetailRow label="Issue" value={booking.issue} />

        <DetailRow
          label="Address"
          value={`${booking.address.line1}\n${booking.address.city}, ${booking.address.postcode}`}
        />

        <DetailRow label="Urgency" value={booking.urgency} />

        <DetailRow label="Payment" value={booking.paymentStatus} />

        {booking.engineerArrivedAt ? (
          <DetailRow
            label="Engineer arrived"
            value={booking.engineerArrivedAt}
          />
        ) : null}

        {booking.completedAt ? (
          <DetailRow label="Job completed" value={booking.completedAt} />
        ) : null}

        <DetailRow
          label="Total"
          value={formatCurrency(booking.total)}
          bold
          last
        />
      </View>
    </View>
  );
}

/* =========================================================
   CANCELLATION
   ========================================================= */

function CancellationDetails({ booking }: { booking: Booking }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Cancellation details</Text>

      <DetailRow
        label="Reason"
        value={booking.cancellationReason ?? "Booking cancelled"}
      />

      <DetailRow label="Payment" value={booking.paymentStatus} />

      <DetailRow
        label="Refund ETA"
        value={booking.refundEta ?? "Pending"}
        last
      />
    </View>
  );
}

/* =========================================================
   ACTIONS
   ========================================================= */

function CompletedActions() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>More actions</Text>

      <View style={styles.actionStack}>
        <SecondaryButton>View receipt</SecondaryButton>

        <SecondaryButton>Leave a review</SecondaryButton>

        <SecondaryButton>Book again</SecondaryButton>
      </View>
    </View>
  );
}

function CancelledActions() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Actions</Text>

      <View style={styles.actionStack}>
        <SecondaryButton>Book again</SecondaryButton>

        <SecondaryButton>Contact support</SecondaryButton>
      </View>
    </View>
  );
}

function DetailRow({
  label,
  value,
  bold = false,
  last = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  last?: boolean;
}) {
  return (
    <View style={[styles.detailRow, last && styles.detailRowLast]}>
      <Text style={styles.detailLabel}>{label}</Text>

      <Text style={[styles.detailValue, bold && styles.detailValueBold]}>
        {value}
      </Text>
    </View>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

const styles = StyleSheet.create({
  mapCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#EEF1F4",

    ...shadows.soft,
  },

  fakeMap: {
    height: 315,

    position: "relative",
    overflow: "hidden",

    backgroundColor: "#EDF2F3",
  },

  mapGreenOne: {
    position: "absolute",

    width: 125,
    height: 95,

    left: -30,
    top: 115,

    borderRadius: 35,

    backgroundColor: "#E2F0E6",

    transform: [{ rotate: "-16deg" }],
  },

  mapGreenTwo: {
    position: "absolute",

    width: 110,
    height: 115,

    right: -28,
    bottom: 40,

    borderRadius: 32,

    backgroundColor: "#E1EFE5",

    transform: [{ rotate: "12deg" }],
  },

  mapWater: {
    position: "absolute",

    width: "135%",
    height: 20,

    left: -55,
    top: 155,

    borderRadius: 30,

    backgroundColor: "#CDE9F7",

    transform: [{ rotate: "-7deg" }],
  },

  road: {
    position: "absolute",

    height: 7,

    borderRadius: 20,

    backgroundColor: "#FFFFFF",
  },

  roadOne: {
    width: "125%",
    left: -55,
    top: 70,

    transform: [{ rotate: "10deg" }],
  },

  roadTwo: {
    width: "120%",
    left: -45,
    top: 125,

    transform: [{ rotate: "-10deg" }],
  },

  roadThree: {
    width: "115%",
    left: -35,
    top: 205,

    transform: [{ rotate: "7deg" }],
  },

  roadFour: {
    width: "120%",
    left: -40,
    top: 250,

    transform: [{ rotate: "-4deg" }],
  },

  roadFive: {
    width: 7,
    height: 380,

    left: "41%",
    top: -30,

    transform: [{ rotate: "15deg" }],
  },

  roadSix: {
    width: 7,
    height: 360,

    right: "23%",
    top: -40,

    transform: [{ rotate: "-13deg" }],
  },

  mapTopRow: {
    position: "absolute",

    left: 14,
    right: 14,
    top: 14,

    zIndex: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",

    gap: 7,

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 999,

    backgroundColor: "#FFFFFF",

    ...shadows.soft,
  },

  liveDot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: colors.orange,
  },

  liveText: {
    ...typography.smallMedium,

    color: colors.navy,
    fontFamily: typography.family,
  },

  etaBadge: {
    flexDirection: "row",
    alignItems: "center",

    gap: 6,

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 999,

    backgroundColor: "#FFFFFF",

    ...shadows.soft,
  },

  etaText: {
    ...typography.smallMedium,

    color: colors.navy,
    fontFamily: typography.family,
  },

  cityLabel: {
    position: "absolute",

    right: 58,
    top: 102,

    color: "#64748B",

    fontSize: 15,
    fontWeight: "600",

    fontFamily: typography.family,
  },

  hulmeLabel: {
    position: "absolute",

    left: "34%",
    bottom: 80,

    color: "#64748B",

    fontSize: 12,

    fontFamily: typography.family,
  },

  longsightLabel: {
    position: "absolute",

    right: 45,
    bottom: 65,

    color: "#64748B",

    fontSize: 11,

    fontFamily: typography.family,
  },

  route: {
    position: "absolute",

    height: 6,

    borderRadius: 10,

    backgroundColor: colors.orange,

    zIndex: 8,
  },

  routeOne: {
    width: 74,

    left: "23%",
    top: 145,

    transform: [{ rotate: "24deg" }],
  },

  routeTwo: {
    width: 82,

    left: "37%",
    top: 165,

    transform: [{ rotate: "-18deg" }],
  },

  routeThree: {
    width: 88,

    left: "51%",
    top: 175,

    transform: [{ rotate: "15deg" }],
  },

  routeFour: {
    width: 78,

    right: "15%",
    top: 200,

    transform: [{ rotate: "4deg" }],
  },

  engineerGlow: {
    position: "absolute",

    left: "16%",
    top: 112,

    width: 62,
    height: 62,

    borderRadius: 31,

    backgroundColor: "rgba(255, 153, 0, 0.15)",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
  },

  engineerGlowArrived: {
    left: undefined,
    top: undefined,

    right: "10%",
    bottom: 62,
  },

  engineerMarker: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: "#FFFFFF",

    borderWidth: 3,
    borderColor: colors.orange,

    alignItems: "center",
    justifyContent: "center",

    ...shadows.soft,
  },

  homeGlow: {
    position: "absolute",

    right: "10%",
    bottom: 62,

    width: 62,
    height: 62,

    borderRadius: 31,

    backgroundColor: "rgba(255, 153, 0, 0.12)",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 9,
  },

  homeMarker: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#FFFFFF",

    borderWidth: 3,
    borderColor: colors.orange,

    alignItems: "center",
    justifyContent: "center",

    ...shadows.soft,
  },

  mapStatusPill: {
    position: "absolute",

    left: 14,
    bottom: 14,

    zIndex: 20,

    flexDirection: "row",
    alignItems: "center",

    gap: 8,

    paddingHorizontal: 14,
    paddingVertical: 10,

    borderRadius: 999,

    backgroundColor: "#FFF4DF",

    ...shadows.soft,
  },

  mapStatusText: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  progressHero: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 24,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#EEF1F4",

    ...shadows.soft,
  },

  progressHeroIcon: {
    width: 76,
    height: 76,

    borderRadius: 24,

    backgroundColor: "#FFF4E5",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 14,
  },

  inProgressBadge: {
    flexDirection: "row",
    alignItems: "center",

    gap: 7,

    backgroundColor: "#FFF4DF",

    borderRadius: 999,

    paddingHorizontal: 14,
    paddingVertical: 7,

    marginBottom: 12,
  },

  inProgressBadgeText: {
    ...typography.smallMedium,

    color: colors.orange,
    fontFamily: typography.family,
  },

  progressHeroTitle: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,

    textAlign: "center",
  },

  progressHeroSubtitle: {
    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,

    textAlign: "center",

    marginTop: 6,

    maxWidth: 300,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 20,

    gap: 14,

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  heading: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,
  },

  timeline: {
    marginTop: 2,
  },

  timelineItem: {
    flexDirection: "row",

    minHeight: 62,
  },

  timelineLeft: {
    width: 34,

    alignItems: "center",
  },

  timelineDot: {
    width: 20,
    height: 20,

    borderRadius: 10,

    marginTop: 1,

    backgroundColor: "#E2E8F0",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 2,
  },

  timelineDotCompleted: {
    backgroundColor: colors.orange,
  },

  timelineDotCurrent: {
    backgroundColor: "#FFF7EA",

    borderWidth: 3,
    borderColor: colors.orange,
  },

  timelineLine: {
    position: "absolute",

    top: 20,
    bottom: -2,

    width: 3,

    backgroundColor: "#DDE3EA",

    borderRadius: 4,
  },

  timelineLineCompleted: {
    backgroundColor: colors.orange,
  },

  timelineCopy: {
    flex: 1,

    paddingLeft: 8,
    paddingBottom: 16,
  },

  timelineTitle: {
    ...typography.bodyStrong,

    color: colors.navy,
    fontFamily: typography.family,
  },

  timelineTitleUpcoming: {
    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,
  },

  timelineTime: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 3,
  },

  cancelledTimelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",

    gap: 14,

    minHeight: 52,
  },

  detailsCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#F1F3F5",

    ...shadows.soft,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",

    gap: 12,

    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 15,

    backgroundColor: "#FFFDFC",
  },

  sectionIcon: {
    width: 40,
    height: 40,

    borderRadius: 13,

    backgroundColor: "#FFF4E5",

    alignItems: "center",
    justifyContent: "center",
  },

  sectionSubtitle: {
    ...typography.small,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 2,
  },

  detailsBody: {
    paddingHorizontal: 18,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",

    gap: 18,

    paddingVertical: 14,

    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F4",
  },

  detailRowLast: {
    borderBottomWidth: 0,
  },

  detailLabel: {
    width: "32%",

    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,
  },

  detailValue: {
    flex: 1,

    ...typography.bodyMedium,

    color: colors.navy,
    fontFamily: typography.family,

    textAlign: "right",

    lineHeight: 21,
  },

  detailValueBold: {
    fontWeight: "700",
    fontSize: 17,
  },

  completedCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    paddingVertical: 28,
    paddingHorizontal: 18,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#EEF1F4",

    ...shadows.soft,
  },

  completedGlow: {
    width: 92,
    height: 92,

    borderRadius: 46,

    backgroundColor: "#DCF6E5",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 12,
  },

  completedIcon: {
    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#24A148",

    alignItems: "center",
    justifyContent: "center",
  },

  completedBadge: {
    backgroundColor: "#E8F7EE",

    borderRadius: 999,

    paddingHorizontal: 15,
    paddingVertical: 7,

    marginBottom: 12,
  },

  completedBadgeText: {
    ...typography.smallMedium,

    color: "#18863D",
    fontFamily: typography.family,
  },

  completedTitle: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,

    textAlign: "center",
  },

  completedTime: {
    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,

    marginTop: 5,
  },

  cancelledCard: {
    backgroundColor: "#FFF9F8",

    borderRadius: 22,

    paddingVertical: 28,
    paddingHorizontal: 18,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#FCE3DF",

    ...shadows.soft,
  },

  cancelledGlow: {
    width: 92,
    height: 92,

    borderRadius: 46,

    backgroundColor: "#FDEBE8",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 12,
  },

  cancelledIcon: {
    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#FFFFFF",

    borderWidth: 3,
    borderColor: "#E6493D",

    alignItems: "center",
    justifyContent: "center",
  },

  cancelledBadge: {
    flexDirection: "row",
    alignItems: "center",

    gap: 7,

    backgroundColor: "#FDECEC",

    borderRadius: 999,

    paddingHorizontal: 15,
    paddingVertical: 7,

    marginBottom: 12,
  },

  cancelledDot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#E6493D",
  },

  cancelledBadgeText: {
    ...typography.smallMedium,

    color: "#D9382B",
    fontFamily: typography.family,
  },

  cancelledTitle: {
    ...typography.sectionTitle,

    color: colors.navy,
    fontFamily: typography.family,

    textAlign: "center",
  },

  cancelledSubtitle: {
    ...typography.body,

    color: colors.muted,
    fontFamily: typography.family,

    textAlign: "center",

    marginTop: 6,
  },

  actionStack: {
    gap: 10,
  },
});
