import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/shared/back-to-top";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import { CookieBanner } from "@/components/shared/cookie-banner";
import { Analytics } from "@/components/shared/analytics";
import { SplashLoader } from "@/components/shared/splash-loader";
import { getAbout, getSiteSettings } from "@/notion/data";
import { site } from "@/lib/config";
import { JsonLd, organizationSchema, personSchema, websiteSchema } from "@/lib/json-ld";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(site.url),
    title: { default: settings.seo.title, template: `%s · ${settings.name}` },
    description: settings.seo.description,
    keywords: settings.seo.keywords,
    authors: [{ name: settings.person }],
    creator: settings.name,
    applicationName: settings.name,
    formatDetection: { telephone: true, email: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: settings.name,
      images: [{ url: "/images/hero.jpg", width: 1600, height: 900, alt: settings.name }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, about] = await Promise.all([getSiteSettings(), getAbout()]);

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen">
        <JsonLd data={[organizationSchema(settings), websiteSchema(settings), personSchema(settings, about)]} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SplashLoader siteName={settings.name} />
          <SiteHeader />
          <main id="main" className="min-h-[60vh]">{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppFloat number={settings.whatsapp} label={settings.name} />
          <CookieBanner />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
