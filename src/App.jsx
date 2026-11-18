import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import Preloader from './components/Preloader.jsx';
import { SectionDivider } from './components/SectionHeading.jsx';
import useReducedMotion from './hooks/useReducedMotion.js';
import { destroySmoothScroll, initSmoothScroll } from './lib/smoothScroll.js';

const INTRO_KEY = 'intro-seen';

/** Play the intro once per browser session, and never with reduced motion. */
function shouldPlayIntro() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(INTRO_KEY);
  } catch {
    return true;
  }
}

export default function App() {
  const reduced = useReducedMotion();
  const [loading, setLoading] = useState(shouldPlayIntro);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage unavailable — intro simply replays next visit */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading || reduced) return undefined;
    initSmoothScroll();
    return destroySmoothScroll;
  }, [loading, reduced]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-lime px-4 py-2 text-sm font-medium text-ink transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <TechnicalGrid />

      <AnimatePresence>{loading && <Preloader key="preloader" onDone={finishIntro} />}</AnimatePresence>

      {!loading && (
        <>
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
      )}
    </>
  );
}
