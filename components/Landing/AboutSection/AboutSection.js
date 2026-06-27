import Image from "next/image";
import { SITE } from "@/constants/site";
import { LANDING_IMAGES } from "@/constants/landing";
import { ABOUT_TITLE_LETTERS } from "@/constants/sectionTitles";
import AnimatedSectionTitle from "@/components/Landing/AnimatedSectionTitle";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <AnimatedSectionTitle
            id="about-title"
            ariaLabel="About Us"
            letters={ABOUT_TITLE_LETTERS}
            variant="about"
            showRule
          />
          <p className={styles.text}>{SITE.aboutText}</p>
        </div>

        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <Image
              src={LANDING_IMAGES.about.src}
              alt={LANDING_IMAGES.about.alt}
              width={LANDING_IMAGES.about.width}
              height={LANDING_IMAGES.about.height}
              className={styles.image}
              loading="lazy"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
