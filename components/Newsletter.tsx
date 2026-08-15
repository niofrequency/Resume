import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaEnvelopeOpenText, FaCheck } from 'react-icons/fa';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        source: 'newsletter',
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Failed to save subscriber to Firestore:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="py-14 bg-slate-100 dark:bg-space-800/40 border-y border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-2xl mb-5">
            <FaEnvelopeOpenText />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Dapatkan Info & Tips Digital Terbaru
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Masukkan email Anda untuk update proyek, promo layanan, dan tips seputar sistem, aplikasi & AI.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@anda.com"
              className="flex-1 bg-white dark:bg-space-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-70 whitespace-nowrap
                ${status === 'success'
                  ? 'bg-green-500 text-white'
                  : status === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-gradient-to-r from-primary to-secondary text-space-900 hover:opacity-90'
                }`}
            >
              {status === 'success' ? (
                <span className="flex items-center gap-2"><FaCheck /> Terdaftar!</span>
              ) : status === 'sending' ? (
                'Mengirim...'
              ) : status === 'error' ? (
                'Gagal, coba lagi'
              ) : (
                'Daftar'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
