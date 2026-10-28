"use client";

import { DayPicker, type DateRange, type Matcher } from "@daypicker/react";
import "@daypicker/react/style.css";
import { isSameDay } from "date-fns";

export type { DateRange };

export function DateRangeCalendar({
  value,
  onChange,
  months = 2,
  disabled,
}: {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  months?: number;
  disabled?: Matcher | Matcher[];
}) {
  return (
    <DayPicker
      mode="range"
      // At least one night: check-out can never be the check-in day.
      min={1}
      selected={value}
      onSelect={(range, day) => {
        // Re-clicking the check-in day would clear the selection; keep check-in instead.
        if (!range && value?.from && !value.to && isSameDay(day, value.from)) return;
        onChange(range);
      }}
      numberOfMonths={months}
      pagedNavigation
      showOutsideDays={false}
      disabled={[{ before: new Date() }, ...(disabled ? [disabled].flat() : [])]}
      excludeDisabled
    />
  );
}
