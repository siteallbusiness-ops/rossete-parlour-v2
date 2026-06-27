import OrderConfirmation from "@/components/Checkout/OrderConfirmation";

export const metadata = {
  title: "Order Confirmed | Rossete Parlour",
  description: "Your order has been placed successfully.",
};

export default function OrderConfirmationRoute() {
  return <OrderConfirmation />;
}
