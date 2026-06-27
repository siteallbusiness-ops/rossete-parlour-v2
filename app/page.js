import LandingTopBar from "@/components/Landing/LandingTopBar";
import LandingHero from "@/components/Landing/LandingHero";
import AboutSection from "@/components/Landing/AboutSection";
import GallerySection from "@/components/Landing/GallerySection";
import LandingFooter from "@/components/Landing/LandingFooter";
import CookieBanner from "@/components/Landing/CookieBanner";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.landing}>
      <div className={styles.backgroundBase} aria-hidden="true" />
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.bubbleBackground} aria-hidden="true" />
      <div className={styles.content}>
        <LandingTopBar />
        <LandingHero />
        <AboutSection />
        <GallerySection />
        <LandingFooter />
        <CookieBanner />
      </div>
    </div>
  );
}
