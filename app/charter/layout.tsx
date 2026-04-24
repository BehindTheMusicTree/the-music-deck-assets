"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SUB_TABS = [
  { href: "/charter/palette", label: "Palette" },
  { href: "/charter/typography", label: "Typography" },
] as const;

export default function CharterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/charter/palette";

  return (
    <>
      <div className="border-b border-ui-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex gap-0 -mx-1 overflow-x-auto [&::-webkit-scrollbar]:h-0" aria-label="Charter sections">
            {SUB_TABS.map(({ href, label }) => {
              const on = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "whitespace-nowrap font-mono text-[11px] sm:text-[12px] tracking-[0.12em] px-3 py-2 no-underline border-b-2 -mb-px",
                    on
                      ? "text-gold border-gold"
                      : "text-muted border-transparent hover:text-white",
                  ].join(" ")}
                  aria-current={on ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {children}
    </>
  );
}
