import type { Metadata } from "next";
import { Inter, Lora, Fira_Code, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { SITE_URL, profile } from "@/lib/data";
import PersonJsonLd from "@/components/PersonJsonLd";
import Footer from "@/components/Footer";
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

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.name} · ${profile.title}`,
  description: "Principal Engineer building foundational backend and platform systems, LLM applications, voice agents, and multi-agent systems.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon",
  },
  openGraph: {
    title: `${profile.name} · ${profile.title}`,
    description: "Principal Engineer building foundational backend and platform systems, LLM applications, voice agents, and multi-agent systems.",
    url: SITE_URL,
    siteName: "Aditya Mishra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.title}`,
    description: "Principal Engineer building foundational backend and platform systems, LLM applications, voice agents, and multi-agent systems.",
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
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${lora.variable} ${sourceSerif.variable} ${firaCode.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`}
        </Script>
        {children}
        <Footer />
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
