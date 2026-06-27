"use client";

import { useState } from "react";
import useAppStore from "@/store/useAppStore";
import { buildUserRecord } from "@/utils/user";
import { useScrollLock } from "@/hooks/useScrollLock";
import styles from "./AuthModal.module.css";

export default function AuthModal() {
  const authTab = useAppStore((s) => s.authTab);
  const setAuthTab = useAppStore((s) => s.setAuthTab);
  const closeAuthModal = useAppStore((s) => s.closeAuthModal);
  const login = useAppStore((s) => s.login);
  const placeOrder = useAppStore((s) => s.placeOrder);
  const pendingCheckoutDetails = useAppStore((s) => s.pendingCheckoutDetails);
  const clearPendingCheckoutDetails = useAppStore(
    (s) => s.clearPendingCheckoutDetails
  );

  useScrollLock(true);

  const finishAuth = (userData) => {
    login(userData);
    closeAuthModal();

    if (pendingCheckoutDetails) {
      const order = placeOrder(pendingCheckoutDetails);
      if (order) {
        clearPendingCheckoutDetails();
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    finishAuth(
      buildUserRecord({
        name: email.split("@")[0],
        email,
        authType: "login",
      })
    );
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    finishAuth(
      buildUserRecord({
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        authType: "signup",
      })
    );
  };

  const handleGuest = (e) => {
    e.preventDefault();
    const form = e.target;
    finishAuth(
      buildUserRecord({
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        authType: "guest",
        guest: true,
      })
    );
  };

  return (
    <div className={styles.overlay} role="presentation">
      <div
        className={styles.backdrop}
        onClick={closeAuthModal}
        aria-hidden="true"
      />
      <div className={styles.modal} role="dialog" aria-label="Log in or sign up">
        <div className={styles.modalHeader}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={closeAuthModal}
            aria-label="Close"
          >
            ‹
          </button>
          <span>Log in / Sign up</span>
        </div>

        <div className={styles.body}>
          <div className={styles.tabs}>
            {["login", "signup", "guest"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.tab} ${authTab === tab ? styles.tabActive : ""}`}
                onClick={() => setAuthTab(tab)}
              >
                {tab === "login" ? "Log in" : tab === "signup" ? "Sign up" : "Guest"}
              </button>
            ))}
          </div>

          {authTab === "login" && <LoginForm onSubmit={handleLogin} />}
          {authTab === "signup" && <SignupForm onSubmit={handleSignup} />}
          {authTab === "guest" && <GuestForm onSubmit={handleGuest} />}
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onSubmit }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.formTitle}>Login</h2>
      <p className={styles.formDesc}>
        Log in to access your account, track your orders, and unlock exclusive
        rewards.
      </p>
      <label className={styles.label}>
        Email
        <input type="email" name="email" placeholder="Email" required />
      </label>
      <label className={styles.label}>
        Password
        <input type="password" name="password" placeholder="Password" required />
      </label>
      <button type="button" className={styles.forgotLink}>
        Forgot password ?
      </button>
      <button type="submit" className={styles.submitBtn}>
        Login
      </button>
    </form>
  );
}

function SignupForm({ onSubmit }) {
  const [acceptData, setAcceptData] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.formTitle}>Sign up</h2>
      <p className={styles.formDesc}>
        Sign up to enjoy exclusive perks, personalised offers, and easy access
        to your order history.
      </p>
      <div className={styles.row}>
        <label className={styles.label}>
          Name
          <input type="text" name="name" placeholder="Name" required />
        </label>
        <label className={styles.label}>
          Email
          <input type="email" name="email" placeholder="Email" required />
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.label}>
          Password
          <input type="password" name="password" placeholder="Password" required />
        </label>
        <label className={styles.label}>
          Confirm password
          <input type="password" name="confirmPassword" placeholder="Confirm password" required />
        </label>
      </div>
      <label className={styles.label}>
        Phone
        <input type="tel" name="phone" placeholder="Phone" />
      </label>
      <Toggle
        checked={acceptData}
        onChange={setAcceptData}
        label="I accept to store my data for the purpose of managing orders."
      />
      <Toggle
        checked={marketing}
        onChange={setMarketing}
        label="Tick this box if you would not like to receive our marketing offers and promotions via email."
      />
      <button type="submit" className={styles.submitBtn}>
        Sign up
      </button>
    </form>
  );
}

function GuestForm({ onSubmit }) {
  const [acceptData, setAcceptData] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.formTitle}>Guest</h2>
      <p className={styles.formDesc}>
        Continue as a guest for a quick and hassle-free checkout.
      </p>
      <label className={styles.label}>
        Name
        <input type="text" name="name" placeholder="Name" required />
      </label>
      <label className={styles.label}>
        Email
        <input type="email" name="email" placeholder="Email" required />
      </label>
      <label className={styles.label}>
        Phone
        <input type="tel" name="phone" placeholder="Phone" />
      </label>
      <Toggle
        checked={acceptData}
        onChange={setAcceptData}
        label="I accept to store my data for the purpose of managing orders."
      />
      <Toggle
        checked={marketing}
        onChange={setMarketing}
        label="Tick this box if you would not like to receive our marketing offers and promotions via email."
      />
      <button type="submit" className={styles.submitBtn}>
        Checkout as guest
      </button>
    </form>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className={styles.toggle}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`${styles.switch} ${checked ? styles.switchOn : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.switchThumb} />
      </button>
      <span className={styles.toggleLabel}>{label}</span>
    </label>
  );
}
