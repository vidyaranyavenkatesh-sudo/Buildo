'use client';

import { useState } from 'react';
import Link from 'next/link';

const STEPS = [
  {
    num: '01',
    title: 'Describe your site',
    body: 'Type what you want in plain language — a coffee shop landing page, a portfolio, a coaching site. Be as specific or as loose as you like.',
  },
  {
    num: '02',
    title: 'Buildo generates it',
    body: "Buildo's AI drafts a complete, self-contained HTML page and previews it live in the browser.",
  },
  {
    num: '03',
    title: 'Save, revise, download',
    body: 'Iterate with follow-up prompts, save to your account, or download the finished HTML to host anywhere.',
  },
];

const FEATURES = [
  {
    title: 'Live preview',
    body: 'See your generated site render instantly in a sandboxed preview before you save or download anything.',
  },
  {
    title: 'Iterative revisions',
    body: 'Keep prompting to refine layout, copy, and style — Buildo sends your current page back to the AI for context.',
  },
  {
    title: 'Your projects, saved',
    body: 'Every project and its prompt history is stored to your account, so you can pick up where you left off.',
  },
  {
    title: 'Own the output',
    body: 'Download a standalone HTML file at any time — no lock-in, host it anywhere you want.',
  },
];

const FAQS = [
  { q: 'Do I need to pay for Buildo?', a: 'No. Buildo itself is free to use, with no subscription required.' },
  { q: 'Can I edit the generated site?', a: 'Yes. Send follow-up prompts to refine it, or download the HTML and edit it directly in any code editor.' },
  { q: 'Can I host the result elsewhere?', a: 'Yes. Download exports a standalone HTML file you can host on any web server or static host.' },
  { q: 'How many projects can I create?', a: 'As many as you like. Every project is saved to your account so you can pick up where you left off.' },
  { q: 'Do I need any design or coding experience?', a: 'No. Just describe what you want in plain language and Buildo drafts the page for you.' },
];

