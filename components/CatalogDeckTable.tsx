import Card from "@/components/Card";
import { CATALOG_ENTRIES } from "@/lib/cards";

export default function CatalogDeckTable({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-ui-border font-cinzel text-[11px] sm:text-xs tracking-[0.12em] text-gold/95">
              <th className="py-2.5 pl-3 pr-2 w-[120px] font-normal">
                Preview
              </th>
              <th className="py-2.5 px-2 font-normal">Type</th>
              <th className="py-2.5 px-2 font-normal">ID</th>
              <th className="py-2.5 px-2 font-normal">Title</th>
              <th className="py-2.5 px-2 font-normal">Artist</th>
              <th className="py-2.5 px-2 font-normal">Year</th>
              <th className="py-2.5 px-2 font-normal">Subgenre</th>
              <th className="py-2.5 px-2 font-normal">Country / region</th>
              <th className="py-2.5 px-2 font-normal">Pop</th>
              <th className="py-2.5 px-2 font-normal">Rarity</th>
              <th className="py-2.5 pr-3 pl-2 font-normal">Ability</th>
            </tr>
          </thead>
          <tbody className="font-garamond text-[15px] text-white/95">
            {CATALOG_ENTRIES.map(({ rowKey, kind, card, theme, genreName }) => (
              <tr
                key={rowKey}
                className="border-b border-ui-border/60 last:border-0 align-top"
              >
                <td className="py-2 pl-2 pr-1">
                  <div
                    className="mx-auto flex justify-center"
                    style={{
                      width: 102,
                      height: 150,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        transform: "scale(0.58)",
                        transformOrigin: "top center",
                      }}
                    >
                      <Card
                        card={card}
                        theme={theme}
                        genreName={genreName}
                        small
                      />
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-2 text-muted whitespace-nowrap">
                  {kind}
                </td>
                <td className="py-2.5 px-2 font-mono text-[13px] text-muted">
                  {card.id}
                </td>
                <td className="py-2.5 px-2">{card.title}</td>
                <td className="py-2.5 px-2 text-muted">
                  {card.artist ?? "—"}
                </td>
                <td className="py-2.5 px-2 text-muted tabular-nums">
                  {card.year}
                </td>
                <td className="py-2.5 px-2 text-muted max-w-[140px]">
                  {card.subgenre ?? "—"}
                </td>
                <td className="py-2.5 px-2 text-muted max-w-[120px]">
                  {card.country ?? "—"}
                </td>
                <td className="py-2.5 px-2 text-muted tabular-nums">
                  {card.pop}
                </td>
                <td className="py-2.5 px-2 text-muted whitespace-nowrap">
                  {card.rarity}
                </td>
                <td className="py-2.5 pr-3 pl-2 text-muted max-w-[200px]">
                  {card.ability}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
