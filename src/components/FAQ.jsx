import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import content from '../data/content.json';

export default function FAQ() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="section-padding relative"
      style={{ background: 'var(--color-warm-white)' }}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-subtitle mb-5"
          >
            Hai qualche dubbio?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="section-title"
          >
            Domande Frequenti
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {content.faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.8, 0.25, 1] }}
              style={{
                border: '1px solid rgba(196, 166, 161, 0.12)',
                borderRadius: '2px',
                overflow: 'hidden',
                background: openIndex === index ? 'var(--color-cream)' : 'var(--color-warm-white)',
                transition: 'background 0.4s ease',
              }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 md:p-7 text-left transition-colors duration-400 hover:bg-cream"
                aria-expanded={openIndex === index}
              >
                <span
                  className="text-charcoal pr-6"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.4 }}
                >
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={16} className="text-rose-dark" strokeWidth={1.5} />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-7 pb-6 md:pb-7">
                      <div className="w-8 h-px mb-4" style={{ background: 'var(--color-rose-light)' }} />
                      <p
                        className="text-charcoal-muted"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.825rem', lineHeight: 1.85 }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
