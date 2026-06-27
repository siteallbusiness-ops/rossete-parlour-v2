import Logo from "@/components/Common/Logo";
import styles from "./LandingTopBar.module.css";

export default function LandingTopBar() {
  return (
    <div className={styles.topBar}>
      <Logo className={styles.logo} />
    </div>
  );
}
