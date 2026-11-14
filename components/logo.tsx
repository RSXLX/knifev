import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="knifeV 首页">
      <Image
        src={compact ? "/knifev-mark.png" : "/knifev-logo.png"}
        alt="knifeV"
        width={compact ? 28 : 148}
        height={28}
        className={compact ? "h-7 w-7 object-contain" : "h-7 w-auto"}
        priority
      />
    </Link>
  );
}
