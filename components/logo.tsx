import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2 text-[#f5f5f5]" aria-label="Lumora 首页">
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="3.5" width="13" height="9.5" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="5.2" y="6.4" width="13" height="9.5" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="8" y="9.4" width="13" height="9.5" rx="2.2" fill="#060606" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      {compact ? null : (
        <span className="font-[family-name:var(--font-display)] text-[17px] font-medium tracking-[-0.04em]">
          lumora
        </span>
      )}
    </Link>
  );
}
