import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import content from '../data/content.json';

export default function Footer() {
  const { days, isOver } = useCountdown(content.wedding.date);

  return (
    <footer
      className="relative py-20 md:py-28 px-6 text-center overflow-hidden"
      style={{ background: 'var(--color-charcoal)' }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Names */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-warm-white mb-5"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >
          Ele <span className="text-rose" style={{ fontStyle: 'italic' }}>&</span> Davi
        </motion.h3>

        {/* Date */}
        <p
          className="text-warm-white/40 mb-10"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase' }}
        >
          6 Giugno 2026 &middot; Capoterra, Sardegna
        </p>

        {/* Countdown summary */}
        {!isOver && (
          <p
            className="text-warm-white/60 mb-10"
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.15rem' }}
          >
            Mancano solo <span className="text-rose">{days}</span> giorni
          </p>
        )}

        {/* Divider */}
        <div
          className="w-16 h-px mx-auto mb-10"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
        />

        {/* Quote */}
        <p
          className="text-warm-white/30 italic mb-14 max-w-md mx-auto"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '0.875rem', lineHeight: 1.8 }}
        >
          {content.quotes[0]}
        </p>

        {/* Made with love */}
        <p
          className="text-warm-white/25 flex items-center justify-center gap-1.5 mb-4"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.1em' }}
        >
          Made with <Heart size={11} className="text-rose" fill="currentColor" /> in Sardegna
        </p>

        {/* Copyright */}
        <p
          className="text-warm-white/15"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.1em' }}
        >
          &copy; 2026 Ele & Davi
        </p>
      </div>
    </footer>
  );
}
