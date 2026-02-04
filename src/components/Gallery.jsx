import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { cloudinaryListUrl, cloudinaryImageUrl, TAGS, getContext } from '../config/cloudinary';

const categories = [
  { key: 'all', label: 'Tutti' },
  { key: 'together', label: 'Insieme' },
  { key: 'travel', label: 'Viaggi' },
  { key: 'engagement', label: 'Fidanzamento' },
];

export default function Gallery() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [photos, setPhotos] = useState([]);

  // Load from Cloudinary via Netlify Function
  useEffect(() => {
    fetch(cloudinaryListUrl(TAGS.GALLERY))
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (data.resources && data.resources.length > 0) {
          const ctx = data.resources.map((r) => {
            const meta = getContext(r);
            return {
              id: r.public_id,
              src: cloudinaryImageUrl(r.public_id),
              alt: meta.alt,
              category: meta.category,
            };
          });
          setPhotos(ctx);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  // Don't render section if no photos yet
  if (photos.length === 0) {
    return null;
  }

  return (
    <section
      id="galleria"
      className="section-padding relative"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-subtitle mb-5"
          >
            I nostri momenti
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="section-title"
          >
            Galleria
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Category filters */}
        <div className="flex justify-center gap-3 md:gap-4 mb-14 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="transition-all duration-400"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: activeCategory === cat.key ? 500 : 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '0.65rem 1.6rem',
                background: activeCategory === cat.key ? 'var(--color-charcoal)' : 'transparent',
                color: activeCategory === cat.key ? 'var(--color-warm-white)' : 'var(--color-charcoal-muted)',
                border: activeCategory === cat.key ? '1px solid var(--color-charcoal)' : '1px solid rgba(196, 166, 161, 0.3)',
                cursor: 'pointer',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.04, ease: [0.25, 0.8, 0.25, 1] }}
                className={`relative cursor-pointer group overflow-hidden ${
                  index % 5 === 0 ? 'row-span-2' : ''
                }`}
                style={{ borderRadius: '2px' }}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={`w-full ${index % 5 === 0 ? 'aspect-[3/4]' : 'aspect-square'} object-cover transition-transform duration-1000 group-hover:scale-105`}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-all duration-600 flex items-end justify-center pb-6">
                  <span
                    className="text-warm-white opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    Visualizza
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-300 z-10"
              aria-label="Chiudi"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-10 text-white/60 hover:text-white transition-colors duration-300 z-10"
              aria-label="Foto precedente"
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-10 text-white/60 hover:text-white transition-colors duration-300 z-10"
              aria-label="Foto successiva"
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>

            <motion.img
              key={lightboxIndex}
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              style={{ borderRadius: '2px' }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Photo counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span
                className="text-white/40"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.15em' }}
              >
                {lightboxIndex + 1} / {filtered.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
