import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, CreditCard, ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import content from '../data/content.json';

export default function Registry() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <section id="lista-nozze" className="section-padding relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="watercolor-blob watercolor-blob-gold"
        style={{ width: '500px', height: '500px', top: '-150px', right: '-200px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-rose"
        style={{ width: '400px', height: '400px', bottom: '-100px', left: '-150px', borderRadius: '50%' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-subtitle mb-5"
          >
            Il viaggio di nozze
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="section-title"
          >
            Lista Nozze
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(196, 166, 161, 0.1)' }}
          >
            <Heart size={20} className="text-rose" strokeWidth={1.5} />
          </div>
          <p
            className="text-charcoal-light italic leading-relaxed"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.8 }}
          >
            {content.registry.message}
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {content.registry.experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.8, 0.25, 1] }}
              className="group cursor-pointer"
              onClick={() => setSelectedExp(exp)}
            >
              <div className="card-elevated p-7 h-full flex flex-col">
                <span className="text-3xl mb-5 block">{exp.image}</span>
                <h4
                  className="text-charcoal mb-3"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '1.1rem' }}
                >
                  {exp.title}
                </h4>
                <p
                  className="text-charcoal-muted mb-5 flex-1"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.8rem', lineHeight: 1.75 }}
                >
                  {exp.description}
                </p>
                <div
                  className="flex items-center justify-between mt-auto pt-5"
                  style={{ borderTop: '1px solid rgba(196, 166, 161, 0.12)' }}
                >
                  <span
                    className="text-rose-dark"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '1.1rem' }}
                  >
                    &euro;{exp.price}
                  </span>
                  <span
                    className="text-charcoal-muted group-hover:text-rose-dark transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' }}
                  >
                    Regala &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* IBAN section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="card-elevated p-10">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(191, 162, 110, 0.1)' }}
            >
              <CreditCard size={18} className="text-gold" strokeWidth={1.5} />
            </div>
            <h4
              className="text-charcoal mb-5"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.3rem' }}
            >
              Contributo Libero
            </h4>
            <p className="text-charcoal-muted mb-8" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.825rem', lineHeight: 1.8 }}>
              Se preferisci, puoi contribuire al nostro viaggio di nozze tramite bonifico bancario o PayPal.
            </p>
            <div className="space-y-5">
              <div
                className="p-6"
                style={{ background: 'var(--color-cream)', borderRadius: '2px' }}
              >
                <p
                  className="mb-1.5"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
                >
                  Intestato a
                </p>
                <p className="text-charcoal mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
                  {content.registry.ibanHolder}
                </p>
                <p
                  className="mb-1.5"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
                >
                  IBAN
                </p>
                <p
                  className="text-charcoal font-mono select-all"
                  style={{ fontSize: '0.825rem', letterSpacing: '0.03em' }}
                >
                  {content.registry.iban}
                </p>
              </div>
              <a
                href={content.registry.paypalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                PayPal <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Experience detail modal */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(46, 44, 42, 0.55)', backdropFilter: 'blur(6px)' }}
            onClick={() => setSelectedExp(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ ease: [0.25, 0.8, 0.25, 1] }}
              className="max-w-md w-full p-10"
              style={{
                background: 'var(--color-warm-white)',
                borderRadius: '2px',
                boxShadow: '0 24px 64px rgba(46, 44, 42, 0.15)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-5xl block text-center mb-5">{selectedExp.image}</span>
              <h3
                className="text-2xl text-charcoal text-center mb-4"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                {selectedExp.title}
              </h3>
              <p
                className="text-charcoal-muted text-center mb-8"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.825rem', lineHeight: 1.8 }}
              >
                {selectedExp.description}
              </p>
              <div className="text-center mb-8">
                <span
                  className="text-rose-dark"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '2rem' }}
                >
                  &euro;{selectedExp.price}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={content.registry.paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  <Gift size={14} className="mr-2 inline" />
                  Regala con PayPal
                </a>
                <button
                  onClick={() => setSelectedExp(null)}
                  className="btn-outline"
                >
                  Chiudi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
