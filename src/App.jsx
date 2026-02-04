import { lazy, Suspense, useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy load sections below the fold
const OurStory = lazy(() => import('./components/OurStory'));
const Gallery = lazy(() => import('./components/Gallery'));
const EventDetails = lazy(() => import('./components/EventDetails'));
const RSVP = lazy(() => import('./components/RSVP'));
const PracticalInfo = lazy(() => import('./components/PracticalInfo'));
const Registry = lazy(() => import('./components/Registry'));
const FAQ = lazy(() => import('./components/FAQ'));
const GuestBook = lazy(() => import('./components/GuestBook'));
const Contact = lazy(() => import('./components/Contact'));
const AdminUpload = lazy(() => import('./components/AdminUpload'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-rose-light border-t-rose rounded-full animate-spin" />
        <span
          className="text-xs text-charcoal-light tracking-wider uppercase"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Caricamento...
        </span>
      </div>
    </div>
  );
}

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();

  // Hidden admin route
  if (hash === '#/gestione-foto-ed2026') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <AdminUpload />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <OurStory />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Gallery />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <EventDetails />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <RSVP />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PracticalInfo />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Registry />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <GuestBook />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />

      <EasterEgg />
    </div>
  );
}

// Easter egg - Konami code triggers falling hearts
function EasterEgg() {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
  ];

  let position = 0;

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[position]) {
        position++;
        if (position === konamiCode.length) {
          position = 0;
          triggerHearts();
        }
      } else {
        position = 0;
      }
    });
  }

  return null;
}

function triggerHearts() {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(container);

  if (!document.getElementById('heart-fall-style')) {
    const style = document.createElement('style');
    style.id = 'heart-fall-style';
    style.textContent = `@keyframes heartFall { to { transform: translateY(110vh) rotate(360deg); opacity: 0; } }`;
    document.head.appendChild(style);
  }

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement('span');
      const emojis = ['\u{1F495}', '\u{1F496}', '\u{1F497}', '\u2728', '\u{1F48D}'];
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.cssText = `position:absolute;left:${Math.random() * 100}vw;top:-30px;font-size:${20 + Math.random() * 20}px;animation:heartFall ${2 + Math.random() * 3}s linear forwards;opacity:${0.6 + Math.random() * 0.4};`;
      container.appendChild(heart);
    }, i * 100);
  }

  setTimeout(() => container.remove(), 6000);
}
