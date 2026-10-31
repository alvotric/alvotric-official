import Link from "next/link";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site.config";

/** A calm, wide footer in the manner of a modern AI product site: brand left, link columns right. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg">
      <Container className="pb-12 pt-24 sm:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo id="ftr" />
            <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
              An independent technology company building intelligent software, AI-powered development tools,
              and automation infrastructure.
            </p>
            <div className="mt-8">
              <SocialIcons />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:col-span-8">
            {siteConfig.footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.9375rem] font-semibold text-ink">{group.title}</h2>
                <ul className="mt-6 space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="text-[0.9375rem] text-muted transition-colors hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span className="text-[0.9375rem] text-subtle/80">
                          {link.label}
                          {link.note ? (
                            <span className="ml-2 rounded-full border border-line px-2 py-0.5 text-[0.6875rem] text-subtle">
                              {link.note}
                            </span>
                          ) : null}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-line pt-8 text-[0.875rem] text-subtle sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>Alvo is a product of {siteConfig.name} and is in development.</p>
        </div>
      </Container>
    </footer>
  );
}
