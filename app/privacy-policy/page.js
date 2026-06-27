import LegalPage from "@/components/Legal/LegalPage";
import { SITE } from "@/constants/site";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Rossete Parlour.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Last updated: {new Date().getFullYear()}</p>
      <p>
        {SITE.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting
        your privacy. This Privacy Policy explains how we collect, use, and safeguard
        your information when you visit our website or place an order.
      </p>

      <h2>Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>Name, email address, and phone number when you create an account or checkout as a guest</li>
        <li>Order details including items purchased and delivery/collection preferences</li>
        <li>Technical data such as browser type, IP address, and cookies</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process and fulfil your orders</li>
        <li>To communicate with you about your orders</li>
        <li>To improve our website and services</li>
        <li>To send marketing communications if you have opted in</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use cookies to ensure you get the best experience on our website. You can
        manage cookie preferences through your browser settings. See our Cookie Policy
        for more details.
      </p>

      <h2>Data Storage</h2>
      <p>
        Your data is stored securely and retained only for as long as necessary to
        fulfil the purposes outlined in this policy or as required by law.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data. Contact us
        at {SITE.email} to exercise these rights.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at{" "}
        {SITE.email} or {SITE.phone}.
      </p>
    </LegalPage>
  );
}
