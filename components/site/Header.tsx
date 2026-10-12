import Link from "next/link";
import { site } from "@/content/site";
import { LogoMark } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5 text-fg no-underline">
          <span className="transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110">
            <LogoMark />
          </span>
          <span className="whitespace-nowrap font-display text-xl font-bold tracking-tight">
            Brightside<span className="hidden sm:inline"> Cleaning</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="font-semibold text-fg no-underline decoration-sponge decoration-[3px] underline-offset-8 hover:underline">
              {item.label}
            </Link>
          ))}
          <Link href="/quote" className="btn">
            Get a price
          </Link>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/quote" className="btn whitespace-nowrap px-4 py-2 text-sm">
            Get a price
          </Link>
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-full border-2 border-fg px-3 py-1.5 text-sm font-bold">Menu</summary>
            <nav aria-label="Mobile" className="absolute right-0 mt-2 grid w-60 gap-1 rounded-3xl border border-border bg-card p-2 shadow-xl shadow-fg/10">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-2 font-semibold text-fg no-underline hover:bg-surface">
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
