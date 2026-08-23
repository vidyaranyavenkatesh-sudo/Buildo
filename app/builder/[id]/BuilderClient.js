'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function BuilderClient({ project }) {
  const supabase = createClient();

  const [html, setHtml] = useState(project.html_content || '');
  const [history, setHistory] = useState(project.prompt_history || []);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [savedAt, setSavedAt] = useState(null);

  async function handleGenerate(e) {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          currentHtml: html,
          history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      setHtml(data.html);
      setHistory((prev) => [...prev, { role: 'user', text: prompt.trim() }]);
      setPrompt('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError('');

    const { error } = await supabase
      .from('projects')
      .update({
        html_content: html,
        prompt_history: history,
        updated_at: new Date().toISOString(),
      })
      .eq('id', project.id);

    setSaving(false);

    if (error) {
      setError('Save failed: ' + error.message);
      return;
    }
    setSavedAt(new Date());
  }

  function handleDownload() {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="h-screen flex flex-col bg-blueprint-bg text-blueprint-paper">
      <header className="border-b border-blueprint-line/40 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 font-mono text-sm">
          <Link href="/dashboard" className="text-blueprint-muted hover:text-blueprint-paper">
            &larr; Index
          </Link>
          <span className="text-blueprint-line">/</span>
          <h1 className="uppercase tracking-tight">{project.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="font-mono text-[11px] text-blueprint-muted">
              Saved {savedAt.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={handleDownload}
            className="font-mono text-xs uppercase tracking-widest border border-blueprint-line/60 hover:border-blueprint-lineBright px-3 py-1.5"
          >
            Download
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="font-mono text-xs uppercase tracking-widest border-2 border-blueprint-marker text-blueprint-marker hover:bg-blueprint-marker hover:text-blueprint-bg disabled:opacity-50 transition-colors px-3 py-1.5"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <div className="w-96 border-r border-blueprint-line/40 flex flex-col shrink-0 bg-blueprint-panel/20">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 && (
              <p className="font-mono text-xs text-blueprint-muted leading-relaxed">
                Describe the website you want. Example: "landing page for a
                coffee shop, warm tones, hero section, menu, contact form"
              </p>
            )}
            {history.map((item, i) => (
              <div
                key={i}
                className="text-sm bg-blueprint-panel/60 border border-blueprint-line/40 px-3 py-2.5"
              >
                {item.text}
              </div>
            ))}
            {error && (
              <div className="font-mono text-xs text-blueprint-marker bg-blueprint-marker/10 border border-blueprint-marker/40 px-3 py-2.5">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleGenerate} className="p-4 border-t border-blueprint-line/40 space-y-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what to build or change…"
              rows={3}
              className="w-full bg-blueprint-bg/70 border border-blueprint-line/60 px-3 py-2 text-sm resize-none focus:outline-none focus:border-blueprint-lineBright"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full border-2 border-blueprint-marker text-blueprint-marker hover:bg-blueprint-marker hover:text-blueprint-bg disabled:opacity-50 transition-colors font-mono text-xs uppercase tracking-widest py-2.5"
            >
              {loading ? 'Generating…' : history.length === 0 ? 'Generate Site' : 'Send Update'}
            </button>
          </form>
        </div>

        <div className="flex-1 bg-white">
          <iframe
            title="Preview"
            srcDoc={html}
            sandbox="allow-scripts allow-forms allow-popups allow-modals"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </main>
  );
}
