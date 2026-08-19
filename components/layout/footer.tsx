import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { SiYoutube, SiInstagram, SiX, SiGithub } from "react-icons/si";
import { getFooter, getSiteSettings, getSocials } from "@/notion/data";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const socialIcons: Record<string, IconComponent> = {
  linkedin: Linkedin,
  github: SiGithub,
  x: SiX,
  twitter: SiX,
  youtube: SiYoutube,
  instagram: SiInstagram,
};

function SocialIcon({ icon }: { icon: string }) {
  const Icon = socialIcons[icon.toLowerCase()] ?? Globe;
  return <Icon className="size-4" />;
}

/** Server footer with newsletter, link groups, contact block and socials. */
export async function Footer() {
  const [settings, groups, socials] = await Promise.all([getSiteSettings(), getFooter(), getSocials()]);
  const year = new Date().getFullYear();

  return (
    <footer className="no-print relative mt-24 border-t border-border bg-secondary/40">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-secondary/40 to-transparent" />
      <div className="container-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand block */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Compass className="size-5" strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">{settings.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{settings.tagline}</p>
          <div className="mt-6">
            <p className="text-sm font-semibold">Field notes, monthly.</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Case studies and engineering notes. No noise, unsubscribe anytime.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Link groups */}
        {groups.map((group) => (
          <nav key={group.title} aria-label={`Footer — ${group.title}`}>
            <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-[14px] text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Contact strip */}
      <div className="border-t border-border">
        <div className="container-shell flex flex-wrap items-center gap-x-8 gap-y-3 py-6 text-[13px] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Mail className="size-3.5 text-primary" />
            <a className="hover:text-primary" href={`mailto:${settings.email}`}>{settings.email}</a>
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="size-3.5 text-primary" />
            <a className="hover:text-primary" href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a>
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 text-primary" />
            {settings.location}
          </span>
          <div className="ml-auto flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-shell flex flex-col items-center justify-between gap-2 py-5 text-[12.5px] text-muted-foreground sm:flex-row">
          <p>© {year} {settings.name}. Engineered with precision.</p>
          
        </div>
      </div>
    </footer>
  );
}
