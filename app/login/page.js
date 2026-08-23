'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import CornerMarks from '@/components/CornerMarks';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      router.push('/dashboard');
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setMessage('Check your email to confirm your account, then sign in.');
    setMode('signin');
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-blueprint-bg bg-blueprint-grid bg-grid-24 px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-[11px] uppercase tracking-widest text-blueprint-muted mb-6 text-center">
          Buildo &mdash; Access Form
        </p>

        <div className="relative border border-blueprint-line/50 bg-blueprint-panel/50 p-8">
          <CornerMarks />

          <h1 className="font-mono uppercase tracking-tight text-xl mb-1">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="text-blueprint-muted text-sm mb-7">
            {mode === 'signin'
              ? 'Enter your credentials to access your projects.'
              : 'Register to start building.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-blueprint-lineBright mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-blueprint-bg/70 border border-blueprint-line/60 px-4 py-2.5 text-sm focus:outline-none focus:border-blueprint-lineBright"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-blueprint-lineBright mb-2">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-blueprint-bg/70 border border-blueprint-line/60 px-4 py-2.5 text-sm focus:outline-none focus:border-blueprint-lineBright"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="font-mono text-xs text-blueprint-marker border border-blueprint-marker/40 bg-blueprint-marker/10 px-3 py-2">
                {error}
              </p>
            )}
            {message && (
              <p className="font-mono text-xs text-blueprint-lineBright border border-blueprint-lineBright/40 bg-blueprint-lineBright/10 px-3 py-2">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-blueprint-marker text-blueprint-marker hover:bg-blueprint-marker hover:text-blueprint-bg disabled:opacity-50 transition-colors font-mono text-sm uppercase tracking-widest py-2.5"
            >
              {loading ? 'Please Wait…' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-blueprint-muted mt-6">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError('');
                setMessage('');
              }}
              className="text-blueprint-lineBright hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
