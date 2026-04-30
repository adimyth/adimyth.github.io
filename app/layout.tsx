import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "Aditya Mishra",
  description:
    "8+ years building production AI systems end-to-end, from classical ML and NLP to Generative AI, LLM-powered applications, and Agentic AI. Open to new opportunities.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Aditya Mishra",
    description:
      "8+ years building production AI systems end-to-end. Open to new opportunities.",
    url: "https://adimyth.github.io",
    siteName: "Aditya Mishra",
    type: "website",
    images: [
      {
        url: "https://adimyth.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aditya Mishra - Sr. Technical Architect & AI Engineer",
      },
    ],
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
      className={`${inter.variable} ${lora.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
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
    </html>
  );
}
