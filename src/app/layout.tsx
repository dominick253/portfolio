import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Inter font via Google Fonts
const geistSans = await fetch(
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
).then((res) => res.text());

export const metadata: Metadata = {
  title: {
    default: "Dominick Pescetto - AI Engineer & CTV Platform Architect",
    template: "%s | Dominick Pescetto",
  },
  description:
    "AI Engineer and Principal Architect building production-grade AI infrastructure and cross-platform streaming apps for Roku, FireTV, Android TV, Tizen, and webOS.",
  keywords: [
    "AI Engineer",
    "CTV Platform",
    "Roku",
    "FireTV",
    "Android TV",
    "webOS",
    "Tizen",
    "Hermes Agent",
    "MCP",
    "vLLM",
    "Proxmox",
    "Kubernetes",
    "CodeGraphContext",
    "Dominick Pescetto",
  ],
  authors: [{ name: "Dominick Pescetto" }],
  openGraph: {
    type: "profile",
    locale: "en_US",
    siteName: "Dominick Pescetto",
    title: "Dominick Pescetto - AI Engineer & CTV Platform Architect",
    description:
      "Building production-grade AI infrastructure and cross-platform streaming apps for Roku, FireTV, Android TV, Tizen, and webOS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominick Pescetto - AI Engineer & CTV Platform Architect",
    description:
      "Building production-grade AI infrastructure and cross-platform streaming apps for Roku, FireTV, Android TV, Tizen, and webOS.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-site-verification",
  },
};

// JSON-LD structured data for Person schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dominick Pescetto",
  url: "https://www.dominickp.com",
  jobTitle: "AI Engineer & Principal Architect",
  description:
    "AI Engineer and CTV Platform Architect building production-grade AI infrastructure and cross-platform streaming apps.",
  sameAs: [
    "https://github.com/dominick253",
    "https://www.youtube.com/channel/UCLJ1DvfOket2VpfooqYVPmQ",
    "https://www.freecodecamp.org/Dominick253",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className="bg-canvas">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        {/* Inline font CSS to prevent layout shift */}
        <style dangerouslySetInnerHTML={{ __html: geistSans }} />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-text-primary font-sans antialiased selection:bg-accent/20 selection:text-text-primary">
        <div className="relative z-[1]">
          {children}
        </div>
      </body>
    </html>
  );
}
