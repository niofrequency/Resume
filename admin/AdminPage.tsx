import React, { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { FaWhatsapp, FaEnvelope, FaSignOutAlt, FaLock, FaGoogle } from 'react-icons/fa';

// Only this email is allowed to see anything past the login form.
// The Firestore rules enforce this too (server-side) — this client-side
// check just rejects any other Google account immediately after sign-in.
const ADMIN_EMAIL = 'mpigome44@gmail.com';

interface MessageDoc {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Timestamp;
}

interface SubscriberDoc {
  id: string;
  email: string;
  createdAt?: Timestamp;
}

const formatDate = (ts?: Timestamp) => {
  if (!ts) return '—';
  return ts.toDate().toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const LoginForm: React.FC<{ onError: (msg: string) => void; error: string }> = ({ onError, error }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    onError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        // Not the owner's account — kick them out right away.
        await signOut(auth);
        onError('Akun Google ini tidak diizinkan mengakses halaman ini.');
      }
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        onError('Login gagal. Coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-900 px-6">
      <div className="w-full max-w-sm glass-card rounded-3xl p-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-2xl mb-5 mx-auto">
          <FaLock />
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-1">Admin Login</h1>
        <p className="text-slate-400 text-sm text-center mb-6">Khusus untuk pemilik situs.</p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold bg-white text-slate-800 hover:bg-slate-100 transition-all disabled:opacity-60 flex items-center justify-center gap-3"
        >
          <FaGoogle className="text-lg" />
          {loading ? 'Membuka Google...' : 'Masuk dengan Google'}
        </button>
        {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [tab, setTab] = useState<'messages' | 'subscribers'>('messages');
  const [messages, setMessages] = useState<MessageDoc[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q1 = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsub1 = onSnapshot(q1, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
      setLoading(false);
    });

    const q2 = query(collection(db, 'subscribers'), orderBy('createdAt', 'desc'));
    const unsub2 = onSnapshot(q2, (snap) => {
      setSubscribers(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  return (
    <div className="min-h-screen bg-space-900 text-slate-200">
      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Masuk sebagai {user.email}</p>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-colors text-sm"
          >
            <FaSignOutAlt /> Keluar
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('messages')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              tab === 'messages' ? 'bg-primary text-space-900' : 'bg-white/5 text-slate-300'
            }`}
          >
            Pesan ({messages.length})
          </button>
          <button
            onClick={() => setTab('subscribers')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              tab === 'subscribers' ? 'bg-primary text-space-900' : 'bg-white/5 text-slate-300'
            }`}
          >
            Subscriber ({subscribers.length})
          </button>
        </div>

        {loading ? (
          <p className="text-slate-500">Memuat data...</p>
        ) : tab === 'messages' ? (
          <div className="space-y-4">
            {messages.length === 0 && <p className="text-slate-500">Belum ada pesan masuk.</p>}
            {messages.map((m) => (
              <div key={m.id} className="glass-card rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-bold text-white">{m.name || '(tanpa nama)'}</p>
                    <p className="text-sm text-primary">{m.email}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{formatDate(m.createdAt)}</span>
                </div>
                <p className="text-slate-300 text-sm whitespace-pre-wrap mb-3">{m.message}</p>
                <div className="flex gap-3">
                  <a
                    href={`mailto:${m.email}`}
                    className="flex items-center gap-2 text-xs text-slate-400 hover:text-primary transition-colors"
                  >
                    <FaEnvelope /> Balas Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden">
            {subscribers.length === 0 ? (
              <p className="text-slate-500 p-5">Belum ada subscriber.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-white/10">
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Tanggal Daftar</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id} className="border-b border-white/5 last:border-0">
                      <td className="p-4 text-white">{s.email}</td>
                      <td className="p-4 text-slate-400">{formatDate(s.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Keep this page out of Google/search results.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-900">
        <p className="text-slate-500">Memuat...</p>
      </div>
    );
  }

  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return <LoginForm onError={setError} error={error} />;
  }

  return <Dashboard user={user} />;
};

export default AdminPage;
