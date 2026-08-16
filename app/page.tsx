import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main id="main" className="shell">
        <Hero />
        <hr className="rule" />
        <Capabilities />
        <hr className="rule" />
        <Experience />
        <hr className="rule" />
        <Stack />
        <hr className="rule" />
        <Projects />
        <hr className="rule" />
        <About />
        <hr className="rule" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
