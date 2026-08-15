import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaUser } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      // 1. Save the lead to Firestore so it's never lost, even if the
      //    visitor doesn't have WhatsApp or closes the tab.
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        message,
        source: 'contact_form',
        createdAt: serverTimestamp(),
      });

      // 2. Also open WhatsApp pre-filled, for an instant chat if they want it.
      const text = `*Portfolio Inquiry*\n\n*Nama:* ${name}\n*Email:* ${email}\n\n*Pesan:*\n${message}`;
      const phoneNumber = PERSONAL_INFO.phone.replace(/[^0-9]/g, '');
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Failed to save message to Firestore:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-space-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden relative">
          
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Let's Work Together</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                Have a project in mind or need a consultant for your next big idea? I'm currently {PERSONAL_INFO.availability.toLowerCase()}.
              </p>

              <div className="space-y-6">
                <a 
                  href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-green-500 dark:text-green-400 text-xl group-hover:bg-green-100 dark:group-hover:bg-green-400/20 transition-colors">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider">WhatsApp</span>
                    <span className="font-mono text-lg">{PERSONAL_INFO.phone}</span>
                  </div>
                </a>

                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-primary text-xl group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider">Email</span>
                    <span className="font-mono text-lg">{PERSONAL_INFO.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-secondary text-xl">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider">Location</span>
                    <span className="font-mono text-lg">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Nama</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-space-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-space-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="email@anda.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Message</label>
                <textarea 
                  rows={5} 
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-white dark:bg-space-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none" 
                  placeholder="Tell me about your project or inquiry..." 
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg transform active:scale-[0.98] disabled:opacity-70
                  ${status === 'success' 
                    ? 'bg-green-500 text-white' 
                    : status === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 hover:shadow-green-500/20'
                  }
                `}
              >
                {status === 'success' ? (
                  <>
                    <FaCheck /> Pesan Terkirim!
                  </>
                ) : status === 'sending' ? (
                  <>Mengirim...</>
                ) : status === 'error' ? (
                  <>Gagal, coba lagi</>
                ) : (
                  <>
                    <FaWhatsapp className="text-xl" /> Send via WhatsApp
                  </>
                )}
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                Pesan Anda juga tersimpan otomatis, jadi tetap sampai walau WhatsApp tidak terbuka.
              </p>
            </form>
          </div>

          {/* Decor */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
