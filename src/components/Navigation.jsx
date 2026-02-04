import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'La Nostra Storia', href: '#storia' },
  { label: 'Galleria', href: '#galleria' },
  { label: 'Evento', href: '#evento' },
  { label: 'RSVP', href: '#rsvp' },
  { label: 'Info', href: '#info' },
  { label: 'Lista Nozze', href: '#lista-nozze' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-md'
            : 'bg-transparent'
        }`}
        style={{
          boxShadow: isScrolled ? '0 1px 0 rgba(196, 166, 161, 0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#"
              className="text-charcoal group"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.05em' }}
            >
              E{' '}
              <span className="text-rose-dark transition-colors duration-300 group-hover:text-gold" style={{ fontStyle: 'italic' }}>
                &
              </span>
              {' '}D
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-charcoal-muted hover:text-charcoal transition-colors duration-400 relative group"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-charcoal hover:text-rose-dark transition-colors duration-300"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Chiudi menu' : 'Apri menu'}
            >
              {isMobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-cream/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            {/* Close button at top right */}
            <button
              className="absolute top-5 right-6 p-2 text-charcoal hover:text-rose-dark transition-colors"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Chiudi menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            {/* Logo in mobile menu */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-charcoal mb-12"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 300 }}
            >
              Ele <span className="text-rose-dark" style={{ fontStyle: 'italic' }}>&</span> Davi
            </motion.p>

            <nav className="flex flex-col items-center gap-7">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease: [0.25, 0.8, 0.25, 1] }}
                  className="text-charcoal-light hover:text-charcoal transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase' }}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Decorative line at bottom */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="decorative-line absolute bottom-16"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
