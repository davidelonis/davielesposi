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
    <section id="storia" className="section-padding relative overflow-hidden">
      {/* Decorative blob */}
      <div
        className="watercolor-blob watercolor-blob-sage"
        style={{ width: '600px', height: '600px', top: '-200px', right: '-200px', borderRadius: '50%' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            Come tutto è iniziato
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title"
          >
            La Nostra Storia
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-rose-light -translate-x-1/2" />

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
          transition={{ duration: 1 }}
          className="text-center mt-20 md:mt-28"
        >
          <p
            className="text-xl md:text-2xl text-charcoal-light italic max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, lineHeight: 1.6 }}
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
      className={`relative flex flex-col md:flex-row items-center mb-16 md:mb-24 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Year marker (center on desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-cream border-2 border-rose flex items-center justify-center"
        >
          <span
            className="text-sm text-rose-dark font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {moment.year}
          </span>
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`w-full md:w-5/12 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}
      >
        {/* Mobile year */}
        <div className="md:hidden mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cream border-2 border-rose flex items-center justify-center">
            <span className="text-xs text-rose-dark font-medium" style={{ fontFamily: 'var(--font-body)' }}>
              {moment.year}
            </span>
          </div>
          <div className="flex-1 h-px bg-rose-light" />
        </div>

        <h3
          className="text-2xl md:text-3xl text-charcoal mb-3"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
        >
          {moment.title}
        </h3>
        <p
          className="text-sm md:text-base text-charcoal-light leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
        >
          {moment.description}
        </p>
      </motion.div>

      {/* Spacer for the center column */}
      <div className="hidden md:block w-2/12" />

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className={`w-full md:w-5/12 mt-6 md:mt-0 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}
      >
        <div className="relative aspect-[4/3] bg-cream-dark rounded-sm overflow-hidden group">
          {hasImage ? (
            <img
              src={moment.image}
              alt={moment.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-charcoal-light">
              <div className="text-center">
                <span className="text-4xl block mb-2">
                  {fallbackEmojis[index % fallbackEmojis.length]}
                </span>
                <span className="text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-body)' }}>
                  {moment.year}
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-rose/5 group-hover:bg-rose/10 transition-colors duration-500" />
        </div>
      </motion.div>
    </div>
  );
}
