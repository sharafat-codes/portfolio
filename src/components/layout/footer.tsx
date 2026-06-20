import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/shared/section";
import { siteConfig, navItems } from "@/lib/site";
import { projects } from "@/lib/data/projects";

const socials = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "Email", href: siteConfig.links.email, icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/40">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--signal-glow)" }}
        aria-hidden
      />
      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <span className="font-display text-sm font-bold">SA</span>
              </span>
              <span className="font-display text-lg font-semibold">Sharafat Ali</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Full-stack software engineer building scalable SaaS platforms, marketplaces, payment
              systems, and business automation — from architecture to production.
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-[color-mix(in_oklab,var(--signal)_10%,transparent)] px-3 py-1.5 font-mono text-xs text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {siteConfig.availability}
            </span>
            <div className="flex items-center gap-2 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <s.icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Navigate">
            {navItems.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Case studies">
            {projects.map((p) => (
              <FooterLink key={p.slug} href={`/work/${p.slug}`}>
                {p.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Get in touch">
            <FooterLink href={siteConfig.links.email} external>
              {siteConfig.email}
            </FooterLink>
            <FooterLink href={siteConfig.resumeUrl} external icon={<FileText className="size-3.5" />}>
              Download resume
            </FooterLink>
            <FooterLink href="/#contact">Start your project</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-7 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} Sharafat Ali · {siteConfig.location}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5">
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  icon?: React.ReactNode;
}) {
  const isMail = href.startsWith("mailto");
  return (
    <li>
      <Link
        href={href}
        target={external && !isMail ? "_blank" : undefined}
        rel={external && !isMail ? "noopener noreferrer" : undefined}
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {icon}
        <span>{children}</span>
        {external && (
          <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </Link>
    </li>
  );
}
