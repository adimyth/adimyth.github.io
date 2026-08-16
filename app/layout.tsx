import type { Metadata } from "next";
import { Inter, Lora, Fira_Code } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/lib/data";
import PersonJsonLd from "@/components/PersonJsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Aditya Mishra · Principal Engineer & AI Engineer",
  description:
    "9+ years building distributed systems and the AI products that run on them, from real-time data infrastructure and platform services at enterprise scale to LLM applications, voice agents, and multi-agent platforms. Open to new opportunities.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon",
  },
  openGraph: {
    title: "Aditya Mishra · Principal Engineer & AI Engineer",
    description:
      "9+ years building distributed systems and the AI products that run on them, from real-time data infrastructure and platform services at enterprise scale to LLM applications, voice agents, and multi-agent platforms.",
    url: SITE_URL,
    siteName: "Aditya Mishra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Mishra · Principal Engineer & AI Engineer",
    description:
      "9+ years building distributed systems and the AI products that run on them, from real-time data infrastructure and platform services at enterprise scale to LLM applications, voice agents, and multi-agent platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${lora.variable} ${firaCode.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
        <PersonJsonLd />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0E0FNTMPJX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0E0FNTMPJX');
          `}
        </Script>
      </body>
    </html>
  );
}
