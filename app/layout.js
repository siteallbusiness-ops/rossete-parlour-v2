import { Montserrat, Playfair_Display } from "next/font/google";
import MainLayout from "@/components/Layout";
import { SITE } from "@/constants/site";
import { createMetadata } from "@/utils/metadata";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = createMetadata({
  title: SITE.name,
  description: SITE.description,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
