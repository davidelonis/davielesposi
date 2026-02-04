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
    <section className="section-padding relative" style={{ background: 'linear-gradient(180deg, var(--color-warm-white) 0%, var(--color-cream) 100%)' }}>
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            I vostri auguri
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title"
          >
            Guest Book
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="decorative-line"
          />
        </div>

        {/* Add message button */}
        <div className="text-center mb-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-outline inline-flex items-center gap-2"
          >
            <MessageSquareHeart size={16} />
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
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="overflow-hidden mb-10"
            >
              <div className="bg-warm-white p-6 rounded-sm border border-rose-light/20">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Il tuo nome"
                    value={newMsg.name}
                    onChange={(e) => setNewMsg({ ...newMsg, name: e.target.value })}
                    className="w-full px-4 py-3 bg-cream border border-rose-light/50 text-charcoal text-sm focus:border-rose transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Il tuo messaggio per gli sposi..."
                    rows={3}
                    value={newMsg.message}
                    onChange={(e) => setNewMsg({ ...newMsg, message: e.target.value })}
                    className="w-full px-4 py-3 bg-cream border border-rose-light/50 text-charcoal text-sm focus:border-rose transition-colors resize-none"
                    style={{ fontFamily: 'var(--font-body)' }}
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
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="p-5 bg-warm-white rounded-sm border border-rose-light/15"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-light/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart size={14} className="text-rose-dark" />
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className="text-sm text-charcoal"
                      style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
                    >
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-charcoal-light" style={{ fontFamily: 'var(--font-body)' }}>
                      {msg.date}
                    </span>
                  </div>
                  <p
                    className="text-sm text-charcoal-light leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
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
