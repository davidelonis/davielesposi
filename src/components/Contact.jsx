import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Send, Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import content from '../data/content.json';

export default function Contact() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Contact form:', formData);
    setSent(true);
    setFormData({ name: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      id="contatti"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--color-linen)' }}
    >
      <div
        className="watercolor-blob watercolor-blob-sage"
        style={{ width: '400px', height: '400px', top: '-100px', left: '-100px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-gold"
        style={{ width: '350px', height: '350px', bottom: '-100px', right: '-100px', borderRadius: '50%' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-subtitle mb-5"
          >
            Restiamo in contatto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="section-title"
          >
            Contattaci
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-14 md:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <p
              className="text-charcoal-muted mb-10 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.875rem', lineHeight: 1.85 }}
            >
              Per qualsiasi domanda, curiosità o semplicemente per dirci quanto siete emozionati, non esitate a contattarci!
            </p>

            <div className="space-y-7">
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-5 group"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{ background: 'rgba(196, 166, 161, 0.1)' }}
                >
                  <Mail size={17} className="text-rose-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}>
                    Email
                  </p>
                  <p className="text-charcoal" style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem' }}>
                    {content.contact.email}
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${content.contact.whatsappBride.replace(/\s/g, '').replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 group"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{ background: 'rgba(154, 173, 138, 0.1)' }}
                >
                  <MessageCircle size={17} className="text-sage-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}>
                    WhatsApp Ele
                  </p>
                  <p className="text-charcoal" style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem' }}>
                    {content.contact.whatsappBride}
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${content.contact.whatsappGroom.replace(/\s/g, '').replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 group"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{ background: 'rgba(154, 173, 138, 0.1)' }}
                >
                  <MessageCircle size={17} className="text-sage-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}>
                    WhatsApp Davi
                  </p>
                  <p className="text-charcoal" style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem' }}>
                    {content.contact.whatsappGroom}
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-7 md:p-9"
              style={{
                background: 'var(--color-warm-white)',
                border: '1px solid rgba(196, 166, 161, 0.12)',
                borderRadius: '2px',
                boxShadow: '0 2px 20px rgba(46, 44, 42, 0.03)',
              }}
            >
              <div className="mb-6">
                <label
                  htmlFor="contact-name"
                  className="block mb-2.5"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
                >
                  Il tuo nome
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 text-sm text-charcoal"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'var(--color-cream)',
                    border: '1px solid rgba(196, 166, 161, 0.25)',
                    borderRadius: '2px',
                  }}
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="contact-message"
                  className="block mb-2.5"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
                >
                  Messaggio
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-3.5 text-sm text-charcoal resize-none"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'var(--color-cream)',
                    border: '1px solid rgba(196, 166, 161, 0.25)',
                    borderRadius: '2px',
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {sent ? (
                  <>
                    <Check size={14} /> Inviato!
                  </>
                ) : (
                  <>
                    <Send size={14} /> Invia Messaggio
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
