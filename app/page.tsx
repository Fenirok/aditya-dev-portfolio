import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import { SocialSide } from "@/components/Side";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Jobs from "@/components/Jobs";
import Featured from "@/components/Featured";
import Projects from "@/components/Projects";
import Beyond from "@/components/Beyond";
import Socials from "@/components/Socials";
import { Contact, Footer } from "@/components/Contact";
import HorizontalDeck, { type Slide } from "@/components/HorizontalDeck";

export default function Home() {
  // One full-screen slide per step. On desktop, each scroll slides
  // sideways to the next one; on phones it's a normal vertical page.
  const slides: Slide[] = [
    { key: "home", label: "Home", navId: "", content: <Hero /> },
    { key: "about", label: "About", navId: "about", content: <About /> },
    { key: "experience", label: "Experience", navId: "jobs", content: <Jobs /> },
    {
      key: "work",
      label: "Work",
      navId: "projects",
      content: (
        <>
          <Featured />
          <Projects />
        </>
      ),
    },
    { key: "beyond", label: "Beyond", navId: "beyond", content: <Beyond /> },
    { key: "socials", label: "Socials", navId: "socials", content: <Socials /> },
    {
      key: "contact",
      label: "Contact",
      navId: "contact",
      content: (
        <>
          <Contact />
          <Footer />
        </>
      ),
    },
  ];

  return (
    <>
      <a
        href="#content"
        className="absolute -left-[9999px] top-auto z-[99] rounded bg-green-tint px-4 py-3 font-mono text-[13px] text-green focus:left-[50%] focus:top-0 focus:-translate-x-1/2"
      >
        Skip to Content
      </a>
      <Loader />
      <Nav />
      <SocialSide />
      <main id="content" className="min-h-screen">
        <HorizontalDeck slides={slides} />
      </main>
    </>
  );
}
