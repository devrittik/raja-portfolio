import { Clock, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { SiteSettings } from "@/types";

/** Contact sidebar: channels, office hours and address. */
export function ContactInfo({ settings }: { settings: SiteSettings }) {
  const wa = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Hello — I'd like to discuss a project.")}`;
  const rows = [
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { icon: Phone, label: "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}` },
    { icon: SiWhatsapp, label: "WhatsApp", value: "Fastest for site queries", href: wa },
    { icon: Linkedin, label: "LinkedIn", value: "Connect professionally", href: "https://www.linkedin.com/in/engineerrajadey/" },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-lg font-bold tracking-tight">
          Get in touch
        </h2>

        <div className="mt-5 space-y-4">
          {rows.map((row) => (
            <a
              key={row.label}
              href={row.href}
              target={row.href.startsWith("http") ? "_blank" : undefined}
              rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3.5 rounded-xl p-2 -m-2 transition-colors hover:bg-secondary"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <row.icon className="size-4.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {row.label}
                </span>
                <span className="block truncate text-[14px] font-medium text-foreground">
                  {row.value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <Clock className="size-5 text-primary" /> Availability
        </h2>

        <ul className="mt-4 space-y-2 text-[13.5px] text-muted-foreground">
          {settings.officeHours.map((h) => (
            <li key={h} className="border-l-2 border-primary/30 pl-3">
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <MapPin className="size-5 text-primary" /> Based in India
        </h2>

        <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
          {settings.address}
        </p>
      </div>
    </div>
  );
}
