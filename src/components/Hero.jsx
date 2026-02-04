import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import content from '../data/content.json';

export default function Hero() {
  const { days, hours, minutes, seconds, isOver } = useCountdown(content.wedding.date);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--color-cream) 0%, var(--color-cream-dark) 50%, var(--color-rose-light) 100%)' }}
    >
      {/* Decorative watercolor blobs */}
      <div
        className="watercolor-blob watercolor-blob-rose"
        style={{ width: '500px', height: '500px', top: '-100px', right: '-150px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-sage"
        style={{ width: '400px', height: '400px', bottom: '-80px', left: '-120px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-gold"
        style={{ width: '300px', height: '300px', top: '20%', left: '10%', borderRadius: '50%' }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs md:text-sm uppercase tracking-[0.35em] text-rose-dark mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Ci Sposiamo
        </motion.p>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, lineHeight: 1.1 }}
        >
          <span className="text-charcoal">Ele</span>
          <span className="text-rose mx-3 md:mx-5 inline-block" style={{ fontStyle: 'italic', fontWeight: 300 }}>&</span>
          <span className="text-charcoal">Davi</span>
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="decorative-line my-6 md:my-8"
        />

        {/* Date and location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p
            className="text-lg md:text-xl text-charcoal-light mb-2"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, letterSpacing: '0.05em' }}
          >
            6 Giugno 2026
          </p>
          <p
            className="text-xs md:text-sm uppercase tracking-[0.2em] text-rose-dark"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Corte Maddalena &middot; Capoterra &middot; Sardegna
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-12 md:mt-16"
        >
          {isOver ? (
            <p
              className="text-2xl md:text-3xl text-charcoal"
              style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}
            >
              Finalmente sposi!
            </p>
          ) : (
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10">
              <CountdownUnit value={days} label="Giorni" />
              <span className="text-rose text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>:</span>
              <CountdownUnit value={hours} label="Ore" />
              <span className="text-rose text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>:</span>
              <CountdownUnit value={minutes} label="Minuti" />
              <span className="text-rose text-2xl md:text-3xl hidden sm:block" style={{ fontFamily: 'var(--font-heading)' }}>:</span>
              <div className="hidden sm:block">
                <CountdownUnit value={seconds} label="Secondi" />
              </div>
            </div>
          )}
        </motion.div>

        {/* RSVP Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12"
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
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-rose-dark"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Scorri
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-rose" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="text-center">
      <span
        className="block text-3xl sm:text-4xl md:text-5xl text-charcoal tabular-nums"
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-charcoal-light mt-1"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {label}
      </span>
    </div>
  );
}
