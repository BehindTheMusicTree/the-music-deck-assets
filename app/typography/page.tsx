import Link from 'next/link';

export default function TypographyPage() {
  return (
    <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 700, marginBottom: 32 }}>
        <Link href="/" style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', textDecoration: 'none' }}>
          ← Design Charter
        </Link>
      </div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 3, color: 'var(--muted)', marginBottom: 8 }}>03</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', marginBottom: 16 }}>Type system</div>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, letterSpacing: 4, color: 'var(--white)', marginBottom: 8 }}>
        TYPO<em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>GRAPHY</em>
      </h2>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: 'var(--muted)', maxWidth: 600, textAlign: 'center', marginBottom: 56 }}>
        Three typefaces, each with a defined role. Never swap them between contexts.
      </p>

      <div style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Cinzel */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 4, padding: '28px 28px 24px' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', marginBottom: 12 }}>CINZEL — TITLES</div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 32, letterSpacing: 5, color: 'var(--white)', marginBottom: 16 }}>
            THE MUSIC DECK
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 18, letterSpacing: 3, color: 'var(--gold)', marginBottom: 20 }}>
            Genre · Navigation · Buttons
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'var(--muted)', marginBottom: 6 }}>USAGE RULES</div>
            <ul style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Page titles, section headings, card headers</li>
              <li>Navigation labels and button text</li>
              <li>Genre labels and badge names</li>
              <li>Always uppercase or title-case — never sentence case</li>
            </ul>
          </div>
        </div>

        {/* Cormorant Garamond */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 4, padding: '28px 28px 24px' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', marginBottom: 12 }}>CORMORANT GARAMOND — BODY</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'var(--white)', marginBottom: 8, lineHeight: 1.5 }}>
            A collectible card game built around music.
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 16, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Each genre owns a border colour. World is the exception — it overlays a dotted pattern on the host genre&apos;s colour.
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'var(--muted)', marginBottom: 6 }}>USAGE RULES</div>
            <ul style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Body text, card descriptions, tooltips, paragraphs</li>
              <li>Use italic for flavour text and secondary captions</li>
              <li>Regular weight (400) for body, medium (500) for emphasis</li>
              <li>Default body font — applied to <code style={{ fontFamily: 'Space Mono, monospace', fontSize: 10 }}>body</code> in globals.css</li>
            </ul>
          </div>
        </div>

        {/* Space Mono */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 4, padding: '28px 28px 24px' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', marginBottom: 12 }}>SPACE MONO — DATA</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, color: 'var(--white)', marginBottom: 8, letterSpacing: 1 }}>
            #c8a040 · 120 BPM
          </div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--muted)', marginBottom: 20, letterSpacing: 2 }}>
            LEGENDARY · STACK ×3 · +45%
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'var(--muted)', marginBottom: 6 }}>USAGE RULES</div>
            <ul style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Numeric data, scores, percentages, counters</li>
              <li>Section index labels (01, 02, 03…)</li>
              <li>Hex colour codes, technical tags, CSS tokens</li>
              <li>Keep sizes small (9–13 px) and letter-spacing loose</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
