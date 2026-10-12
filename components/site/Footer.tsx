import Link from "next/link";
import { PhotoCredits } from "@/components/PhotoCredits";
import { site } from "@/content/site";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-fg text-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="grid content-start gap-4">
          <p className="flex items-center gap-2.5 font-display text-2xl font-bold">
            <LogoMark className="h-10 w-10" />
            {site.name}
          </p>
          <p className="max-w-sm text-bg/75">{site.description}</p>
        </div>
        <div className="grid content-start gap-2">
          <p className="font-bold">Find us</p>
          <p className="text-bg/75">{site.contact.address}</p>
          <p className="text-bg/75">{site.contact.hours}</p>
        </div>
        <div className="grid content-start gap-2">
          <p className="font-bold">Book or ask</p>
          <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="font-display text-2xl font-bold text-sponge no-underline">
            {site.contact.phone}
          </a>
          <Link href="/quote" className="text-bg">
            Get a price and book
          </Link>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-bg">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-bg/15">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 py-5 text-sm text-bg/70 sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Demo project by{" "}
            <a href="https://github.com/KStrochan" className="text-bg underline">
              Konstantyn Strochan
            </a>
            ; the company, cleaners and reviews are fictional.
          </p>
          <PhotoCredits credits={site.photoCredits} />
        </div>
      </div>
    </footer>
  );
}
