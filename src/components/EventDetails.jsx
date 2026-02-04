import { motion } from 'framer-motion';
import { MapPin, Clock, Shirt } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import content from '../data/content.json';

export default function EventDetails() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1 });

  return (
    <section id="evento" className="section-padding relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="watercolor-blob watercolor-blob-rose"
        style={{ width: '500px', height: '500px', top: '-100px', left: '-200px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-gold"
        style={{ width: '400px', height: '400px', bottom: '-100px', right: '-150px', borderRadius: '50%' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            Tutti i dettagli
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title"
          >
            Il Grande Giorno
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Location card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24"
        >
          {/* Location info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-rose-light/30 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-rose-dark" />
              </div>
              <div>
                <h3
                  className="text-2xl md:text-3xl text-charcoal mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
                >
                  {content.wedding.location.name}
                </h3>
                <p className="text-sm text-charcoal-light" style={{ fontFamily: 'var(--font-body)' }}>
                  {content.wedding.location.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-sage-light/30 flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-sage-dark" />
              </div>
              <div>
                <h4
                  className="text-lg text-charcoal mb-1"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
                >
                  6 Giugno 2026, ore 16:00
                </h4>
                <p className="text-sm text-charcoal-light" style={{ fontFamily: 'var(--font-body)' }}>
                  Arrivo ospiti dalle ore 16:00
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gold-light/30 flex items-center justify-center flex-shrink-0">
                <Shirt size={20} className="text-gold-dark" />
              </div>
              <div>
                <h4
                  className="text-lg text-charcoal mb-1"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
                >
                  Dress Code: {content.wedding.dressCode}
                </h4>
                <p className="text-sm text-charcoal-light" style={{ fontFamily: 'var(--font-body)' }}>
                  Vestiti eleganti per una serata speciale
                </p>
              </div>
            </div>

            <a
              href={content.wedding.location.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline self-start"
            >
              Apri in Google Maps
            </a>
          </div>

          {/* Map embed */}
          <div className="relative aspect-[4/3] md:aspect-auto rounded-sm overflow-hidden bg-cream-dark">
            <iframe
              src={content.wedding.location.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Corte Maddalena"
            />
          </div>
        </motion.div>

        {/* Day timeline */}
        <div ref={timelineRef}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl text-center text-charcoal mb-12"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
          >
            Programma della Giornata
          </motion.h3>

          <div className="max-w-2xl mx-auto">
            {content.timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-16 text-right">
                  <span
                    className="text-lg text-rose-dark"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
                  >
                    {item.time}
                  </span>
                </div>
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-rose" />
                  {index < content.timeline.length - 1 && (
                    <div className="w-px h-12 bg-rose-light mt-1" />
                  )}
                </div>
                <div className="pb-8">
                  <h4
                    className="text-base md:text-lg text-charcoal mb-1"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-sm text-charcoal-light"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