const s = {
  // shared resets
  body: { margin: 0, fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif", color: '#1f1f1f', background: '#ffffff' },
  raj: { fontFamily: "'Rajdhani', 'Segoe UI', Arial, sans-serif" },
};

export default function LandingClient() {
  const [openFaq, setOpenFaq] = useState(-1);

  function toggleFaq(i) {
    setOpenFaq((prev) => (prev === i ? -1 : i));
  }

  return (
    <div style={{ ...s.body, boxSizing: 'border-box' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        a { text-decoration: none; }
        a:hover { opacity: 0.85; }
      `}</style>

      {/* NAV */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid #dddddd',
        position: 'sticky', top: 0,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', zIndex: 10,
      }}>
        <div style={{ ...s.raj, fontWeight: 700, fontSize: 24, color: '#075e54', letterSpacing: '-0.5px' }}>
          Buildo
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#how" style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>How it works</a>
          <a href="#features" style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>Features</a>
          <a href="#pricing" style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>Pricing</a>
          <a href="#faq" style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>FAQ</a>
          <Link href="/login" style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '10px 20px', borderRadius: 5,
            background: '#075e54', color: '#ffffff', fontSize: 14, fontWeight: 600,
          }}>
            Begin Build
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 48px 72px', textAlign: 'center' }}>
        <p style={{ ...s.raj, fontWeight: 600, fontSize: 13, color: '#128C7E', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 20px' }}>
          Prompt → Structure → Site
        </p>
        <h1 style={{ ...s.raj, fontWeight: 700, fontSize: 56, lineHeight: 1.08, color: '#075e54', margin: '0 auto', maxWidth: 780, letterSpacing: '-0.5px' }}>
          Describe your site. Buildo builds it.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: '#666', maxWidth: 560, margin: '24px auto 0' }}>
          Type what you want. Buildo's AI drafts a working site in seconds. Preview it live, save it to your account, and download it whenever you're ready.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 36 }}>
          <Link href="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 5,
            background: '#075e54', color: '#ffffff', fontSize: 16, fontWeight: 600,
          }}>
            Begin Build <span aria-hidden="true">→</span>
          </Link>
          <a href="#demo" style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '14px 28px', borderRadius: 5,
            background: 'transparent', color: '#075e54', fontSize: 16, fontWeight: 600,
            border: '1px solid #dddddd',
          }}>
            See how it works
          </a>
        </div>
      </section>

      {/* LIVE DEMO MOCK */}
      <section id="demo" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 96px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.10)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#ededed', borderBottom: '1px solid #ddd' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ddd', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ddd', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ddd', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: '#999', marginLeft: 12 }}>buildo.app/builder</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 380 }}>
            <div style={{ padding: 24, borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: 16, background: '#f9f9f9' }}>
              <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#999', margin: 0 }}>Your prompt</p>
              <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 14, fontSize: 14, color: '#1f1f1f', lineHeight: 1.6 }}>
                Landing page for a coffee shop, warm tones, menu, contact form
                <span style={{ color: '#075e54' }}>_</span>
              </div>
              <span style={{
                display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 6,
                padding: '10px 18px', borderRadius: 5, background: '#075e54',
                color: '#fff', fontSize: 13, fontWeight: 600,
              }}>Generate</span>
            </div>
            <div style={{ padding: 24, background: '#e5ddd5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 380, background: '#fff', borderRadius: 10, boxShadow: '0 1px 2px rgba(0,0,0,0.10)', padding: 20 }}>
                <div style={{ height: 14, width: '60%', background: '#dcf8c6', borderRadius: 4, marginBottom: 14 }} />
                <div style={{ height: 40, width: '100%', background: '#f0f2f5', borderRadius: 6, marginBottom: 12 }} />
                <div style={{ height: 8, width: '100%', background: '#f0f0f0', borderRadius: 4, marginBottom: 6 }} />
                <div style={{ height: 8, width: '85%', background: '#f0f0f0', borderRadius: 4, marginBottom: 6 }} />
                <div style={{ height: 8, width: '70%', background: '#f0f0f0', borderRadius: 4 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ background: '#f0f2f5', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ ...s.raj, fontWeight: 600, fontSize: 13, color: '#128C7E', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 12px', textAlign: 'center' }}>
            How it works
          </p>
          <h2 style={{ ...s.raj, fontWeight: 700, fontSize: 32, color: '#075e54', textAlign: 'center', margin: '0 0 56px' }}>
            Three steps from idea to live site
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {STEPS.map((step) => (
              <div key={step.num} style={{ background: '#fff', borderRadius: 10, padding: '32px 28px', boxShadow: '0 1px 2px rgba(0,0,0,0.10)' }}>
                <div style={{ ...s.raj, fontWeight: 700, fontSize: 42, color: '#dcf8c6', WebkitTextStroke: '1.5px #128C7E', marginBottom: 8 }}>
                  {step.num}
                </div>
                <h3 style={{ ...s.raj, fontWeight: 600, fontSize: 20, color: '#075e54', margin: '0 0 10px' }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 48px' }}>
        <p style={{ ...s.raj, fontWeight: 600, fontSize: 13, color: '#128C7E', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 12px', textAlign: 'center' }}>
          Features
        </p>
        <h2 style={{ ...s.raj, fontWeight: 700, fontSize: 32, color: '#075e54', textAlign: 'center', margin: '0 0 56px' }}>
          Everything you need to ship a page
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ border: '1px solid #ddd', borderRadius: 10, padding: 28 }}>
              <h3 style={{ ...s.raj, fontWeight: 600, fontSize: 18, color: '#075e54', margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, margin: 0 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BYOK EXPLAINER */}
      <section style={{ background: '#ededed', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <p style={{ ...s.raj, fontWeight: 600, fontSize: 13, color: '#128C7E', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 12px' }}>
              Bring your own key
            </p>
            <h2 style={{ ...s.raj, fontWeight: 700, fontSize: 32, color: '#075e54', margin: '0 0 16px' }}>
              Your key. Your usage. Your control.
            </h2>
            <p style={{ fontSize: 16, color: '#666', lineHeight: 1.7, margin: '0 0 16px' }}>
              Buildo doesn't charge for generation. You connect a free AI key — no credit card required.
            </p>
            <p style={{ fontSize: 16, color: '#666', lineHeight: 1.7, margin: 0 }}>
              Your key is only ever used server-side. It never reaches the browser, and is never shared or stored anywhere else.
            </p>
          </div>
          <div style={{ background: '#1f1f1f', borderRadius: 10, padding: 24, fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace", fontSize: 13, color: '#dcf8c6', lineHeight: 1.8, boxShadow: '0 2px 10px rgba(0,0,0,0.10)' }}>
            <div style={{ color: '#999' }}>{'// .env.local'}</div>
            <div>AI_API_KEY=<span style={{ color: '#fff' }}>your-key-here</span></div>
            <div style={{ color: '#999', marginTop: 12 }}>{'// used server-side only'}</div>
            <div>app/api/generate/route.js</div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ maxWidth: 700, margin: '0 auto', padding: '96px 48px', textAlign: 'center' }}>
        <p style={{ ...s.raj, fontWeight: 600, fontSize: 13, color: '#128C7E', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 12px' }}>
          Pricing
        </p>
        <h2 style={{ ...s.raj, fontWeight: 700, fontSize: 32, color: '#075e54', margin: '0 0 40px' }}>
          Free. You bring the key.
        </h2>
        <div style={{ border: '1px solid #ddd', borderRadius: 10, padding: 40, boxShadow: '0 1px 2px rgba(0,0,0,0.10)' }}>
          <div style={{ ...s.raj, fontWeight: 700, fontSize: 56, color: '#075e54', marginBottom: 8 }}>$0</div>
          <p style={{ fontSize: 14, color: '#999', margin: '0 0 28px' }}>
            Buildo is free forever. The AI free tier covers most projects.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Unlimited projects, saved to your account',
              'Live preview and unlimited revisions',
              'Download standalone HTML anytime',
              'No Buildo subscription, ever',
            ].map((item) => (
              <li key={item} style={{ fontSize: 15, color: '#1f1f1f' }}>✅ {item}</li>
            ))}
          </ul>
          <Link href="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 5,
            background: '#075e54', color: '#ffffff', fontSize: 16, fontWeight: 600,
          }}>
            Begin Build <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: '#f0f2f5', padding: '88px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ ...s.raj, fontWeight: 600, fontSize: 13, color: '#128C7E', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 12px', textAlign: 'center' }}>
            FAQ
          </p>
          <h2 style={{ ...s.raj, fontWeight: 700, fontSize: 32, color: '#075e54', textAlign: 'center', margin: '0 0 48px' }}>
            Questions, answered
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
                <button
                  onClick={() => toggleFaq(i)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '18px 20px',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    ...s.raj, fontWeight: 600, fontSize: 16, color: '#075e54',
                  }}
                >
                  {faq.q}
                  <span style={{ fontSize: 18, color: '#999' }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <p style={{ padding: '0 20px 20px', fontSize: 15, color: '#666', lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: '96px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ ...s.raj, fontWeight: 700, fontSize: 40, color: '#075e54', margin: '0 0 16px' }}>
            Describe it. Buildo builds it.
          </h2>
          <p style={{ fontSize: 16, color: '#666', margin: '0 0 32px' }}>
            Sign up, connect your AI key, and generate your first site today.
          </p>
          <Link href="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '16px 32px', borderRadius: 5,
            background: '#075e54', color: '#ffffff', fontSize: 16, fontWeight: 600,
          }}>
            Begin Build <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #ddd', padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: '#999' }}>
        <span style={{ ...s.raj, fontWeight: 700, color: '#075e54' }}>Buildo</span>
        <span>Scale: 1 Prompt = 1 Site</span>
      </footer>
    </div>
  );
}
