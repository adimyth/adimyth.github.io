import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Essays from "@/components/Essays";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Essays />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Resume />
        <CTA />
      </main>
    </>
  );
}
