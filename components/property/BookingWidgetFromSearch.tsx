"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { parseTrip } from "@/lib/search";
import { BookingWidget } from "./BookingWidget";

type Props = Omit<React.ComponentProps<typeof BookingWidget>, "initial">;

/** Reads the trip from the URL once. Render inside <Suspense> with a plain BookingWidget as the fallback. */
export function BookingWidgetFromSearch(props: Props) {
  const params = useSearchParams();
  // Captured on mount only: the widget rewrites the URL as the guest edits, which must not reset it.
  const [trip] = useState(() => parseTrip(params));
  return <BookingWidget {...props} initial={trip} />;
}
