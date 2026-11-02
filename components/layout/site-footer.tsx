import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/ui/newsletter";
import { footerNav } from "@/mock/navigation";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const b = siteConfig.brand;
  return (
    <footer className="bg-navy on-dark pb-24 sm:pb-0">
      <div className="container-x py-14 md:py-16 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 border-b border-dark" id="newsletter">
        <div>
          <p className="eyebrow">The Meridian Brief</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[2.4rem] leading-tight text-white max-w-lg">Data, grant calls and stories from across Africa — monthly.</h2>
        </div>
        <NewsletterForm dark />
      </div>

      <div className="container-x py-14 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
        <div>
          <Logo light />
          <p className="mt-5 text-[14.5px] text-on-dark-muted max-w-sm leading-relaxed">{b.description}</p>
          <ul className="mt-6 space-y-3 text-[14px]">
            {siteConfig.offices.map((o) => (
              <li key={o.city}>
                <span className="font-semibold text-white">{o.city}</span> <span className="text-on-dark-muted">· {o.role}</span>
                <div className="text-on-dark-muted text-[13px]">{o.address}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-sky">{col.heading}</h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[14px] text-on-dark hover:text-white hover:underline underline-offset-4 inline-flex min-h-[36px] items-center">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-dark">
        <div className="container-x py-6 flex flex-col md:flex-row gap-4 md:items-center justify-between text-[12.5px] text-on-dark-muted">
          <p>
            © {new Date().getFullYear()} {siteConfig.org.legalName}. Registered not-for-profit · Audited annually.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <a href={b.social.linkedin} className="hover:text-white min-h-[36px] inline-flex items-center" rel="noreferrer" target="_blank">LinkedIn</a>
            <a href={b.social.twitter} className="hover:text-white min-h-[36px] inline-flex items-center" rel="noreferrer" target="_blank">X</a>
            <a href={b.social.youtube} className="hover:text-white min-h-[36px] inline-flex items-center" rel="noreferrer" target="_blank">YouTube</a>
            <a href={b.social.instagram} className="hover:text-white min-h-[36px] inline-flex items-center" rel="noreferrer" target="_blank">Instagram</a>
            <Link href="/transparency" className="hover:text-white min-h-[36px] inline-flex items-center">Privacy & data</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
