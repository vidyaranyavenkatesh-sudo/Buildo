'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import CornerMarks from '@/components/CornerMarks';

const BLANK_HTML = `<!DOCTYPE html>
<html>
<head><title>New Project</title></head>
<body>
<h1>Describe your site below to get started</h1>
</body>
</html>`;

export default function DashboardClient({ user, initialProjects }) {
  const router = useRouter();
  const supabase = createClient();

  const [projects, setProjects] = useState(initialProjects);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim() || busy) return;
    setBusy(true);

    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: newName.trim(),
        html_content: BLANK_HTML,
        prompt_history: [],
      })
      .select()
      .single();

    setBusy(false);

    if (error) {
      alert('Could not create project: ' + error.message);
      return;
    }

    router.push(`/builder/${data.id}`);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return;

    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      alert('Could not delete project: ' + error.message);
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-blueprint-bg bg-blueprint-grid bg-grid-24">
      <header className="border-b border-blueprint-line/40 bg-blueprint-bg/90">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-sm uppercase tracking-widest">Buildo</span>
          <div className="flex items-center gap-5">
            <span className="font-mono text-xs text-blueprint-muted hidden sm:inline">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="font-mono text-xs uppercase tracking-widest text-blueprint-muted hover:text-blueprint-paper border border-blueprint-line/60 px-3 py-1.5"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="bp-ruler" />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-blueprint-muted">
              Project Index
            </p>
            <h1 className="font-mono uppercase text-xl tracking-tight mt-1">Your Sites</h1>
          </div>
          <button
            onClick={() => setCreating((v) => !v)}
            className="border-2 border-blueprint-marker text-blueprint-marker hover:bg-blueprint-marker hover:text-blueprint-bg transition-colors font-mono text-xs uppercase tracking-widest px-4 py-2.5"
          >
            + New Project
          </button>
        </div>

        {creating && (
          <form
            onSubmit={handleCreate}
            className="relative border border-blueprint-line/50 bg-blueprint-panel/40 p-4 mb-8 flex gap-2"
          >
            <CornerMarks />
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Project name, e.g. Bakery Landing Page"
              className="flex-1 bg-blueprint-bg/70 border border-blueprint-line/60 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-lineBright"
            />
            <button
              type="submit"
              disabled={busy}
              className="border-2 border-blueprint-marker text-blueprint-marker hover:bg-blueprint-marker hover:text-blueprint-bg disabled:opacity-50 font-mono text-xs uppercase tracking-widest px-4"
            >
              {busy ? 'Creating…' : 'Create'}
            </button>
          </form>
        )}

        {projects.length === 0 ? (
          <p className="font-mono text-sm text-blueprint-muted border border-dashed border-blueprint-line/50 px-5 py-10 text-center">
            No projects yet. Start one above.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="relative border border-blueprint-line/50 bg-blueprint-panel/40 p-5 flex flex-col justify-between hover:border-blueprint-lineBright/70 transition-colors"
              >
                <CornerMarks />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-blueprint-muted mb-2">
                    Sheet {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-xs text-blueprint-muted mt-1">
                    Updated {new Date(project.updated_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-4 mt-5 font-mono text-xs uppercase tracking-widest">
                  <Link
                    href={`/builder/${project.id}`}
                    className="text-blueprint-lineBright hover:underline"
                  >
                    Open
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-blueprint-marker hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
