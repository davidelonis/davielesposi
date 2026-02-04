import { motion } from 'framer-motion';
import { Hotel, Car, ExternalLink, MapPin } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import content from '../data/content.json';

export default function PracticalInfo() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  return (
    <section
      id="info"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--color-warm-white)' }}
    >
      <div
        className="watercolor-blob watercolor-blob-sage"
        style={{ width: '500px', height: '500px', top: '-150px', left: '-200px', borderRadius: '50%' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-subtitle mb-5"
          >
            Tutto quello che serve
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="section-title"
          >
            Informazioni Pratiche
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Accommodation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(196, 166, 161, 0.12)' }}
            >
              <Hotel size={18} className="text-rose-dark" strokeWidth={1.5} />
            </div>
            <h3
              className="text-2xl md:text-3xl text-charcoal"
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
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.8, 0.25, 1] }}
                className="card-elevated p-7 flex flex-col"
              >
                <h4
                  className="text-charcoal mb-3"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '1.15rem' }}
                >
                  {hotel.name}
                </h4>
                <p className="text-charcoal-muted mb-1.5" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 300 }}>
                  {hotel.address}
                </p>
                <p className="text-rose-dark mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.02em' }}>
                  {hotel.distance}
                </p>
                <p className="text-charcoal-muted italic mb-5 flex-1" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 300 }}>
                  {hotel.note}
                </p>
                {hotel.website !== '#' && (
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-rose-dark hover:text-charcoal transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    Visita sito <ExternalLink size={11} />
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
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(154, 173, 138, 0.12)' }}
            >
              <Car size={18} className="text-sage-dark" strokeWidth={1.5} />
            </div>
            <h3
              className="text-2xl md:text-3xl text-charcoal"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
            >
              Come Arrivare
            </h3>
          </div>

          <div className="card-elevated p-8 max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <MapPin size={16} className="text-sage-dark" strokeWidth={1.5} />
              <h4
                className="text-charcoal"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '1.05rem' }}
              >
                In Auto
              </h4>
            </div>
            <p className="text-charcoal-muted mb-6" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.825rem', lineHeight: 1.85 }}>
              Corte Maddalena si trova a Capoterra, facilmente raggiungibile dalla SS195.
              C'è un <strong style={{ fontWeight: 500 }}>ampio parcheggio</strong> all'ingresso della location.
            </p>
            <a
              href={content.wedding.location.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-rose-dark hover:text-charcoal transition-colors duration-300"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              Apri in Google Maps <ExternalLink size={11} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
