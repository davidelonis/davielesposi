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
      style={{ background: 'var(--color-warm-white)' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            I nostri momenti
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title"
          >
            Galleria
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Category filters */}
        <div className="flex justify-center gap-3 md:gap-6 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-xs uppercase tracking-[0.15em] px-4 py-2 transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'text-warm-white bg-rose-dark'
                  : 'text-charcoal-light hover:text-rose-dark border border-rose-light'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative cursor-pointer group overflow-hidden ${
                  index % 5 === 0 ? 'row-span-2' : ''
                }`}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={`w-full ${index % 5 === 0 ? 'aspect-[3/4]' : 'aspect-square'} object-cover transition-transform duration-700 group-hover:scale-105`}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500 flex items-center justify-center">
                  <span className="text-warm-white opacity-0 group-hover:opacity-100 text-xs uppercase tracking-wider transition-opacity duration-300">
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
              className="absolute top-6 right-6 text-white/80 hover:text-white z-10"
              aria-label="Chiudi"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white z-10"
              aria-label="Foto precedente"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white z-10"
              aria-label="Foto successiva"
            >
              <ChevronRight size={36} />
            </button>

            <motion.img
              key={lightboxIndex}
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
