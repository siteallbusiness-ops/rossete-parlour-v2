import LegalPage from "@/components/Legal/LegalPage";
import { SITE } from "@/constants/site";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description: "Terms and Conditions for Rossete Parlour.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>Last updated: {new Date().getFullYear()}</p>
      <p>
        Welcome to {SITE.name}. By accessing our website and placing orders, you agree
        to be bound by these Terms &amp; Conditions. Please read them carefully.
      </p>

      <h2>Orders &amp; Payment</h2>
      <ul>
        <li>All orders are subject to availability and confirmation</li>
        <li>Prices are displayed in GBP and include applicable taxes where stated</li>
        <li>We reserve the right to refuse or cancel orders at our discretion</li>
      </ul>

      <h2>Collection &amp; Delivery</h2>
      <ul>
        <li>Estimated times are approximate and not guaranteed</li>
        <li>Please ensure your contact details are correct when placing an order</li>
        <li>You are responsible for collecting your order within the stated timeframe</li>
      </ul>

      <h2>Cancellations &amp; Refunds</h2>
      <p>
        Orders may be cancelled before preparation begins. Refunds will be processed
        to the original payment method where applicable. Contact us at {SITE.email} for
        assistance.
      </p>

      <h2>Allergies &amp; Dietary Requirements</h2>
      <p>
        Please inform us of any allergies or dietary requirements when ordering. While
        we take precautions, we cannot guarantee that our products are free from
        allergens due to shared preparation areas.
      </p>

      <h2>Website Use</h2>
      <p>
        You agree not to misuse our website, attempt unauthorised access, or use our
        services for any unlawful purpose.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        {SITE.name} shall not be liable for any indirect, incidental, or consequential
        damages arising from the use of our website or services.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may update these Terms &amp; Conditions at any time. Continued use of our
        website constitutes acceptance of the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these terms, contact us at {SITE.email} or visit us at{" "}
        {SITE.fullAddress}.
      </p>
    </LegalPage>
  );
}
