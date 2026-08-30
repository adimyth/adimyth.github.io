import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import CTA from "@/components/CTA";
import { profile } from "@/lib/data";

export const metadata = {
  title: `About · ${profile.name}`,
  description: profile.tagline,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Education />
        <Skills />
        <Resume />
        <CTA />
      </main>
    </>
  );
}
