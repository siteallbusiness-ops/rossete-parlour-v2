import Link from "next/link";
import Logo from "@/components/Common/Logo";
import SocialLinks from "@/components/Common/SocialLinks";
import Newsletter from "@/components/Forms/Newsletter";
import { SITE } from "@/constants/site";
import { FOOTER_NAV, FOOTER_QUICK_LINKS } from "@/constants/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo variant="footer" className={styles.logo} />
            <p className={styles.tagline}>{SITE.tagline}</p>
            <SocialLinks />
          </div>

          <div className={styles.column}>
            <h2 className={styles.heading}>Navigation</h2>
            <ul className={styles.links}>
              {FOOTER_NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={styles.link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.heading}>Quick Links</h2>
            <ul className={styles.links}>
              {FOOTER_QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={styles.link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.heading}>Contact</h2>
            <address className={styles.contact}>
              <p>{SITE.address.street}</p>
              <p>
                {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              </p>
              <p>
                <a href={`mailto:${SITE.email}`} className={styles.link}>
                  {SITE.email}
                </a>
              </p>
              <p>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className={styles.link}>
                  {SITE.phone}
                </a>
              </p>
            </address>
          </div>

          <div className={styles.newsletter}>
            <Newsletter />
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
