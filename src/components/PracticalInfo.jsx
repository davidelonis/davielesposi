import { motion } from 'framer-motion';
import { Hotel, Car, ExternalLink, MapPin } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import content from '../data/content.json';

export default function PracticalInfo() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  return (
    <section id="info" className="section-padding relative" style={{ background: 'var(--color-warm-white)' }}>
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            Tutto quello che serve
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title"
          >
            Informazioni Pratiche
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Accommodation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Hotel size={24} className="text-rose-dark" />
            <h3
              className="text-2xl text-charcoal"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
            >
              Dove Alloggiare
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {content.accommodation.map((hotel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-cream rounded-sm border border-rose-light/20 hover:shadow-md transition-shadow duration-300"
              >
                <h4
                  className="text-lg text-charcoal mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
                >
                  {hotel.name}
                </h4>
                <p className="text-xs text-charcoal-light mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                  {hotel.address}
                </p>
                <p className="text-xs text-rose-dark mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                  {hotel.distance}
                </p>
                <p className="text-xs text-charcoal-light italic mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                  {hotel.note}
                </p>
                {hotel.website !== '#' && (
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-rose-dark hover:text-charcoal transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Visita sito <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transport */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Car size={24} className="text-rose-dark" />
            <h3
              className="text-2xl text-charcoal"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
            >
              Come Arrivare
            </h3>
          </div>

          <div className="p-6 bg-cream rounded-sm border border-rose-light/20 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={18} className="text-sage-dark" />
              <h4
                className="text-base text-charcoal"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
              >
                In Auto
              </h4>
            </div>
            <p className="text-sm text-charcoal-light mb-4" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              Corte Maddalena si trova a Capoterra, facilmente raggiungibile dalla SS195.
              C'è un <strong>ampio parcheggio</strong> all'ingresso della location.
            </p>
            <a
              href={content.wedding.location.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-rose-dark hover:text-charcoal transition-colors uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Apri in Google Maps <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
