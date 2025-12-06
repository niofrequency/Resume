import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the formatted WhatsApp message
    const text = `*Portfolio Inquiry*\n\n*Name:* ${formData.name}\n\n*Message:*\n${formData.message}`;
    
    // Sanitize phone number (remove spaces, +, etc.)
    const phoneNumber = PERSONAL_INFO.phone.replace(/[^0-9]/g, '');
    
    // Create WhatsApp URL
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp in a new tab
    window.open(url, '_blank');

    // Show success state and reset form
    setStatus('success');
    setFormData({ name: '', message: '' });
    
    // Reset button state after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-space-900/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-space-900/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Tell me about your project..." 
                />
              </div>
              
              <button 
                type="submit"
                className={`w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg
                  ${status === 'success' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90'
                  }
                `}
              >
                {status === 'success' ? (
                  <>
                    <FaCheck /> WhatsApp Opened!
                  </>
                ) : (
                  <>
                    <FaWhatsapp className="text-xl" /> Send via WhatsApp
                  </>
                )}
              </button>
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