import GenreWheel from '@/components/GenreWheel';
import Link from 'next/link';

export default function GenresPage() {
  return (
    <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 700, marginBottom: 32 }}>
        <Link href="/" style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', textDecoration: 'none' }}>
          ← Design Charter
        </Link>
      </div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 3, color: 'var(--muted)', marginBottom: 8 }}>02</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', marginBottom: 16 }}>Genre colour system</div>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, letterSpacing: 4, color: 'var(--white)', marginBottom: 8 }}>
        THE <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>GENRES</em>
      </h2>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: 'var(--muted)', maxWidth: 600, textAlign: 'center', marginBottom: 0 }}>
        Each genre owns a border colour. World is the exception — it overlays a dotted pattern on the host genre&apos;s colour.
      </p>
      <GenreWheel />
    </div>
  );
}
