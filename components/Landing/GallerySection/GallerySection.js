import Link from "next/link";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/constants/gallery";
import { GALLERY_TITLE_LETTERS } from "@/constants/sectionTitles";
import { formatPrice } from "@/utils/format";
import AnimatedSectionTitle from "@/components/Landing/AnimatedSectionTitle";
import CategoryIcon from "@/components/Order/CategoryIcon";
import styles from "./GallerySection.module.css";

export default function GallerySection() {
  return (
    <section className={styles.gallery} id="gallery" aria-labelledby="gallery-title">
      <div className={styles.inner}>
        <AnimatedSectionTitle
          id="gallery-title"
          ariaLabel="Gallery"
          letters={GALLERY_TITLE_LETTERS}
          variant="gallery"
          eyebrow="Our favourites"
          lead="Explore our most-loved categories — handcrafted treats made fresh for every order."
          showRule
          className={styles.sectionHeader}
        />

        <div className={styles.gridWrap}>
          <div className={styles.grid}>
            {GALLERY_ITEMS.map((item, index) => (
              <Link
                key={item.id}
                href={`/services#category-${item.categoryId}`}
                className={styles.cardLink}
              >
                <article className={styles.card}>
                  <div className={styles.frame}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className={styles.image}
                      loading="lazy"
                      sizes="(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 220px"
                    />
                    <div className={styles.overlay} aria-hidden="true" />
                    <div className={styles.caption}>
                      <span className={styles.index}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.iconWrap} aria-hidden="true">
                        <CategoryIcon
                          categoryId={item.categoryId}
                          className={styles.categoryIcon}
                        />
                      </span>
                      <div className={styles.captionText}>
                        <span className={styles.captionLabel}>{item.label}</span>
                        <span className={styles.featured}>
                          {item.featuredProduct}
                          <span className={styles.featuredPrice}>
                            {formatPrice(item.featuredPrice)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <Link href="/services" className={styles.ctaBtn}>
            Explore full menu
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
