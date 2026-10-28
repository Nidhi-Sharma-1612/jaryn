import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Berkshire Vacation Rental Co. collects, uses and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      doc={privacyPolicy}
      title="Privacy Policy"
      eyebrow="Legal"
      summary="How Berkshire Vacation Rental Co. collects, uses and protects your information."
      related={{ label: "Terms & Conditions", href: "/terms-and-conditions" }}
    />
  );
}
