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
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--color-linen)' }}
    >
      {/* Decorative blobs */}
      <div
        className="watercolor-blob watercolor-blob-rose"
        style={{ width: '600px', height: '600px', top: '-200px', right: '-250px', borderRadius: '50%' }}
      />
      <div
        className="watercolor-blob watercolor-blob-sage"
        style={{ width: '500px', height: '500px', bottom: '-180px', left: '-200px', borderRadius: '50%' }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-5"
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
            className="text-charcoal-muted mt-8"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', fontWeight: 300 }}
          >
            Per favore conferma entro il <strong style={{ fontWeight: 500 }}>10 Maggio 2026</strong>
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ background: 'rgba(154, 173, 138, 0.15)' }}
              >
                <Check size={28} className="text-sage-dark" strokeWidth={1.5} />
              </div>
              <h3
                className="text-2xl md:text-3xl text-charcoal mb-5"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                Grazie!
              </h3>
              <p
                className="text-charcoal-muted mb-10"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300 }}
              >
                La tua conferma è stata ricevuta. Non vediamo l'ora di festeggiare con te!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline"
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
              className="p-8 md:p-12 lg:p-14"
              style={{
                background: 'var(--color-warm-white)',
                border: '1px solid rgba(196, 166, 161, 0.12)',
                borderRadius: '2px',
                boxShadow: '0 4px 32px rgba(46, 44, 42, 0.04)',
              }}
            >
              {/* Name */}
              <div className="mb-7">
                <label
                  htmlFor="name"
                  className="block mb-2.5"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
                >
                  Nome e Cognome *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Il nome è obbligatorio' })}
                  className="w-full px-5 py-3.5 text-sm text-charcoal"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'var(--color-cream)',
                    border: '1px solid rgba(196, 166, 161, 0.25)',
                    borderRadius: '2px',
                  }}
                  placeholder="Es: Mario Rossi"
                />
                {errors.name && (
                  <p className="flex items-center gap-1.5 mt-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-rose-dark)' }}>
                    <AlertCircle size={12} /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="block mb-2.5"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
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
                  className="w-full px-5 py-3.5 text-sm text-charcoal"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'var(--color-cream)',
                    border: '1px solid rgba(196, 166, 161, 0.25)',
                    borderRadius: '2px',
                  }}
                  placeholder="Es: mario@email.com"
                />
                {errors.email && (
                  <p className="flex items-center gap-1.5 mt-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-rose-dark)' }}>
                    <AlertCircle size={12} /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Attendance */}
              <div className="mb-7">
                <label
                  className="block mb-3"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
                >
                  Parteciperai? *
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('attendance', { required: 'Seleziona una risposta' })}
                      className="accent-rose-dark"
                    />
                    <span className="text-charcoal" style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', fontWeight: 300 }}>
                      Con gioia, ci sarò!
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('attendance', { required: 'Seleziona una risposta' })}
                      className="accent-rose-dark"
                    />
                    <span className="text-charcoal" style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', fontWeight: 300 }}>
                      Purtroppo no
                    </span>
                  </label>
                </div>
                {errors.attendance && (
                  <p className="flex items-center gap-1.5 mt-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-rose-dark)' }}>
                    <AlertCircle size={12} /> {errors.attendance.message}
                  </p>
                )}
              </div>

              {/* Number of guests */}
              <div className="mb-7">
                <label
                  htmlFor="guests"
                  className="block mb-2.5"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
                >
                  Numero di ospiti (te incluso)
                </label>
                <select
                  id="guests"
                  {...register('guests')}
                  className="w-full px-5 py-3.5 text-sm text-charcoal"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'var(--color-cream)',
                    border: '1px solid rgba(196, 166, 161, 0.25)',
                    borderRadius: '2px',
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Dietary restrictions */}
              <div className="mb-7">
                <label
                  htmlFor="dietary"
                  className="block mb-2.5"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
                >
                  Allergie o restrizioni alimentari
                </label>
                <input
                  id="dietary"
                  type="text"
                  {...register('dietary')}
                  className="w-full px-5 py-3.5 text-sm text-charcoal"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'var(--color-cream)',
                    border: '1px solid rgba(196, 166, 161, 0.25)',
                    borderRadius: '2px',
                  }}
                  placeholder="Es: Vegetariano, intolleranza al glutine..."
                />
              </div>

              {/* Message */}
              <div className="mb-10">
                <label
                  htmlFor="message"
                  className="block mb-2.5"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)' }}
                >
                  Messaggio per gli sposi (opzionale)
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className="w-full px-5 py-3.5 text-sm text-charcoal resize-none"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'var(--color-cream)',
                    border: '1px solid rgba(196, 166, 161, 0.25)',
                    borderRadius: '2px',
                  }}
                  placeholder="Un pensiero, un augurio, una barzelletta..."
                />
              </div>

              {/* Error message */}
              {error && (
                <div
                  className="mb-8 p-4 flex items-center gap-2.5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.825rem',
                    background: 'rgba(196, 166, 161, 0.12)',
                    color: 'var(--color-rose-dark)',
                    borderRadius: '2px',
                  }}
                >
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
                    <Send size={14} />
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
