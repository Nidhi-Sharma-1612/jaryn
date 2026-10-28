"use client";

import { Minus, Plus } from "lucide-react";

export function Stepper({
  label,
  hint,
  value,
  min = 0,
  max = 20,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-moss">{hint}</p>}
      </div>
      <div className="flex items-center gap-3">
        <StepButton label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Minus className="size-3.5" />
        </StepButton>
        <span className="w-5 text-center text-sm tabular-nums">{value}</span>
        <StepButton label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <Plus className="size-3.5" />
        </StepButton>
      </div>
    </div>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-8 place-items-center rounded-full border border-ink/15 transition hover:border-pine disabled:opacity-30"
    >
      {children}
    </button>
  );
}

export interface Guests {
  adults: number;
  children: number;
  pets: number;
}

export function GuestSelector({
  value,
  onChange,
  maxGuests = 16,
}: {
  value: Guests;
  onChange: (value: Guests) => void;
  maxGuests?: number;
}) {
  const total = value.adults + value.children;
  return (
    <div className="divide-y divide-stone">
      <Stepper
        label="Adults"
        hint="Ages 13+"
        min={1}
        max={maxGuests - value.children}
        value={value.adults}
        onChange={(adults) => onChange({ ...value, adults })}
      />
      <Stepper
        label="Children"
        hint="Ages 2–12"
        max={maxGuests - value.adults}
        value={value.children}
        onChange={(children) => onChange({ ...value, children })}
      />
      <Stepper
        label="Pets"
        hint="Dogs welcome in select homes"
        max={2}
        value={value.pets}
        onChange={(pets) => onChange({ ...value, pets })}
      />
      {total >= maxGuests && <p className="pt-3 text-xs text-moss">This home sleeps up to {maxGuests}.</p>}
    </div>
  );
}
