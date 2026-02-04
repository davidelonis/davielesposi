import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import content from '../data/content.json';

export default function Hero() {
  const { days, hours, minutes, seconds, isOver } = useCountdown(content.wedding.date);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grain-texture"
      style={{ background: 'linear-gradient(170deg, var(--color-cream) 0%, var(--color-linen) 40%, var(--color-rose-light) 100%)' }}
    >
      {/* Decorative watercolor blobs */}
      <div
        className="watercolor-blob watercolor-blob-rose"
        style={{ width: '700px', height: '700px', top: '-200px', right: '-250px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-sage"
        style={{ width: '600px', height: '600px', bottom: '-180px', left: '-250px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-gold"
        style={{ width: '400px', height: '400px', top: '12%', left: '5%', borderRadius: '50%', opacity: 0.05 }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
          className="text-charcoal-muted mb-10"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.45em', textTransform: 'uppercase' }}
        >
          Ci Sposiamo
        </motion.p>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
          className="mb-8"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, lineHeight: 1.05 }}
        >
          <span className="text-charcoal text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem]">Ele</span>
          <span
            className="text-rose-dark mx-5 md:mx-8 inline-block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            style={{ fontStyle: 'italic', fontWeight: 300 }}
          >
            &
          </span>
          <span className="text-charcoal text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem]">Davi</span>
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.25, 0.8, 0.25, 1] }}
          className="decorative-line-wide my-10 md:my-12"
        />

        {/* Date and location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p
            className="text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', letterSpacing: '0.08em' }}
          >
            6 Giugno 2026
          </p>
          <p
            className="text-charcoal-muted"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase' }}
          >
            Corte Maddalena &middot; Capoterra &middot; Sardegna
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 md:mt-24"
        >
          {isOver ? (
            <p
              className="text-2xl md:text-3xl text-charcoal"
              style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 300 }}
            >
              Finalmente sposi!
            </p>
          ) : (
            <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-14">
              <CountdownUnit value={days} label="Giorni" />
              <CountdownSeparator />
              <CountdownUnit value={hours} label="Ore" />
              <CountdownSeparator />
              <CountdownUnit value={minutes} label="Minuti" />
              <div className="hidden sm:flex items-center gap-8 md:gap-14">
                <CountdownSeparator />
                <CountdownUnit value={seconds} label="Secondi" />
              </div>
            </div>
          )}
        </motion.div>

        {/* RSVP Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-16 md:mt-20"
        >
          <a href="#rsvp" className="btn-primary">
            Conferma la tua Presenza
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="text-charcoal-muted"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}
        >
          Scorri
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-rose-dark" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="text-center">
      <span
        className="block text-charcoal tabular-nums"
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1 }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        className="block text-charcoal-muted mt-3"
        style={{ fontFamily: 'var(--font-body)', fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase' }}
      >
        {label}
      </span>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <div className="flex flex-col items-center gap-1.5 -mt-3">
      <div className="w-1 h-1 rounded-full bg-gold" />
      <div className="w-1 h-1 rounded-full bg-gold opacity-40" />
    </div>
  );
}
