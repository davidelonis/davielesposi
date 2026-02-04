import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import content from '../data/content.json';
import { cloudinaryListUrl, cloudinaryImageUrl, TAGS, getContext } from '../config/cloudinary';

export default function OurStory() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [storyImages, setStoryImages] = useState([]);

  // Load story images from Cloudinary via Netlify Function
  useEffect(() => {
    fetch(cloudinaryListUrl(TAGS.STORY))
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (data.resources && data.resources.length > 0) {
          setStoryImages(data.resources.map((r) => {
            const meta = getContext(r);
            return {
              src: cloudinaryImageUrl(r.public_id),
              year: meta.year,
              title: meta.title,
              description: meta.description,
            };
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Use manifest story entries if available, otherwise fall back to content.json
  const moments = storyImages.length > 0
    ? storyImages.map((img) => ({
        year: img.year || '',
        title: img.title || '',
        description: img.description || '',
        image: img.src,
      }))
    : content.ourStory;

  return (
    <section
      id="storia"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--color-warm-white)' }}
    >
      {/* Decorative blob */}
      <div
        className="watercolor-blob watercolor-blob-sage"
        style={{ width: '700px', height: '700px', top: '-250px', right: '-250px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-rose"
        style={{ width: '500px', height: '500px', bottom: '-150px', left: '-200px', borderRadius: '50%' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-subtitle mb-5"
          >
            Come tutto è iniziato
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="section-title"
          >
            La Nostra Storia
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, transparent, var(--color-rose-light), var(--color-rose-light), transparent)' }}
          />

          {moments.map((moment, index) => (
            <TimelineItem
              key={index}
              moment={moment}
              index={index}
              isEven={index % 2 === 0}
              hasImage={!!moment.image && storyImages.length > 0}
            />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mt-28 md:mt-36"
        >
          <p
            className="text-xl md:text-2xl text-charcoal-light italic max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, lineHeight: 1.7 }}
          >
            {content.quotes[1]}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({ moment, index, isEven, hasImage }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const fallbackEmojis = ['💫', '🌅', '🏠', '💍'];

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center mb-24 md:mb-32 last:mb-0 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Year marker (center on desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-warm-white)', border: '1px solid var(--color-rose-light)', boxShadow: '0 4px 16px rgba(196, 166, 161, 0.12)' }}
        >
          <span
            className="text-rose-dark"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.05em' }}
          >
            {moment.year}
          </span>
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.8, 0.25, 1] }}
        className={`w-full md:w-5/12 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}
      >
        {/* Mobile year */}
        <div className="md:hidden mb-6 flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--color-warm-white)', border: '1px solid var(--color-rose-light)' }}
          >
            <span className="text-rose-dark" style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500 }}>
              {moment.year}
            </span>
          </div>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--color-rose-light), transparent)' }} />
        </div>

        <h3
          className="text-2xl md:text-3xl text-charcoal mb-5"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, lineHeight: 1.2 }}
        >
          {moment.title}
        </h3>
        <p
          className="text-charcoal-muted leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.875rem', lineHeight: 1.85 }}
        >
          {moment.description}
        </p>
      </motion.div>

      {/* Spacer for the center column */}
      <div className="hidden md:block w-2/12" />

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
        className={`w-full md:w-5/12 mt-8 md:mt-0 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}
      >
        <div
          className="relative aspect-[4/3] overflow-hidden group"
          style={{ background: 'var(--color-cream-dark)', borderRadius: '2px', boxShadow: '0 8px 32px rgba(46, 44, 42, 0.06)' }}
        >
          {hasImage ? (
            <img
              src={moment.image}
              alt={moment.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-charcoal-muted">
              <div className="text-center">
                <span className="text-4xl block mb-3">
                  {fallbackEmojis[index % fallbackEmojis.length]}
                </span>
                <span
                  className="text-charcoal-muted"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {moment.year}
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-700" />
        </div>
      </motion.div>
    </div>
  );
}
