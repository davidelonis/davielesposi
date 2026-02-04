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
        style={{ width: '500px', height: '500px', top: '-120px', left: '-200px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-gold"
        style={{ width: '400px', height: '400px', bottom: '-120px', right: '-150px', borderRadius: '50%' }}
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
            Tutti i dettagli
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="section-title"
          >
            Il Grande Giorno
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Location card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-10 md:gap-16 mb-20 md:mb-28"
        >
          {/* Location info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-5 mb-8">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(196, 166, 161, 0.12)' }}
              >
                <MapPin size={18} className="text-rose-dark" strokeWidth={1.5} />
              </div>
              <div>
                <h3
                  className="text-2xl md:text-3xl text-charcoal mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
                >
                  {content.wedding.location.name}
                </h3>
                <p className="text-charcoal-muted" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
                  {content.wedding.location.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 mb-8">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(154, 173, 138, 0.12)' }}
              >
                <Clock size={18} className="text-sage-dark" strokeWidth={1.5} />
              </div>
              <div>
                <h4
                  className="text-lg text-charcoal mb-1"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.15rem' }}
                >
                  6 Giugno 2026, ore 16:00
                </h4>
                <p className="text-charcoal-muted" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
                  Arrivo ospiti dalle ore 16:00
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 mb-10">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(191, 162, 110, 0.12)' }}
              >
                <Shirt size={18} className="text-gold-dark" strokeWidth={1.5} />
              </div>
              <div>
                <h4
                  className="text-lg text-charcoal mb-1"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.15rem' }}
                >
                  Dress Code: {content.wedding.dressCode}
                </h4>
                <p className="text-charcoal-muted" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
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
          <div
            className="relative aspect-[4/3] md:aspect-auto overflow-hidden"
            style={{ background: 'var(--color-cream-dark)', borderRadius: '2px', boxShadow: '0 4px 24px rgba(46, 44, 42, 0.06)', minHeight: '320px' }}
          >
            <iframe
              src={content.wedding.location.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
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
            transition={{ duration: 0.8 }}
            className="text-center text-charcoal mb-14 md:mb-16"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Programma della Giornata
          </motion.h3>

          <div className="max-w-2xl mx-auto">
            {content.timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.8, 0.25, 1] }}
                className="flex items-start gap-7 mb-10 last:mb-0"
              >
                <div className="flex-shrink-0 w-16 text-right pt-0.5">
                  <span
                    className="text-rose-dark"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '1.1rem' }}
                  >
                    {item.time}
                  </span>
                </div>
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: 'var(--color-rose)', boxShadow: '0 0 0 4px rgba(196, 166, 161, 0.15)' }}
                  />
                  {index < content.timeline.length - 1 && (
                    <div className="w-px h-14 mt-1" style={{ background: 'linear-gradient(180deg, var(--color-rose-light), transparent)' }} />
                  )}
                </div>
                <div className="pb-10">
                  <h4
                    className="text-charcoal mb-1.5"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '1.1rem' }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-charcoal-muted"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.825rem' }}
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
