import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Blogs from "@/components/Blogs";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Blogs />
        <CTA />
      </main>
    </>
  );
}
