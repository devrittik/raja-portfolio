import { Reveal } from "@/components/shared/reveal";

/** Infinite marquee of client wordmarks. */
export function TrustedBy({ clients }: { clients: string[] }) {
  const row = [...clients, ...clients];
  return (
    <section id="trusted" aria-label="Trusted by" className="border-y border-border bg-secondary/40 py-10">
      <div className="container-shell">
        <Reveal>
          <p className="mb-7 text-center text-[12px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Trusted by infrastructure teams at
          </p>
        </Reveal>
        <div className="mask-fade-x overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-14 pr-14">
            {row.map((client, i) => (
              <span
                key={`${client}-${i}`}
                aria-hidden={i >= clients.length}
                className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-muted-foreground/55 transition-colors hover:text-foreground"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
