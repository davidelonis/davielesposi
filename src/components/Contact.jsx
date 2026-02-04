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
    <section id="contatti" className="section-padding relative overflow-hidden">
      <div
        className="watercolor-blob watercolor-blob-sage"
        style={{ width: '400px', height: '400px', top: '-100px', left: '-100px', borderRadius: '50%' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            Restiamo in contatto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title"
          >
            Contattaci
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-base text-charcoal-light mb-8 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Per qualsiasi domanda, curiosità o semplicemente per dirci quanto siete emozionati, non esitate a contattarci!
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-rose-light/30 flex items-center justify-center group-hover:bg-rose-light/50 transition-colors">
                  <Mail size={18} className="text-rose-dark" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-charcoal-light" style={{ fontFamily: 'var(--font-body)' }}>Email</p>
                  <p className="text-sm text-charcoal" style={{ fontFamily: 'var(--font-body)' }}>{content.contact.email}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${content.contact.whatsappBride.replace(/\s/g, '').replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-sage-light/30 flex items-center justify-center group-hover:bg-sage-light/50 transition-colors">
                  <MessageCircle size={18} className="text-sage-dark" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-charcoal-light" style={{ fontFamily: 'var(--font-body)' }}>WhatsApp Ele</p>
                  <p className="text-sm text-charcoal" style={{ fontFamily: 'var(--font-body)' }}>{content.contact.whatsappBride}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${content.contact.whatsappGroom.replace(/\s/g, '').replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-sage-light/30 flex items-center justify-center group-hover:bg-sage-light/50 transition-colors">
                  <MessageCircle size={18} className="text-sage-dark" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-charcoal-light" style={{ fontFamily: 'var(--font-body)' }}>WhatsApp Davi</p>
                  <p className="text-sm text-charcoal" style={{ fontFamily: 'var(--font-body)' }}>{content.contact.whatsappGroom}</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="bg-warm-white p-6 md:p-8 rounded-sm border border-rose-light/20">
              <div className="mb-5">
                <label
                  htmlFor="contact-name"
                  className="block text-xs uppercase tracking-[0.15em] text-charcoal-light mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Il tuo nome
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-cream border border-rose-light/50 text-charcoal text-sm focus:border-rose transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="contact-message"
                  className="block text-xs uppercase tracking-[0.15em] text-charcoal-light mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Messaggio
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-cream border border-rose-light/50 text-charcoal text-sm focus:border-rose transition-colors resize-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                {sent ? (
                  <>
                    <Check size={16} /> Inviato!
                  </>
                ) : (
                  <>
                    <Send size={16} /> Invia Messaggio
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
