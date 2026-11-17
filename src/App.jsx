import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Expertise from './components/Expertise.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import TechnicalGrid from './components/TechnicalGrid.jsx';
import { SectionDivider } from './components/SectionHeading.jsx';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-lime px-4 py-2 text-sm font-medium text-ink transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <TechnicalGrid />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <SectionDivider />
        <Expertise />
        <Experience />
        <SectionDivider />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
