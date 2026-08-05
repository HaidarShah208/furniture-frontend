"use client";

import { motion } from "framer-motion";
import LuxuryInput from "@/components/common/Input";
import LuxurySelect from "@/components/common/Select";

export interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface ShippingStepProps {
  data: ShippingData;
  errors: Partial<Record<keyof ShippingData, string>>;
  onChange: (field: keyof ShippingData, value: string) => void;
  onNext: () => void;
}

const countryOptions = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "PK", label: "Pakistan" },
];

const stateOptions = [
  { value: "CA", label: "California" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
  { value: "FL", label: "Florida" },
  { value: "IL", label: "Illinois" },
  { value: "WA", label: "Washington" },
  { value: "MA", label: "Massachusetts" },
  { value: "OTHER", label: "Other" },
];

export default function ShippingStep({ data, errors, onChange, onNext }: ShippingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="mb-6 text-xl font-bold text-luxury-dark">Shipping Address</h2>

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <LuxuryInput
            label="First Name"
            placeholder="John"
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            error={errors.firstName}
          />
          <LuxuryInput
            label="Last Name"
            placeholder="Smith"
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            error={errors.lastName}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <LuxuryInput
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            error={errors.email}
          />
          <LuxuryInput
            label="Phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            error={errors.phone}
          />
        </div>

        <LuxuryInput
          label="Street Address"
          placeholder="123 Main Street"
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
          error={errors.address}
        />

        <LuxuryInput
          label="Apartment, Suite, etc. (optional)"
          placeholder="Apt 4B"
          value={data.apartment}
          onChange={(e) => onChange("apartment", e.target.value)}
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <LuxuryInput
            label="City"
            placeholder="New York"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            error={errors.city}
          />
          <LuxurySelect
            label="State"
            value={data.state}
            onChange={(v) => onChange("state", v)}
            options={stateOptions}
            placeholder="Select state"
            error={errors.state}
          />
          <LuxuryInput
            label="ZIP Code"
            placeholder="10001"
            value={data.zip}
            onChange={(e) => onChange("zip", e.target.value)}
            error={errors.zip}
          />
        </div>

        <LuxurySelect
          label="Country"
          value={data.country}
          onChange={(v) => onChange("country", v)}
          options={countryOptions}
          placeholder="Select country"
          error={errors.country}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="rounded-lg bg-luxury-dark px-10 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-luxury-gold"
        >
          Continue to Delivery
        </motion.button>
      </div>
    </motion.div>
  );
}
