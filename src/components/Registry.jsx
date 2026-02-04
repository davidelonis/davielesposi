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
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            Il viaggio di nozze
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title"
          >
            Lista Nozze
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Heart size={28} className="text-rose mx-auto mb-4" />
          <p
            className="text-base md:text-lg text-charcoal-light italic leading-relaxed"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
          >
            {content.registry.message}
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {content.registry.experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group cursor-pointer"
              onClick={() => setSelectedExp(exp)}
            >
              <div className="bg-warm-white p-6 rounded-sm border border-rose-light/20 hover:border-rose/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <span className="text-4xl mb-4 block">{exp.image}</span>
                <h4
                  className="text-lg text-charcoal mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
                >
                  {exp.title}
                </h4>
                <p
                  className="text-xs text-charcoal-light mb-4 flex-1"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {exp.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-rose-light/20">
                  <span
                    className="text-lg text-rose-dark"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
                  >
                    &euro;{exp.price}
                  </span>
                  <span
                    className="text-xs uppercase tracking-wider text-charcoal-light group-hover:text-rose-dark transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
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
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="p-8 bg-warm-white rounded-sm border border-rose-light/20">
            <CreditCard size={24} className="text-gold mx-auto mb-4" />
            <h4
              className="text-lg text-charcoal mb-4"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
            >
              Contributo Libero
            </h4>
            <p className="text-sm text-charcoal-light mb-6" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              Se preferisci, puoi contribuire al nostro viaggio di nozze tramite bonifico bancario o PayPal.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-cream rounded-sm">
                <p className="text-xs uppercase tracking-wider text-charcoal-light mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                  Intestato a
                </p>
                <p className="text-sm text-charcoal mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  {content.registry.ibanHolder}
                </p>
                <p className="text-xs uppercase tracking-wider text-charcoal-light mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                  IBAN
                </p>
                <p
                  className="text-sm text-charcoal font-mono select-all"
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
                PayPal <ExternalLink size={14} />
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
            className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedExp(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-warm-white p-8 md:p-10 max-w-md w-full rounded-sm shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-5xl block text-center mb-4">{selectedExp.image}</span>
              <h3
                className="text-2xl text-charcoal text-center mb-3"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                {selectedExp.title}
              </h3>
              <p
                className="text-sm text-charcoal-light text-center mb-6"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
              >
                {selectedExp.description}
              </p>
              <div className="text-center mb-6">
                <span
                  className="text-3xl text-rose-dark"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
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
                  <Gift size={16} className="mr-2 inline" />
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
