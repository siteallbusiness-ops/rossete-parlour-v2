"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SitePageLayout from "@/components/Layout/SitePageLayout";
import useAppStore from "@/store/useAppStore";
import { SITE } from "@/constants/site";
import { formatPrice } from "@/utils/format";
import styles from "./CheckoutPage.module.css";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  postcode: "",
  notes: "",
};

function getDefaultAddressFields() {
  return {
    street: SITE.address.street,
    city: SITE.address.city,
    postcode: SITE.address.zip,
  };
}

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useAppStore((s) => s.cart);
  const user = useAppStore((s) => s.user);
  const orderType = useAppStore((s) => s.orderType);
  const placeOrder = useAppStore((s) => s.placeOrder);
  const openAuthModal = useAppStore((s) => s.openAuthModal);
  const setPendingCheckoutDetails = useAppStore(
    (s) => s.setPendingCheckoutDetails
  );
  const isOrderConfirmationOpen = useAppStore(
    (s) => s.isOrderConfirmationOpen
  );

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !isOrderConfirmationOpen) {
      router.replace("/services");
    }
  }, [cart.length, isOrderConfirmationOpen, router]);

  const formValues = {
    name: form.name || user?.name || "",
    email: form.email || user?.email || "",
    phone: form.phone || user?.phone || "",
    street: form.street || getDefaultAddressFields().street,
    city: form.city || getDefaultAddressFields().city,
    postcode: form.postcode || getDefaultAddressFields().postcode,
    notes: form.notes,
  };

  if (cart.length === 0 && !isOrderConfirmationOpen) {
    return null;
  }

  if (isOrderConfirmationOpen) {
    return (
      <SitePageLayout>
        <div className={styles.page} aria-hidden="true" />
      </SitePageLayout>
    );
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (values) => {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Name is required";
    if (!values.email.trim()) nextErrors.email = "Email is required";
    if (!values.phone.trim()) nextErrors.phone = "Phone is required";
    if (!values.street.trim()) nextErrors.street = "Street address is required";
    if (!values.city.trim()) nextErrors.city = "City is required";
    if (!values.postcode.trim()) nextErrors.postcode = "Postcode is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const completeOrder = (details) => {
    setSubmitting(true);
    const order = placeOrder(details);
    if (!order) {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(formValues)) return;

    if (!user) {
      setPendingCheckoutDetails(formValues);
      openAuthModal("guest");
      return;
    }

    completeOrder(formValues);
  };

  return (
    <SitePageLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <Link href="/services" className={styles.backLink}>
            ← Back to menu
          </Link>
          <h1 className={styles.title}>Checkout</h1>
          <p className={styles.subtitle}>
            {orderType === "collection" ? "Collection" : "Delivery"} ·{" "}
            {SITE.estimatedTime} estimated
          </p>
        </div>

        <div className={styles.grid}>
          <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
            <h2 className={styles.cardTitle}>Delivery details</h2>

            <div className={styles.row}>
              <Field
                label="Full name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
            </div>

            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />

            <Field
              label="Street address"
              name="street"
              value={formValues.street}
              onChange={handleChange}
              error={errors.street}
              required
            />

            <div className={styles.row}>
              <Field
                label="City"
                name="city"
                value={formValues.city}
                onChange={handleChange}
                error={errors.city}
                required
              />
              <Field
                label="Postcode"
                name="postcode"
                value={formValues.postcode}
                onChange={handleChange}
                error={errors.postcode}
                required
              />
            </div>

            <label className={styles.field}>
              <span className={styles.label}>Order notes (optional)</span>
              <textarea
                name="notes"
                value={formValues.notes}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Any special instructions..."
                rows={3}
              />
            </label>

            {!user && (
              <p className={styles.authHint}>
                You&apos;ll be asked to sign in or continue as guest before
                placing your order.
              </p>
            )}

            <button
              type="submit"
              className={styles.placeOrderBtn}
              disabled={submitting}
            >
              {submitting ? "Placing order..." : "Place order"}
            </button>
          </form>

          <aside className={styles.summaryCard}>
            <h2 className={styles.cardTitle}>Order summary</h2>
            <ul className={styles.items}>
              {cart.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>× {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Service</span>
              <span className={styles.capitalize}>{orderType}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </aside>
        </div>
      </div>
    </SitePageLayout>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  required = false,
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        required={required}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
