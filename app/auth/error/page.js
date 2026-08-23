import Link from 'next/link';
import CornerMarks from '@/components/CornerMarks';

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-blueprint-bg bg-blueprint-grid bg-grid-24 px-6">
      <div className="relative max-w-sm text-center border border-blueprint-line/50 bg-blueprint-panel/50 p-8">
        <CornerMarks />
        <p className="font-mono text-[11px] uppercase tracking-widest text-blueprint-marker mb-3">
          Error
        </p>
        <h1 className="font-mono uppercase text-lg tracking-tight mb-3">
          Link Expired Or Invalid
        </h1>
        <p className="text-blueprint-muted text-sm mb-6">
          That confirmation link didn't work — it may have expired or already
          been used. Try signing up again to get a fresh one.
        </p>
        <Link
          href="/login"
          className="font-mono text-xs uppercase tracking-widest text-blueprint-lineBright hover:underline"
        >
          &larr; Back to sign in
        </Link>
      </div>
    </main>
  );
}
