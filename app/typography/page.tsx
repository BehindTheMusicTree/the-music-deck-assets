export default function TypographyPage() {
  return (
    <div className="px-6 py-10 flex flex-col items-center">
      <div className="font-mono text-[15px] tracking-[3px] text-muted mb-2">03</div>
      <div className="font-mono text-[15px] tracking-[2px] text-muted mb-4">Type system</div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        TYPO<em className="text-gold not-italic">GRAPHY</em>
      </h2>
      <p className="font-garamond italic text-muted max-w-[600px] text-center mb-14">
        Three typefaces, each with a defined role. Never swap them between contexts.
      </p>

      <div className="w-full max-w-[700px] flex flex-col gap-6">

        {/* Cinzel */}
        <div className="bg-card border border-ui-border rounded px-7 pt-7 pb-6">
          <div className="font-mono text-[15px] tracking-[2px] text-muted mb-3">CINZEL — TITLES</div>
          <div className="font-cinzel text-[32px] tracking-[5px] text-white mb-4">THE MUSIC DECK</div>
          <div className="font-cinzel text-[18px] tracking-[3px] text-gold mb-5">Genre · Navigation · Buttons</div>
          <div className="border-t border-ui-border pt-4">
            <div className="font-mono text-[15px] text-muted mb-1.5">USAGE RULES</div>
            <ul className="font-garamond text-sm text-muted leading-[1.8] pl-5 list-disc">
              <li>Page titles, section headings, card headers</li>
              <li>Navigation labels and button text</li>
              <li>Genre labels and badge names</li>
              <li>Always uppercase or title-case — never sentence case</li>
            </ul>
          </div>
        </div>

        {/* Cormorant Garamond */}
        <div className="bg-card border border-ui-border rounded px-7 pt-7 pb-6">
          <div className="font-mono text-[15px] tracking-[2px] text-muted mb-3">CORMORANT GARAMOND — BODY</div>
          <div className="font-garamond text-[22px] text-white mb-2 leading-[1.5]">
            A collectible card game built around music.
          </div>
          <div className="font-garamond italic text-[16px] text-muted mb-5 leading-[1.6]">
            Each genre owns a border colour. World is the exception — it overlays a dotted pattern on the host genre&apos;s colour.
          </div>
          <div className="border-t border-ui-border pt-4">
            <div className="font-mono text-[15px] text-muted mb-1.5">USAGE RULES</div>
            <ul className="font-garamond text-sm text-muted leading-[1.8] pl-5 list-disc">
              <li>Body text, card descriptions, tooltips, paragraphs</li>
              <li>Use italic for flavour text and secondary captions</li>
              <li>Regular weight (400) for body, medium (500) for emphasis</li>
              <li>Default body font — applied to <code className="font-mono text-[15px]">body</code> in globals.css</li>
            </ul>
          </div>
        </div>

        {/* Space Mono */}
        <div className="bg-card border border-ui-border rounded px-7 pt-7 pb-6">
          <div className="font-mono text-[15px] tracking-[2px] text-muted mb-3">SPACE MONO — DATA</div>
          <div className="font-mono text-[20px] text-white mb-2 tracking-[1px]">#c8a040 · 120 BPM</div>
          <div className="font-mono text-[15px] text-muted mb-5 tracking-[2px]">LEGENDARY · STACK ×3 · +45%</div>
          <div className="border-t border-ui-border pt-4">
            <div className="font-mono text-[15px] text-muted mb-1.5">USAGE RULES</div>
            <ul className="font-garamond text-sm text-muted leading-[1.8] pl-5 list-disc">
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
