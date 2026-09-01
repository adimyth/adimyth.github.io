import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import RecentEssays from "@/components/RecentEssays";
import RecentProjects from "@/components/RecentProjects";
import CTA from "@/components/CTA";
import { profile } from "@/lib/data";

export const metadata = {
  title: `About · ${profile.name}`,
  description: profile.summary[0],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <RecentProjects />
        <RecentEssays />
        <Experience />
        <Skills />
        <Resume />
        <CTA />
      </main>
    </>
  );
}
