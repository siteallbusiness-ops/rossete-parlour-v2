import ContactPage from "@/components/Contact/ContactPage";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact Rossete Parlour. Find our address, phone, email, and working hours.",
  path: "/contact",
});

export default function ContactRoute() {
  return <ContactPage />;
}
