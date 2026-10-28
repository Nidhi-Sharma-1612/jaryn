import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsAndConditions } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms for using the Berkshire Vacation Rental Co. website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      doc={termsAndConditions}
      title="Terms & Conditions"
      eyebrow="Legal"
      summary="The rules for using the Berkshire Vacation Rental Co. website."
      related={{ label: "Privacy Policy", href: "/privacy-policy" }}
    />
  );
}
