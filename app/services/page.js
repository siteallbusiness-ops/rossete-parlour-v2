import OrderPage from "@/components/Order/OrderPage";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Order Now",
  description: "Order from Rossete Parlour online. Browse our menu and place your order.",
  path: "/services",
});

export default function ServicesPage() {
  return <OrderPage />;
}
