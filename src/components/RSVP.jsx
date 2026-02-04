import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Check, AlertCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function RSVP() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError(null);

    try {
      // Simulate form submission - replace with actual endpoint
      // Options: Google Forms, Airtable, Formspree, custom API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('RSVP Data:', data);
      setSubmitted(true);
      reset();
    } catch {
      setError('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="section-padding relative"
      style={{ background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-rose-light) 50%, var(--color-cream) 100%)', opacity: 0.97 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, var(--color-rose) 1px, transparent 1px), radial-gradient(circle at 80% 50%, var(--color-sage) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            Vi aspettiamo
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title"
          >
            Conferma la tua Presenza
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="decorative-line"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-charcoal-light mt-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Per favore conferma entro il <strong>10 Maggio 2026</strong>
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-sage-light/50 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-sage-dark" />
              </div>
              <h3
                className="text-2xl md:text-3xl text-charcoal mb-4"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                Grazie!
              </h3>
              <p className="text-charcoal-light" style={{ fontFamily: 'var(--font-body)' }}>
                La tua conferma è stata ricevuta. Non vediamo l'ora di festeggiare con te!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline mt-8"
              >
                Invia un'altra conferma
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-warm-white/80 backdrop-blur-sm p-8 md:p-12 rounded-sm shadow-sm"
            >
              {/* Name */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-[0.15em] text-charcoal-light mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Nome e Cognome *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Il nome è obbligatorio' })}
                  className="w-full px-4 py-3 bg-cream border border-rose-light/50 text-charcoal text-sm placeholder-charcoal-light/40 focus:border-rose transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                  placeholder="Es: Mario Rossi"
                />
                {errors.name && (
                  <p className="text-xs text-rose-dark mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-[0.15em] text-charcoal-light mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: "L'email è obbligatoria",
                    pattern: { value: /^\S+@\S+$/i, message: 'Email non valida' },
                  })}
                  className="w-full px-4 py-3 bg-cream border border-rose-light/50 text-charcoal text-sm placeholder-charcoal-light/40 focus:border-rose transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                  placeholder="Es: mario@email.com"
                />
                {errors.email && (
                  <p className="text-xs text-rose-dark mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Attendance */}
              <div className="mb-6">
                <label
                  className="block text-xs uppercase tracking-[0.15em] text-charcoal-light mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Parteciperai? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('attendance', { required: 'Seleziona una risposta' })}
                      className="accent-rose-dark"
                    />
                    <span className="text-sm text-charcoal" style={{ fontFamily: 'var(--font-body)' }}>
                      Con gioia, ci sarò!
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('attendance', { required: 'Seleziona una risposta' })}
                      className="accent-rose-dark"
                    />
                    <span className="text-sm text-charcoal" style={{ fontFamily: 'var(--font-body)' }}>
                      Purtroppo no
                    </span>
                  </label>
                </div>
                {errors.attendance && (
                  <p className="text-xs text-rose-dark mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.attendance.message}
                  </p>
                )}
              </div>

              {/* Number of guests */}
              <div className="mb-6">
                <label
                  htmlFor="guests"
                  className="block text-xs uppercase tracking-[0.15em] text-charcoal-light mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Numero di ospiti (te incluso)
                </label>
                <select
                  id="guests"
                  {...register('guests')}
                  className="w-full px-4 py-3 bg-cream border border-rose-light/50 text-charcoal text-sm focus:border-rose transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Dietary restrictions */}
              <div className="mb-6">
                <label
                  htmlFor="dietary"
                  className="block text-xs uppercase tracking-[0.15em] text-charcoal-light mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Allergie o restrizioni alimentari
                </label>
                <input
                  id="dietary"
                  type="text"
                  {...register('dietary')}
                  className="w-full px-4 py-3 bg-cream border border-rose-light/50 text-charcoal text-sm placeholder-charcoal-light/40 focus:border-rose transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                  placeholder="Es: Vegetariano, intolleranza al glutine..."
                />
              </div>

              {/* Message */}
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-[0.15em] text-charcoal-light mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Messaggio per gli sposi (opzionale)
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 bg-cream border border-rose-light/50 text-charcoal text-sm placeholder-charcoal-light/40 focus:border-rose transition-colors resize-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                  placeholder="Un pensiero, un augurio, una barzelletta..."
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 bg-rose-light/30 text-rose-dark text-sm rounded-sm flex items-center gap-2">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-warm-white/30 border-t-warm-white rounded-full animate-spin" />
                    Invio in corso...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={16} />
                    Invia Conferma
                  </span>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
