import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquareHeart } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const initialMessages = [
  { id: 1, name: 'Mamma & Papà', message: 'Siamo così orgogliosi di voi. Auguri per una vita meravigliosa insieme!', date: '2026-01-15' },
  { id: 2, name: 'Marco & Giulia', message: 'Non vediamo l\'ora di festeggiare con voi! Sarà una giornata indimenticabile.', date: '2026-02-01' },
  { id: 3, name: 'Sara', message: 'Due anime bellissime che si uniscono. Vi voglio bene!', date: '2026-02-10' },
];

export default function GuestBook() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [messages, setMessages] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState({ name: '', message: '' });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMsg.name.trim() || !newMsg.message.trim()) return;

    const msg = {
      id: Date.now(),
      name: newMsg.name,
      message: newMsg.message,
      date: new Date().toISOString().split('T')[0],
    };

    setMessages([msg, ...messages]);
    setNewMsg({ name: '', message: '' });
    setShowForm(false);
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-warm-white) 0%, var(--color-cream) 100%)' }}
    >
      <div
        className="watercolor-blob watercolor-blob-rose"
        style={{ width: '400px', height: '400px', top: '-100px', right: '-150px', borderRadius: '50%' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-subtitle mb-5"
          >
            I vostri auguri
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="section-title"
          >
            Guest Book
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Add message button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-outline inline-flex items-center gap-2"
          >
            <MessageSquareHeart size={14} />
            {showForm ? 'Chiudi' : 'Lascia un messaggio'}
          </button>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
              onSubmit={handleSubmit}
              className="overflow-hidden mb-12"
            >
              <div
                className="p-7 md:p-8"
                style={{
                  background: 'var(--color-warm-white)',
                  border: '1px solid rgba(196, 166, 161, 0.12)',
                  borderRadius: '2px',
                  boxShadow: '0 2px 20px rgba(46, 44, 42, 0.03)',
                }}
              >
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Il tuo nome"
                    value={newMsg.name}
                    onChange={(e) => setNewMsg({ ...newMsg, name: e.target.value })}
                    className="w-full px-5 py-3.5 text-sm text-charcoal"
                    style={{
                      fontFamily: 'var(--font-body)',
                      background: 'var(--color-cream)',
                      border: '1px solid rgba(196, 166, 161, 0.25)',
                      borderRadius: '2px',
                    }}
                    required
                  />
                </div>
                <div className="mb-5">
                  <textarea
                    placeholder="Il tuo messaggio per gli sposi..."
                    rows={3}
                    value={newMsg.message}
                    onChange={(e) => setNewMsg({ ...newMsg, message: e.target.value })}
                    className="w-full px-5 py-3.5 text-sm text-charcoal resize-none"
                    style={{
                      fontFamily: 'var(--font-body)',
                      background: 'var(--color-cream)',
                      border: '1px solid rgba(196, 166, 161, 0.25)',
                      borderRadius: '2px',
                    }}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Invia Augurio
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="space-y-5">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.8, 0.25, 1] }}
              className="p-6"
              style={{
                background: 'var(--color-warm-white)',
                border: '1px solid rgba(196, 166, 161, 0.1)',
                borderRadius: '2px',
                boxShadow: '0 2px 12px rgba(46, 44, 42, 0.02)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(196, 166, 161, 0.1)' }}
                >
                  <Heart size={13} className="text-rose-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span
                      className="text-charcoal"
                      style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '1rem' }}
                    >
                      {msg.name}
                    </span>
                    <span className="text-charcoal-muted" style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                      {msg.date}
                    </span>
                  </div>
                  <p
                    className="text-charcoal-muted"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.825rem', lineHeight: 1.85 }}
                  >
                    {msg.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
