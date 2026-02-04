import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import content from '../data/content.json';

export default function Footer() {
  const { days, isOver } = useCountdown(content.wedding.date);

  return (
    <footer className="relative py-16 px-6 text-center overflow-hidden" style={{ background: 'var(--color-charcoal)' }}>
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
          className="text-4xl md:text-5xl text-warm-white mb-4"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
        >
          Ele <span className="text-rose">&</span> Davi
        </motion.h3>

        {/* Date */}
        <p
          className="text-xs uppercase tracking-[0.3em] text-warm-white/50 mb-8"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          6 Giugno 2026 &middot; Capoterra, Sardegna
        </p>

        {/* Countdown summary */}
        {!isOver && (
          <p
            className="text-lg text-warm-white/70 mb-8"
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Mancano solo <span className="text-rose">{days}</span> giorni
          </p>
        )}

        {/* Divider */}
        <div
          className="w-12 h-px mx-auto mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
        />

        {/* Quote */}
        <p
          className="text-sm text-warm-white/40 italic mb-10 max-w-md mx-auto"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
        >
          {content.quotes[0]}
        </p>

        {/* Made with love */}
        <p
          className="text-xs text-warm-white/30 flex items-center justify-center gap-1"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Made with <Heart size={12} className="text-rose" fill="currentColor" /> in Sardegna
        </p>

        {/* Copyright */}
        <p
          className="text-[10px] text-warm-white/20 mt-3"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          &copy; 2026 Ele & Davi
        </p>
      </div>
    </footer>
  );
}
